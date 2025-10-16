import mongoose from "mongoose";
import { HTTP } from "../../../../config/http-status.config";
import { CategoryModel } from "../../../../models/category.model";
import { ProductModel } from "../../../../models/product.model";
import AppError from "../../../../utils/AppError";
import { generateSlug } from "../../../../utils/generateSlug";
import { deleteFromS3, uploadToS3 } from "../../../../utils/s3.util";

export default class AdminProductService {
  getAllProducts = async (page: number, limit: number, search: string) => {
    try {
      const skip = (page - 1) * limit;
      const query: any = { isDeleted: false };
      if (search && search.length > 0) {
        query.$or = [{ name: { $regex: search, $options: "i" } }];
      }
      const [products, total] = await Promise.all([
        ProductModel.find(query)
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 }).populate('category'),
        CategoryModel.countDocuments(query),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        data: {
          products,
          pagination: {
            total,
            currentPage: page,
            totalPages,
            perPage: limit,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
          },
        },
        message: "Products fetched successfully",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, 500);
    }
  };

  getProduct = async (slug: string) => {
    try {
      const product = await ProductModel.findOne({ slug }).populate('category');
      console.log({ product });
      if (!product) {
        throw new AppError("Product not found", 404);
      }
      return {
        data: product,
        message: "Product fetched successfully",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, 500);
    }
  };

  createProduct = async (
    name: string,
    description: string,
    variants: string,
    category: string,
    ingredients: string,
    nutritionInformation: string,
    storageInfo: string,
    suggestedUse: string,
    whyYouShouldUseThis: string,
    images: Express.Multer.File[]
  ) => {
  
    console.log({
      name,
      description,
      variants,
      category,
      ingredients,
      images,
      nutritionInformation,
      storageInfo,
      whyYouShouldUseThis,
      suggestedUse,
    });

    try {
      if (
        !name ||
        !description ||
        !variants ||
        !category ||
        !images ||
        !ingredients ||
        !nutritionInformation ||
        !storageInfo ||
        !whyYouShouldUseThis ||
        !suggestedUse
      ) {
        throw new AppError("All inputs required", HTTP.NO_CONTENT);
      }

      const existingProduct = await ProductModel.findOne({
        name: {
          $regex: new RegExp(name, "i"),
        },
      });
      if (existingProduct) {
        throw new AppError("Product already exists", HTTP.BAD_REQUEST);
      }

      if (!images || images.length === 0) {
        throw new Error("No images provided");
      }

      const uploadedImages = await Promise.all(
        images.map(async (image) => {
          const result = await uploadToS3(
            image.buffer,
            image.originalname,
            image.mimetype,
            "products"
          );
          if (!result) throw new Error("Upload failed");
          return result;
        })
      );

      const formattedImages = uploadedImages.map((item) => item.url);
      console.log({ uploadedImages, formattedImages });

      const dataToUpload = {
        name,
        description,
        variants: JSON.parse(variants),
        category,
        images: formattedImages,
        slug: await generateSlug(name),
        nutritionInformation,
        ingredients,
        suggestedUse,
        storageInfo,
        whyYouShouldUseThis,
      };

      console.log({ dataToUpload });

      const newProduct = await ProductModel.create(dataToUpload);

      return {
        data: newProduct,
        message: "Product created successfully",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, 500);
    }
  };

  updateProduct = async (
    name: string,
    description: string,
    slug: string,
    variants: string,
    category: string,
    ingredients: string,
    nutritionInformation: string,
    storageInfo: string,
    suggestedUse: string,
    whyYouShouldUseThis: string,
    newImages: Express.Multer.File[],
    deletedImages: string // JSON string array of URLs from client
  ) => {
    try {
      // 1️⃣ Validate slug
      if (!slug) {
        throw new AppError("Slug is required to identify the product", HTTP.BAD_REQUEST);
      }

      // 2️⃣ Find existing product
      const product = await ProductModel.findOne({ slug });
      if (!product) {
        throw new AppError("Product not found", HTTP.NOT_FOUND);
      }

      // 3️⃣ Prevent duplicate product names
      const duplicate = await ProductModel.findOne({
        name: { $regex: new RegExp(`^${name}$`, "i") },
        _id: { $ne: product._id },
      });
      if (duplicate) {
        throw new AppError("Product with this name already exists", HTTP.BAD_REQUEST);
      }

      // 4️⃣ Parse inputs
      const parsedVariants = JSON.parse(variants || "[]");
      const parsedDeletedImages: string[] = JSON.parse(deletedImages || "[]");

      // 5️⃣ Handle deleted images (those missing from existingImages)
      const oldImages = product.images || [];
      const existingImages = oldImages.filter(image => !parsedDeletedImages.includes(image))

      // Delete removed images from S3
      await Promise.all(
        parsedDeletedImages.map(async (img) => {
          try {
            await deleteFromS3(img);
          } catch (err) {
            console.warn(`⚠️ Failed to delete image from S3: ${img}`, err);
          }
        })
      );

      // 6️⃣ Upload new images to S3
      const uploadedImages = await Promise.all(
        (newImages || []).map(async (image) => {
          const result = await uploadToS3(
            image.buffer,
            image.originalname,
            image.mimetype,
            "products"
          );
          return result?.url;
        })
      );

      // 7️⃣ Final image list (keep existing + add new)
      const finalImages = [...existingImages, ...uploadedImages.filter(Boolean)];

      // 8️⃣ Update product fields
      product.name = name;
      product.description = description;
      product.variants = parsedVariants;
      product.category = new mongoose.Types.ObjectId(category);
      product.ingredients = ingredients;
      product.images = finalImages;
      product.nutritionInformation = nutritionInformation;
      product.storageInfo = storageInfo;
      product.suggestedUse = suggestedUse;
      product.whyYouShouldUseThis = whyYouShouldUseThis;

      // 9️⃣ Save updated product
      await product.save();

      return {
        data: product,
        message: "Product updated successfully",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      console.error("❌ Error updating product:", error);
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, 500);
    }
  };

  toggleProductStatus = async (slug: string) => {
    try {
      const product = await ProductModel.findOne({ slug }).populate("category");
      if (!product) {
        throw new AppError("Product not found", 404);
      }
      // Ensure category is populated and has a status property
      if (
        product.category &&
        typeof product.category === "object" &&
        "status" in product.category
      ) {
        if (product.category.status === "inactive") {
          throw new AppError(
            "Cannot toggle product status when category is not active",
            400
          );
        }
      }
      product.isActive = !product.isActive;
      await product.save();
      return {
        data: product,
        message: "Product status toggled successfully",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, 500);
    }
  };

  deleteProduct = async (slug: string) => {
    try {
      const product = await ProductModel.findOne({ slug }).populate("category");
      if (!product) {
        throw new AppError("Product not found", 404);
      }
      product.isDeleted = true;
      await product.save();
      return {
        data: product,
        message: "Product deleted successfully",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, 500);
    }
  };
}

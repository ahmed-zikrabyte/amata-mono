import { HTTP } from "../../../../config/http-status.config";
import { CategoryModel } from "../../../../models/category.model";
import { ProductModel } from "../../../../models/product.model";
import AppError from "../../../../utils/AppError";
import { generateSlug } from "../../../../utils/generateSlug";
import { deleteFromS3, uploadToS3 } from "../../../../utils/s3.util";

export default class AdminCategoryService {
  getAllCategories = async (page: number, limit: number, search: string) => {
    try {
      const skip = (page - 1) * limit;
      const query: any = { isDeleted: false };
      if (search && search.length > 0) {
        query.$or = [{ name: { $regex: search, $options: "i" } }];
      }
      const [categories, total] = await Promise.all([
        CategoryModel.find(query)
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 }),
        CategoryModel.countDocuments(query),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        data: {
          categories,
          pagination: {
            total,
            currentPage: page,
            totalPages,
            perPage: limit,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
          },
        },
        message: "Categories fetched successfully",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, 500);
    }
  };

  createCategory = async (name: string, image: Express.Multer.File) => {
    try {
      if (!name || !image) {
        throw new AppError("Inputs required", HTTP.BAD_REQUEST);
      }
      console.log({ name, image });
      const category = await CategoryModel.findOne({
        name: { $regex: `^${name}$`, $options: "i" },
      });

      console.log({ category });
      if (category) {
        throw new AppError("Category already exists", 400);
      }

      const uploadedImage = await uploadToS3(
        image.buffer,
        image.originalname,
        image.mimetype,
        "categories"
      );

      const formatedImage: {
        url: string;
        mimeType: string;
        publicKey: string;
      } = {
        url: uploadedImage.url,
        mimeType: image.mimetype,
        publicKey: uploadedImage.filename,
      };

      const newCategory = await CategoryModel.create({
        name,
        slug: generateSlug(name),
        image: formatedImage.url,
      });

      return {
        data: newCategory,
        message: "Category created successfully",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, 500);
    }
  };

  updateCategory = async (
    slug: string,
    name: string,
    image?: Express.Multer.File // mark as optional
  ) => {
    try {
      console.log({ slug, name });
      if (!slug || !name) {
        throw new AppError("Inputs required", HTTP.BAD_REQUEST);
      }

      const category = await CategoryModel.findOne({ slug });

      if (!category) {
        throw new AppError("Category not found", HTTP.NOT_FOUND);
      }

      const categoryExists = await CategoryModel.findOne({
        name: { $regex: new RegExp(name, "i") },
        _id: { $ne: category._id },
      });

      if (categoryExists) {
        throw new AppError(
          "Category with this name already exists",
          HTTP.BAD_REQUEST
        );
      }

      // If new image is uploaded
      if (image) {
        // 1. Upload the new image
        const uploadedImage = await uploadToS3(
          image.buffer,
          image.originalname,
          image.mimetype,
          "categories"
        );

        const formattedImage = {
          url: uploadedImage.url,
          mimeType: image.mimetype,
          publicKey: uploadedImage.filename,
        };

        // 2. Delete the old image from S3 (if exists)
        if (category.image) {
          await deleteFromS3(category.image);
        }

        // 3. Update the image field
        category.image = formattedImage.url;
      }

      // Always update name & slug
      category.name = name;
      category.slug = await generateSlug(name);

      await category.save();

      return {
        data: category,
        message: "Category updated successfully",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, 500);
    }
  };

  toggleCategoryStatus = async (slug: string) => {
    try {
      const category = await CategoryModel.findOne({
        slug,
        isDeleted: false,
      });
      if (!category) {
        throw new AppError("Category not found", 404);
      }
      // const products = await ProductModel.find({ category: category._id });
      // if (products) {
      //   for (const product of products) {
      //     if (category.status === "active") {
      //       product.status = "out-of-stock";
      //     }
      //     await product.save();
      //   }
      // }
      category.isActive = !category.isActive;
      await category.save();
      return {
        data: category,
        message: "Category status toggled successfully",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, 500);
    }
  };

  deleteCategory = async (slug: string) => {
    try {
      const category = await CategoryModel.findOne({ slug });
      if (!category) {
        throw new AppError("Category not found", 404);
      }
      const products = await ProductModel.find({ category: category._id });
      if (products) {
        for (const product of products) {
          product.isDeleted = true;
          await product.save();
        }
      }
      category.isDeleted = true;
      await deleteFromS3(category.image);
      await category.save();
      return {
        data: category,
        message: "Category deleted successfully",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, 500);
    }
  };

  getCategory = async (slug: string) => {
    try {
      const category = await CategoryModel.findOne({
        slug,
        isDeleted: false,
      });
      if (!category) {
        throw new AppError("Category not found", 404);
      }
      return {
        data: category,
        message: "Category fetched successfully",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, 500);
    }
  };
}

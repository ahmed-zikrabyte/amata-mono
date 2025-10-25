import mongoose from "mongoose";
import { HTTP } from "../../../../config/http-status.config";
import { ProductModel } from "../../../../models/product.model";
import { ServiceResponse } from "../../../../typings";
import AppError from "../../../../utils/AppError";
import { CategoryModel } from "../../../../models/category.model";

export default class UserProductService {
  getAllProducts = async (
    page: number,
    limit: number,
    search: string,
    category: string
  ): ServiceResponse => {
    try {
      const skip = (page - 1) * limit;
      let query: any = {};
      // Search by name (case-insensitive)
      if (search && search.trim().length > 0) {
        query.name = { $regex: search.trim(), $options: "i" };
      }

      if (category && category.trim().length > 0) {
        const categoryData = await CategoryModel.findOne({ slug: category });
        if (categoryData) {
          query.category = categoryData._id;
        }
      }

      // Run both queries concurrently
      const [products, totalProducts] = await Promise.all([
        ProductModel.find(query)
          .populate("category")
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit),
        ProductModel.countDocuments(query),
      ]);

      const totalPages = Math.ceil(totalProducts / limit);

      return {
        data: {
          products,
          pagination: {
            currentPage: page,
            limit: limit,
            totalPages,
            total: totalProducts,
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
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  };

  getOneProduct = async (slug: string): ServiceResponse => {
    try {
      if (!slug) {
        throw new AppError("Slug required", HTTP.BAD_REQUEST);
      }

      const product = await ProductModel.findOne({ slug }).populate("category");
      if (!product) {
        throw new AppError("Product not found", HTTP.NOT_FOUND);
      }

      return {
        data: product,
        message: "Product fetched successfully",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  };
}

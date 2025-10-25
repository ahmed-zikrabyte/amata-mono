import { HTTP } from "../../../../config/http-status.config";
import { CategoryModel } from "../../../../models/category.model";
import { ServiceResponse } from "../../../../typings";
import AppError from "../../../../utils/AppError";

export default class UserCategoryService {
  getAllCategories = async (): ServiceResponse => {
    try {
      const categories = await CategoryModel.find({isActive: true, isDeleted: false});

      return {
        data: categories,
        message: "Categories fetched successfully",
        status: HTTP.OK,
        success: true,
      }
    } catch (error) {
      if(error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR)
    }
  }
}
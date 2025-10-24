import { HTTP } from "../../../../config/http-status.config";
import { UserModel } from "../../../../models/user.model";
import { ServiceResponse } from "../../../../typings";
import AppError from "../../../../utils/AppError";

export default class UserProfileService {
  getUserData = async (userId: string): ServiceResponse => {
    try {
      if (!userId) {
        throw new AppError("User id is required", HTTP.BAD_REQUEST);
      }
      const user = await UserModel.findById(userId);
      if (!user) {
        throw new AppError("User not found", HTTP.NOT_FOUND);
      }
      return {
        data: user,
        message: "User data fetched successfully",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  };
}

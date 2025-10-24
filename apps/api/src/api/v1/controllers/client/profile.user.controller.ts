import { ApiResponse } from "../../../../utils/ApiResponse";
import catchAsync from "../../../../utils/catchAsync";
import UserProfileService from "../../services/client/profile.user.service";
import { Request, Response } from "express";

const userProfileService = new UserProfileService();

export default class UserProfileController {
  getUserData = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.id;

    const response = await userProfileService.getUserData(userId);

    return ApiResponse.success({
      res,
      data: response.data,
      message: response.message,
    });
  });
}

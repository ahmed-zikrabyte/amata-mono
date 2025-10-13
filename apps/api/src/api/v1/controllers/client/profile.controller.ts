import { Request, response, Response } from "express";
import * as profileService from "../../services/client/profile.service";
import catchAsync from "../../../../utils/catchAsync";
import { ApiResponse } from "../../../../utils/ApiResponse";
import { AuthenticatedRequest } from "../../../../middleware/auth.middleware";

export const getProfile = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const user = await profileService.getProfileById(req.query.id as string);

    ApiResponse.success({
      res,
      data: user.data,
      message: user.message,
    });
  }
);

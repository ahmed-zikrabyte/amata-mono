import { ApiResponse } from "../../../../utils/ApiResponse";
import catchAsync from "../../../../utils/catchAsync";
import UserAddressService from "../../services/client/address.user.service";
import { Request, Response } from "express";

const userAddressService = new UserAddressService();

export default class UserAddressController {
  getAddresses = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.id;

    const response = await userAddressService.getAddresses(userId);

    return ApiResponse.success({
      res,
      data: response.data,
      message: response.message,
    });
  });

  addAddress = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const userId = req.user.id;
    const newData = { userId, ...data };
    console.log({ data });
    const response = await userAddressService.addAddress(newData);

    return ApiResponse.success({
      res,
      data: response.data,
      message: response.message,
    });
  });

  deleteAddress = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.id;
    const { addressId } = req.params;

    const response = await userAddressService.deleteAddress(addressId as string, userId);

    return ApiResponse.success({
      res,
      data: response.data,
      message: response.message,
    });
  });

  updateAddress = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const { addressId } = req.params;
    const userId = req.user.id;
    const newData = { userId, ...data };
    console.log({ data });
    console.log({ newData });
    const response = await userAddressService.updateAddress(
      addressId as string,
      newData
    );

    return ApiResponse.success({
      res,
      data: response.data,
      message: response.message,
    });
  });
}

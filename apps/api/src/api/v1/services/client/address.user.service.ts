import { HTTP } from "../../../../config/http-status.config";
import { IAddress } from "../../../../interfaces";
import { AddressModel } from "../../../../models/address.model";
import { ServiceResponse } from "../../../../typings";
import AppError from "../../../../utils/AppError";

export default class UserAddressService {
  getAddresses = async (userId: string): ServiceResponse => {
    try {
      if (!userId) {
        throw new AppError("User id is required", HTTP.BAD_REQUEST);
      }

      const addresses = await AddressModel.find({ userId });

      return {
        data: addresses || [],
        message: "Addressed fetched successfully",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  };

  addAddress = async (data: IAddress): ServiceResponse => {
    try {
      if (
        !data.fullName ||
        !data.addressLine1 ||
        !data.addressType ||
        !data.phoneNumber ||
        !data.userId ||
        !data.city ||
        !data.state ||
        !data.postalCode
      ) {
        throw new AppError("Inputs required", HTTP.BAD_REQUEST);
      }

      const findAddress = await AddressModel.find({ userId: data.userId });
      if (findAddress.length === 0) {
        data.isDefault = true;
      }
      const newAddress = new AddressModel(data);

      await newAddress.save();

      return {
        data: newAddress,
        message: "Address added",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  };

  deleteAddress = async (
    addressId: string,
    userId: string
  ): ServiceResponse => {
    try {
      if (!addressId) {
        throw new AppError("Address id is required", HTTP.BAD_REQUEST);
      }

      const deletedAddress = await AddressModel.findByIdAndDelete(addressId);
      if (!deletedAddress) {
        throw new AppError("Address not found", HTTP.NOT_FOUND);
      }

      if (deletedAddress.isDefault) {
        const address = await AddressModel.findOne({ userId });
        if (address) {
          address.isDefault = true;
          await address.save();
        }
      }

      return {
        message: "Address deleted",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  };

  updateAddress = async (
    addressId: string,
    data: IAddress
  ): ServiceResponse => {
    try {
      if (
        !addressId ||
        !data.fullName ||
        !data.addressLine1 ||
        !data.addressType ||
        !data.phoneNumber ||
        !data.userId ||
        !data.city ||
        !data.state ||
        !data.postalCode
      ) {
        throw new AppError("Inputs required", HTTP.BAD_REQUEST);
      }

      const address = await AddressModel.findByIdAndUpdate(addressId, data);
      if (!address) {
        throw new AppError("Address not found", HTTP.BAD_REQUEST);
      }

      return {
        message: "Address updated",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  };
}

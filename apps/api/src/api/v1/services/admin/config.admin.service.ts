import { HTTP } from "../../../../config/http-status.config";
import { IConfig } from "../../../../interfaces";
import { ConfigModel } from "../../../../models/config.model";
import { ServiceResponse } from "../../../../typings";
import AppError from "../../../../utils/AppError";

export default class AdminConfigService {
  getConfig = async (): ServiceResponse => {
    try {
      const configData = await ConfigModel.findOne();
      if (!configData) {
        throw new AppError("Config not found", HTTP.NOT_FOUND);
      }

      return {
        data: configData,
        message: "Config fetched successfully",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  };

  createConfig = async (data: IConfig): ServiceResponse => {
    try {
      if (!data.contactInfo || !data.globalDiscount || !data.gst) {
        throw new AppError("Inputs required", HTTP.BAD_REQUEST);
      }

      const configCheck = await ConfigModel.findOne();
      if (configCheck) {
        throw new AppError("Config already exists", HTTP.CONFLICT);
      }

      const newConfig = new ConfigModel({
        contactInfo: data.contactInfo,
        globalDiscount: data.globalDiscount,
        gst: data.gst,
      });

      await newConfig.save();

      return {
        message: "Config created",
        status: HTTP.CREATED,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  };

  updateConfig = async (data: IConfig): ServiceResponse => {
    try {
      if (!data.contactInfo || !data.globalDiscount || !data.gst) {
        throw new AppError("Inputs required", HTTP.BAD_REQUEST);
      }
      const config = await ConfigModel.findOne();
      if (!config) {
        throw new AppError("Config not found", HTTP.NOT_FOUND);
      }

      config.gst = data.gst;
      config.globalDiscount = data.globalDiscount;
      config.contactInfo = data.contactInfo;

      await config.save();

      return {
        message: "Config updated",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  };
}

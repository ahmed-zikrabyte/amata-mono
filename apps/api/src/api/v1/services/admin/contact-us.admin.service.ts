import { HTTP } from "../../../../config/http-status.config";
import { ContactUsModel } from "../../../../models/contact-us.model";
import { ServiceResponse } from "../../../../typings";
import AppError from "../../../../utils/AppError";

export default class AdminContactUsService {
  getContacts = async (
    page: number,
    limit: number,
    search: string
  ): ServiceResponse => {
    try {
      const skip = (page - 1) * limit;
      const query: any = {};
      if (search && search.length > 0) {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ];
      }
      const [contacts, totalContacts] = await Promise.all([
        ContactUsModel.find(query).skip(skip).limit(limit),
        ContactUsModel.countDocuments(query),
      ]);

      const totalPages = Math.ceil(totalContacts / limit);

      return {
        message: "Messages fetched successfully",
        data: {
          contacts,
          pagination: {
            page,
            limit,
            total: totalContacts,
            totalPages,
            hasPrevPage: page > 0,
            hasNextPage: page < totalPages,
          },
        },
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  };
}

import { HTTP } from "../../../../config/http-status.config";
import { FaqModel } from "../../../../models/faqs.model";
import { ServiceResponse } from "../../../../typings";
import AppError from "../../../../utils/AppError";

export default class AdminFaqService {
  getAll = async (
    page: number,
    limit: number,
    search: string
  ): ServiceResponse => {
    try {
      const skip = (page - 1) * limit;
      const query: any = {};
      if (search && search.length > 0) {
        query.$or = [
          { question: { $regex: search, $options: "i" } },
          { answer: { $regex: search, $options: "i" } },
        ];
      }

      const [faqs, totalFaqs] = await Promise.all([
        FaqModel.find(query).skip(skip).limit(limit),
        FaqModel.countDocuments(query),
      ]);
      const totalPages = Math.ceil(totalFaqs / limit);

      return {
        data: {
          faqs,
          pagination: {
            page,
            limit,
            total: totalFaqs,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
          },
        },
        message: "Faqs fetched successfully",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  };

  getOneFaq = async (id: string): ServiceResponse => {
    try {
      if (!id) {
        throw new AppError("Id is required", HTTP.BAD_REQUEST);
      }

      const faq = await FaqModel.findById(id);
      if (!faq) {
        throw new AppError("FAQ not found", HTTP.NOT_FOUND);
      }

      return {
        data: faq,
        message: "Faq fetched successfully",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  };

  createFaq = async (question: string, answer: string): ServiceResponse => {
    try {
      if (!question || !answer) {
        throw new AppError("Question and answer required", HTTP.BAD_REQUEST);
      }

      const newFaq = await FaqModel.create({
        question,
        answer,
      });

      return {
        message: "Faq created successfully",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  };

  updateFaq = async (
    id: string,
    question: string,
    answer: string
  ): ServiceResponse => {
    try {
      console.log({ id, question, answer });
      if (!id || !question || !answer) {
        throw new AppError("Faq Id and inputs required", HTTP.BAD_REQUEST);
      }

      const checkFaq = await FaqModel.findById(id);
      if (!checkFaq) {
        throw new AppError("Faq not found", HTTP.NOT_FOUND);
      }

      checkFaq.question = question;
      checkFaq.answer = answer;
      await checkFaq.save();

      return {
        message: "Faq updated successfully",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  };

  toggleStatus = async (id: string): ServiceResponse => {
    try {
      if (!id) {
        throw new AppError("Faq id is required", HTTP.BAD_REQUEST);
      }

      const faq = await FaqModel.findById(id);
      if (!faq) {
        throw new AppError("Faq not found", HTTP.NOT_FOUND);
      }
      faq.isActive = !faq.isActive;
      await faq.save();

      return {
        message: "Faq status updated",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  };

  deleteFaq = async (id: string): ServiceResponse => {
    try {
      if (!id) {
        throw new AppError("Faq id is required", HTTP.BAD_REQUEST);
      }

      const faq = await FaqModel.findByIdAndDelete(id);
      if (!faq) {
        throw new AppError("Error deleting faq", HTTP.CONFLICT);
      }

      return {
        message: "Faq deleted successfully",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  };
}

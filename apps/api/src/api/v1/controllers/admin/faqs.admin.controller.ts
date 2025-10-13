import { ApiResponse } from "../../../../utils/ApiResponse";
import catchAsync from "../../../../utils/catchAsync";
import AdminFaqService from "../../services/admin/faqs.admin.service";
import { Request, Response } from "express";

const adminFaqService = new AdminFaqService();

export default class AdminFaqController {
  getAll = catchAsync(async (req: Request, res: Response) => {
    const { page, limit, search } = req.query;

    const response = await adminFaqService.getAll(
      Number(page) || 1,
      Number(limit) || 10,
      search as string
    );

    return ApiResponse.success({
      res,
      data: response.data,
      message: response.message,
    });
  });

  getOneFaq = catchAsync(async (req: Request, res: Response) => {
    const {id} = req.params;

    const response = await adminFaqService.getOneFaq(id as string);

    return ApiResponse.success({
      res,
      data: response.data,
      message: response.message
    })
  })

  createFaq = catchAsync(async (req: Request, res: Response) => {
    const { question, answer } = req.body;

    const response = await adminFaqService.createFaq(question, answer);

    return ApiResponse.created({
      res,
      message: response.message,
    });
  });

  updateFaq = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { question, answer } = req.body;

    const response = await adminFaqService.updateFaq(
      id as string,
      question,
      answer
    );

    return ApiResponse.success({
      res,
      message: response.message,
    });
  });

  toggleStatus = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const response = await adminFaqService.toggleStatus(id as string);

    return ApiResponse.success({
      res,
      message: response.message,
    });
  });

  deleteFaq = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const response = await adminFaqService.deleteFaq(id as string);

    return ApiResponse.success({
      res,
      message: response.message,
    });
  });
}

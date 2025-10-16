import catchAsync from "../../../../utils/catchAsync";
import { Request, Response } from "express";
import AdminBlogService from "../../services/admin/blogs.admin.service";
import { ApiResponse } from "../../../../utils/ApiResponse";

const adminBlogService = new AdminBlogService();

export default class AdminBlogController {
  getAll = catchAsync(async (req: Request, res: Response) => {
    const { page, limit, search } = req.query;

    const response = await adminBlogService.getAll(
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

  getOne = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const response = await adminBlogService.getOne(id as string);

    return ApiResponse.success({
      res,
      data: response.data,
      message: response.message,
    });
  });

  createBlog = catchAsync(async (req: Request, res: Response) => {
    const { title, subtitle, content, slug, metaTitle, metaDescription, tags } =
      req.body;

    const response = await adminBlogService.createBlog(
      title,
      subtitle,
      content,
      slug,
      metaTitle,
      metaDescription,
      tags
    );

    return ApiResponse.created({
      res,
      message: response.message,
    });
  });

  updateBlog = catchAsync(async (req: Request, res: Response) => {
    const blogId = req.params.id;
    const { title, subtitle, content, slug, metaTitle, metaDescription, tags } =
      req.body;

    const response = await adminBlogService.updateBlog(
      blogId as string,
      title,
      subtitle,
      content,
      slug,
      metaTitle,
      metaDescription,
      tags
    );

    return ApiResponse.success({
      res,
      message: response.message,
    });
  });
}

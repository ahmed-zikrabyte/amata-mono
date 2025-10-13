import { HTTP } from "../../../../config/http-status.config";
import { BlogModel } from "../../../../models/blog.model";
import { ServiceResponse } from "../../../../typings";
import AppError from "../../../../utils/AppError";

export default class AdminBlogService {
  getAll = async (
    page: number,
    limit: number,
    search: string
  ): ServiceResponse => {
    try {
      const skip = (page - 1) * limit;
      const query: any = {};
      if (search && search.length > 0) {
        query.$or = [{ title: { $regex: search, $options: "i" } }];
      }
      const [blogs, totalBlogs] = await Promise.all([
        BlogModel.find(query).skip(skip).limit(limit),
        BlogModel.countDocuments(query),
      ]);
      const totalPages = Math.ceil(totalBlogs / limit);

      return {
        data: {
          blogs,
          pagination: {
            page,
            limit,
            total: totalBlogs,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
          },
        },
        message: "Blogs fetched successfully",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  };

  getOne = async (blogId: string): ServiceResponse => {
    try {
      if (!blogId) {
        throw new AppError("Id is required", HTTP.BAD_REQUEST);
      }

      const blog = await BlogModel.findById(blogId);
      if (!blog) {
        throw new AppError("Blog not found", HTTP.NOT_FOUND);
      }

      return {
        data: blog,
        message: "Blog fetched successfully",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  };

  createBlog = async (
    title: string,
    subtitle: string,
    content: string,
    slug: string,
    metaTitle: string,
    metaDescription: string,
    tags: string
  ): ServiceResponse => {
    try {
      let parsedTags = JSON.parse(tags);
      if (
        !title ||
        !subtitle ||
        !content ||
        !slug ||
        !metaTitle ||
        !metaDescription ||
        parsedTags.length == 0
      ) {
        throw new AppError(
          "Please provide required fields: title, subtitle, and content",
          HTTP.BAD_REQUEST
        );
      }

      const slugCheck = await BlogModel.findOne({ slug });
      if (slugCheck) {
        throw new AppError(
          "Slug already exists in another blog",
          HTTP.BAD_REQUEST
        );
      }

      const blog = await BlogModel.create({
        title,
        subtitle,
        // image,
        content,
        slug,
        metaTitle,
        metaDescription,
        tags: parsedTags,
      });

      return {
        message: "Blog created successfully",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  };

  updateBlog = async (
    blogId: string,
    title: string,
    subtitle: string,
    content: string,
    slug: string,
    metaTitle: string,
    metaDescription: string,
    tags: string
  ): ServiceResponse => {
    try {
      const parsedTags = JSON.parse(tags);
      if (!blogId) {
        throw new AppError("Blog id is required", HTTP.INTERNAL_SERVER_ERROR);
      }
      let blog = await BlogModel.findById(blogId);

      if (!blog) {
        throw new AppError("Blog not found", HTTP.NOT_FOUND);
      }

      const updateData: any = {
        title,
        subtitle,
        content,
        slug,
        metaTitle,
        metaDescription,
        tags: parsedTags,
      };

      blog = await BlogModel.findByIdAndUpdate(blogId, updateData, {
        new: true, // Return updated document
        runValidators: true, // Run validators on update
      });

      return {
        message: "Blog updated successfully",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  };
}

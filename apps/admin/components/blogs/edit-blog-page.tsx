"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Loader2 } from "lucide-react";
import BlogCreationForm from "./blog-editor";
import { getOneBlog, updateBlog } from "../../services/blogServices";

interface IBlog {
  _id: string;
  title: string;
  subtitle: string;
  image: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
  content: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}


export default function EditBlogClient({ id }: { id: string }) {
  const [blogDetails, setBlogDetails] = useState<IBlog | null>(null);
  const [isLoading, setIsLoading] = useState(true)

  async function fetchBlogs() {
    const response = await getOneBlog(id);
    setIsLoading(false)
    console.log(response);
    setBlogDetails(response.data)
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  console.log({ blogDetails });
  const handleSubmission = async (values: {
    image: File | null;
    title: string;
    subtitle: string;
    content: string;
    slug: string;
    metaTitle: string;
    metaDescription: string;
    tags: string[];
  }) => {
    // Validation
    if (values.title.length < 5 || values.title.length > 200) {
      toast.error("Title must be between 5 and 200 characters");
      return;
    }
    if (values.subtitle.length < 5 || values.subtitle.length > 300) {
      toast.error("Subtitle must be between 10 and 300 characters");
      return;
    }
    if (!values.content.trim()) {
      toast.error("Content cannot be empty");
      return;
    }

    const formData = new FormData();
    if (values.image) formData.append("image", values.image);
    formData.append("title", values.title);
    formData.append("subtitle", values.subtitle);
    formData.append("content", values.content);
    formData.append("slug", values.slug);
    formData.append("metaTitle", values.metaTitle);
    formData.append("metaDescription", values.metaDescription);
    formData.append("tags", JSON.stringify(values.tags));
    const response = await updateBlog(id, formData)
    // try {
    //   setIsSubmitting(true);
    //   await updateBlog.mutateAsync({ id: id, formData });
    //   toast.success("Blog updated successfully");
    //   router.push("/blogs");
    // } catch (error) {
    //   console.error("Error updating blog:", error);
    //   toast.error("Failed to update blog post");
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2">Loading blog details...</p>
      </div>
    );
  }

  if (!blogDetails) {
    return (
      <div className="p-4 text-red-500 text-center">
        No blog data found. Please check the blog ID.
      </div>
    );
  }

  return (
    <div className=" mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">Edit Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <BlogCreationForm
            handleSubmission={handleSubmission}
            loading={isLoading}
            defaultValues={{
              title: blogDetails.title || "",
              subtitle: blogDetails.subtitle || "",
              content: blogDetails.content || "",
              image: blogDetails.image || "",
              metaTitle: blogDetails.metaTitle || "",
              metaDescription: blogDetails.metaDescription || "",
              slug: blogDetails.slug || "",
              tags: blogDetails.tags || [],
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}

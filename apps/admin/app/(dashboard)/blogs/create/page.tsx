"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import BlogCreationForm from "../../../../components/blogs/blog-editor";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { createBlog } from "../../../../services/blogServices";

export default function CreateBlogClient() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    if (!values.image) {
      toast.error("Please upload an image");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("subtitle", values.subtitle);
    formData.append("content", values.content);
    formData.append("slug", values.slug);
    formData.append("metaTitle", values.metaTitle);
    formData.append("metaDescription", values.metaDescription);
    formData.append("tags", JSON.stringify(values.tags))

    // Append image if exists
    if (values.image) {
      formData.append("image", values.image);
    }

    try {
      setIsSubmitting(true);

      // Perform blog creation
      const response = await createBlog(formData)

      // Success handling
      toast.success("Blog created successfully");
      router.push("/blog?type=blog");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Error handling
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to create blog post";

      console.error("Blog Creation Error:", error);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">
          Create a New Blog Post
        </CardTitle>
      </CardHeader>
      <CardContent>
        <BlogCreationForm
          handleSubmission={handleSubmission}
          loading={isSubmitting}
        />
      </CardContent>
    </Card>
  );
}

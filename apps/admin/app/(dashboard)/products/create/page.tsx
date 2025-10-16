"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { createProduct } from "@/services/productService";
import { getAllCategories } from "../../../../services/categoryServices";
import { TiptapEditor } from "../../../../components/text-editor/page";

const variantSchema = z.object({
  size: z.string().min(1, "Size is required"),
  price: z.string().min(1, "Price must be greater than 0"),
});

const imageSchema = z
  .instanceof(File)
  .refine((file) => file.type.startsWith("image/"), {
    message: "Only image files are allowed",
  });

const formSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  variants: z.array(variantSchema).min(1, "At least one variant is required"),
  category: z.string().min(1, "Category is required"),
  ingredients: z.string().min(1, "Ingredients are required"),
  images: z
    .array(imageSchema)
    .min(3, "Minimum 3 images are required")
    .max(5, "Maximum 5 images are required"),
  nutritionInformation: z
    .string()
    .min(1, "Nutrition information is required"),
  storageInfo: z.string().min(1, "Storage information is required"),
  suggestedUse: z.string().min(1, "Suggested use is required"),
  whyYouShouldUseThis: z.string().min(1, "This field is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function ProductForm() {
  const router = useRouter();
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    []
  );

  // Store image URLs to prevent flickering
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories(1, "");
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      variants: [
        {
          size: "",
          price: "",
        },
      ],
      category: "",
      ingredients: "",
      images: [],
      nutritionInformation: "",
      storageInfo: "",
      suggestedUse: "",
      whyYouShouldUseThis: "",
    },
  });

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  // Create stable image URLs using useMemo to prevent flickering
  const stableImageUrls = useMemo(() => {
    const images = form.watch("images");
    if (!images || images.length === 0) return [];

    // Clean up old URLs
    imageUrls.forEach((url) => {
      if (url.startsWith("blob:")) {
        URL.revokeObjectURL(url);
      }
    });

    // Create new URLs
    const newUrls = images.map((file) => URL.createObjectURL(file));
    setImageUrls(newUrls);
    return newUrls;
  }, [form.watch("images")]);

  // Cleanup URLs on unmount
  useEffect(() => {
    return () => {
      imageUrls.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [imageUrls]);

  const handleRemoveImage = (index: number) => {
    const currentImages = form.getValues("images");
    const updatedImages = [...currentImages];

    // Revoke the URL for the removed image
    if (stableImageUrls[index]) {
      URL.revokeObjectURL(stableImageUrls[index]);
    }

    updatedImages.splice(index, 1);

    form.setValue("images", updatedImages, {
      shouldValidate: true,
      shouldDirty: true,
    });

    // Validate image count
    if (updatedImages.length < 3 || updatedImages.length > 5) {
      form.setError("images", {
        type: "manual",
        message: "Minimum 3 and maximum 5 images are required",
      });
    } else {
      form.clearErrors("images");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    const existingFiles = form.getValues("images") || [];

    let allFiles = [...existingFiles, ...newFiles];

    // Remove duplicates (same name + size)
    allFiles = allFiles.filter(
      (file, index, self) =>
        index ===
        self.findIndex((f) => f.name === file.name && f.size === file.size)
    );

    // Check count
    if (allFiles.length === 0) {
      form.setError("images", {
        type: "manual",
        message: "Please select at least 1 image",
      });
      toast.error("Please select at least 1 image");
      return;
    }

    if (allFiles.length > 5) {
      form.setError("images", {
        type: "manual",
        message: "You can upload max 5 images",
      });
      toast.error("You can upload a maximum of 5 images");
      allFiles = allFiles.slice(0, 5);
    }

    // Validate file types
    const invalidFiles = allFiles.filter(
      (file) => !file.type.startsWith("image/")
    );
    if (invalidFiles.length > 0) {
      form.setError("images", {
        type: "manual",
        message: "Only image files are allowed",
      });
      toast.error("Only image files are allowed");
      return;
    }

    // Success
    form.clearErrors("images");
    form.setValue("images", allFiles, { shouldValidate: true });

    e.target.value = "";
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Form data:", data);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("ingredients", data.ingredients);
      formData.append("nutritionInformation", data.nutritionInformation);
      formData.append("storageInfo", data.storageInfo);
      formData.append("suggestedUse", data.suggestedUse);
      formData.append("whyYouShouldUseThis", data.whyYouShouldUseThis);
      formData.append("variants", JSON.stringify(data.variants));

      data.images.forEach((file) => {
        formData.append("images", file);
      });

      console.log({formData})
      const response = await createProduct(formData);
      console.log("Product created:", response);
      toast.success(response.message);
      router.push("/products");
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product. Please try again.");
    }
  };

  return (
    <div className="container mx-auto ">
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
          <CardDescription>
            Fill in the details to create a new product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Variants */}
              <div className="space-y-4 col-span-2">
                <div className="flex items-center justify-between">
                  <FormLabel>Product Variants</FormLabel>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      appendVariant({
                        size: "",
                        price: "",
                      })
                    }
                    className="transition"
                  >
                    + Add More
                  </Button>
                </div>

                {variantFields.map((field, index) => (
                  <Card key={field.id} className="p-4 relative">
                    {index >= 1 && (
                      <Button
                        variant="outline"
                        size="icon"
                        type="button"
                        onClick={() => removeVariant(index)}
                        className="absolute cursor-pointer top-2 right-2 w-6 h-6 text-red-500 hover:text-red-700 transition"
                        title="Remove Variant"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`variants.${index}.size`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Volume (ML)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="e.g., 100"
                                {...field}
                                onChange={(e) =>
                                  field.onChange((e.target.value) || "")
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`variants.${index}.price`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="e.g., 19.99"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    (e.target.value) || ""
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Card>
                ))}
              </div>

              {/* Product Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <TiptapEditor
                          content={field.value}
                          onChange={field.onChange}
                          disabled={form.formState.isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ingredients"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ingredients</FormLabel>
                      <FormControl>
                        <TiptapEditor
                          content={field.value}
                          onChange={field.onChange}
                          disabled={form.formState.isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nutritionInformation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nutrition Information</FormLabel>
                      <FormControl>
                        <TiptapEditor
                          content={field.value}
                          onChange={field.onChange}
                          disabled={form.formState.isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="storageInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Storage Information</FormLabel>
                      <FormControl>
                        <TiptapEditor
                          content={field.value}
                          onChange={field.onChange}
                          disabled={form.formState.isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="suggestedUse"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Suggested Use</FormLabel>
                      <FormControl>
                        <TiptapEditor
                          content={field.value}
                          onChange={field.onChange}
                          disabled={form.formState.isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="whyYouShouldUseThis"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Why You Should Use This</FormLabel>
                      <FormControl>
                        <TiptapEditor
                          content={field.value}
                          onChange={field.onChange}
                          disabled={form.formState.isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Images Section */}
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <div>
                      <FormLabel className="text-lg">Product Images</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Minimum 3 and maximum 5 images are required
                      </p>
                    </div>

                    {/* Upload Area */}
                    <label htmlFor="file-upload">
                      <div className="border border-dashed w-md border-gray-300 p-6 rounded-md text-center cursor-pointer hover:bg-gray-50 transition-colors">
                        <p className="text-sm text-muted-foreground">
                          Click to upload images
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Selected: {field.value?.length || 0} / 5 images
                        </p>
                      </div>
                      <Input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        hidden
                        onChange={handleImageChange}
                      />
                    </label>

                    {/* Image Preview */}
                    {stableImageUrls.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {stableImageUrls.map((url, index) => (
                          <Card
                            key={`${index}-${field.value[index]?.name}`}
                            className="p-2 relative"
                          >
                            <Image
                              width={200}
                              height={200}
                              src={url}
                              alt={`Selected ${index + 1}`}
                              className="w-full h-40 object-cover rounded"
                              unoptimized // Important for blob URLs
                            />
                            <Button
                              type="button"
                              size="icon"
                              variant="destructive"
                              className="absolute top-2 right-2 h-6 w-6"
                              onClick={() => handleRemoveImage(index)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                            <p className="text-xs text-center mt-1 truncate">
                              {field.value[index]?.name}
                            </p>
                          </Card>
                        ))}
                      </div>
                    )}

                    {/* Error Message */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button
                  disabled={form.formState.isSubmitting}
                  type="submit"
                  size="lg"
                >
                  {form.formState.isSubmitting
                    ? "Creating..."
                    : "Create Product"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

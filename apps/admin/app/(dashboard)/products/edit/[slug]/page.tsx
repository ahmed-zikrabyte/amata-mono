"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2, X } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { TiptapEditor } from "@/components/text-editor/page";
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
import { Skeleton } from "@workspace/ui/components/skeleton";
import { getAllCategories } from "../../../../../services/categoryServices";
import {
  getOneProduct,
  updateProduct,
} from "../../../../../services/productService";

// INTERFACES
interface IProduct {
  _id: string;
  name: string;
  description: string;
  category: { _id: string; name: string };
  variants: { _id?: string; size: number; price: number }[];
  images: string[];
  ingredients: string;
  nutritionInformation: string;
  storageInfo: string;
  suggestedUse: string;
  whyYouShouldUseThis: string;
}

// VALIDATION SCHEMAS
const variantSchema = z.object({
  _id: z.string().optional(),
  size: z.string().min(1, "Size is required"),
  price: z.string().min(1, "Price must be greater than 0"),
});

const imageFileSchema = z
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
  nutritionInformation: z
    .string()
    .min(1, "Nutrition information is required"),
  storageInfo: z.string().min(1, "Storage information is required"),
  suggestedUse: z.string().min(1, "Suggested use is required"),
  whyYouShouldUseThis: z.string().min(1, "This field is required"),
  newImages: z.array(imageFileSchema).optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function ProductEditForm() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  // Image state
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      variants: [],
      category: "",
      ingredients: "",
      nutritionInformation: "",
      storageInfo: "",
      suggestedUse: "",
      whyYouShouldUseThis: "",
      newImages: [],
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

  useEffect(() => {
    async function fetchData() {
      if (!slug) {
        toast.error("Product slug not found.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const [catResponse, prodResponse] = await Promise.all([
          getAllCategories(1, ""),
          getOneProduct(slug),
        ]);

        setCategories(catResponse.data.categories || []);

        const productData: IProduct = prodResponse.data;
        if (productData) {
          setExistingImages(productData.images || []);

          form.reset({
            name: productData.name,
            description: productData.description,
            category: productData.category._id,
            variants: productData.variants.map((v) => ({
              ...v,
              size: String(v.size),
              price: String(v.price),
            })),
            ingredients: productData.ingredients,
            nutritionInformation: productData.nutritionInformation,
            storageInfo: productData.storageInfo,
            suggestedUse: productData.suggestedUse,
            whyYouShouldUseThis: productData.whyYouShouldUseThis,
            newImages: [],
          });
        } else {
          toast.error("Product not found.");
          router.push("/products");
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load product data.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug, form, router]);

  const newImageUrls = useMemo(() => {
    const newImages = form.watch("newImages");
    return (newImages || []).map((file) => URL.createObjectURL(file));
  }, [form.watch("newImages")]);

  useEffect(() => {
    return () => {
      newImageUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [newImageUrls]);

  const handleRemoveExistingImage = (imageUrl: string) => {
    setExistingImages((prev) => prev.filter((img) => img !== imageUrl));
    setDeletedImages((prev) => [...prev, imageUrl]);
  };

  const handleRemoveNewImage = (index: number) => {
    const updatedNewImages = [...(form.getValues("newImages") || [])];
    updatedNewImages.splice(index, 1);
    form.setValue("newImages", updatedNewImages, { shouldValidate: true });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const currentNewImages = form.getValues("newImages") || [];
    const totalImages =
      existingImages.length + currentNewImages.length + files.length;

    if (totalImages > 5) {
      toast.error(
        `You can upload a maximum of 5 images. You already have ${
          existingImages.length + currentNewImages.length
        }.`
      );
      return;
    }

    const allNewImages = [...currentNewImages, ...files];
    form.setValue("newImages", allNewImages, { shouldValidate: true });
    e.target.value = "";
  };

  const totalImageCount =
    existingImages.length + (form.watch("newImages")?.length || 0);

  const onSubmit = async (data: FormData) => {
    if (totalImageCount < 3) {
      toast.error("A minimum of 3 images is required.");
      return;
    }

    try {
      const formData = new FormData();

      // Append all simple key-value pairs
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("ingredients", data.ingredients);
      formData.append("nutritionInformation", data.nutritionInformation);
      formData.append("storageInfo", data.storageInfo);
      formData.append("suggestedUse", data.suggestedUse);
      formData.append("whyYouShouldUseThis", data.whyYouShouldUseThis);

      // Append complex data as JSON strings
      formData.append("variants", JSON.stringify(data.variants));
      formData.append("deletedImages", JSON.stringify(deletedImages));

      // Append new image files
      if (data.newImages) {
        data.newImages.forEach((file) => {
          formData.append("images", file);
        });
      }

      const response = await updateProduct(slug, formData);
      toast.success(response.message || "Product updated successfully!");
      router.push("/products");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-24 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-12 w-32" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto ">
      <Card>
        <CardHeader>
          <CardTitle>Edit Product</CardTitle>
          <CardDescription>
            Update the details for '{form.getValues("name")}'
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
                        value={field.value}
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
                    onClick={() => appendVariant({ size: "", price: "" })}
                    className="transition"
                  >
                    + Add More
                  </Button>
                </div>

                {variantFields.map((field, index) => (
                  <Card key={field.id} className="p-4 relative">
                    {variantFields.length > 1 && (
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
                                  field.onChange(e.target.value || "")
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
              <div className="space-y-6">
                <div>
                  <FormLabel className="text-lg">Product Images</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Total images: {totalImageCount} / 5 (minimum 3 required)
                  </p>
                </div>

                {/* Existing Images */}
                {existingImages.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Existing Images</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {existingImages.map((imageUrl, index) => (
                        <Card
                          key={`existing-${index}`}
                          className="p-2 relative"
                        >
                          <Image
                            width={200}
                            height={200}
                            src={imageUrl}
                            alt={`Existing image ${index + 1}`}
                            className="w-full h-40 object-cover rounded"
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            className="absolute top-2 right-2 h-6 w-6"
                            onClick={() => handleRemoveExistingImage(imageUrl)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* New Images */}
                <FormField
                  control={form.control}
                  name="newImages"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      {totalImageCount < 5 && (
                        <div>
                          <FormLabel>Add New Images</FormLabel>
                          <label htmlFor="file-upload">
                            <div className="border border-dashed w-full border-gray-300 p-6 rounded-md text-center cursor-pointer hover:bg-gray-50 transition-colors">
                              <p className="text-sm text-muted-foreground">
                                Click to upload images
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                You can add {5 - totalImageCount} more.
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
                        </div>
                      )}

                      {newImageUrls.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                          {newImageUrls.map((url, index) => (
                            <Card key={`new-${index}`} className="p-2 relative">
                              <Image
                                width={200}
                                height={200}
                                src={url}
                                alt={`New image ${index + 1}`}
                                className="w-full h-40 object-cover rounded"
                                unoptimized
                              />
                              <Button
                                type="button"
                                size="icon"
                                variant="destructive"
                                className="absolute top-2 right-2 h-6 w-6"
                                onClick={() => handleRemoveNewImage(index)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                              <p className="text-xs text-center mt-1 truncate">
                                {field.value?.[index]?.name}
                              </p>
                            </Card>
                          ))}
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  disabled={form.formState.isSubmitting || loading}
                  type="submit"
                  size="lg"
                >
                  {form.formState.isSubmitting
                    ? "Updating..."
                    : "Update Product"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

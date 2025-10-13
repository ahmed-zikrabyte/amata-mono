"use client";
import { useEffect, useState } from "react";
import type React from "react";
import Image from "next/image";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import { useRouter } from "next/navigation";
import StarterKit from "@tiptap/starter-kit";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TextAlign from "@tiptap/extension-text-align";
import TipTapImage from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import FontSize from "@tiptap/extension-font-size";
import { Color } from "@tiptap/extension-color";
import { MenuBar } from "./menu-bar";
interface BlogFormProps {
  handleSubmission: (data: {
    title: string;
    content: string;
    subtitle: string;
    slug: string;
    metaTitle: string;
    metaDescription: string;
    tags: string[];
    image: File | null;
  }) => Promise<void>;
  loading?: boolean;
  defaultValues?: {
    title: string;
    image: string;
    subtitle: string;
    content: string;
    slug: string;
    metaTitle: string;
    metaDescription: string;
    tags: string[];
  };
}

export default function BlogCreationForm({
  handleSubmission,
  loading,
  defaultValues,
}: BlogFormProps) {
  const [title, setTitle] = useState(defaultValues?.title ?? "");
  const [subtitle, setSubtitle] = useState(defaultValues?.subtitle ?? "");
  const [slug, setSlug] = useState(defaultValues?.slug ?? "");
  const [metaTitle, setMetaTitle] = useState(defaultValues?.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(
    defaultValues?.metaDescription ?? ""
  );
  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState(defaultValues?.tags ?? []);
  const [content, setContent] = useState(defaultValues?.content ?? "");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    defaultValues?.image ?? null
  );
  const [isFileUploading, setIsFileUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      Color,
      TableHeader,
      TableCell,
      TipTapImage.configure({
        inline: true,
        allowBase64: true,
      }),
      FontFamily.configure({
        types: ["textStyle"],
      }),
      FontSize.configure({
        types: ["textStyle"],
      }),
      Link.configure({
        openOnClick: false,
      }),
      TextStyle,
    ],
    content: content,
    editable: true,
    immediatelyRender: false, // 👈 add this line
    onUpdate: ({ editor }) => {
      if (!isFileUploading) {
        setContent(editor.getHTML());
      }
    },
  });

  const addTag = () => {
    tags.push(newTag);
    setNewTag("");
  };

  const removeTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsFileUploading(true);
        if (file.size > 5 * 1024 * 1024) {
          toast.error("File size must be less than 5MB");
          e.target.value = "";
          return;
        }
        const validTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/avif",
          "image/webp",
        ];
        if (!validTypes.includes(file.type)) {
          toast.error("Only JPG, JPEG, PNG and AVIF files are allowed");
          e.target.value = "";
          return;
        }
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } finally {
        setIsFileUploading(false);
        e.target.value = "";
      }
    }
  };

  useEffect(() => {
    if (editor && defaultValues?.content) {
      setTimeout(() => {
        editor.commands.setContent(defaultValues.content);
      }, 100);
    }
  }, [editor, defaultValues?.content]);

  // Fetch and set the image preview from URL if we have a default image URL
  useEffect(() => {
    if (defaultValues?.image && !imagePreview) {
      setImagePreview(defaultValues.image);
    }
  }, [defaultValues?.image, imagePreview]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!defaultValues?.image && !image) {
      return toast.error("Please upload an image");
    }
    try {
      if (title.length < 5 || title.length > 200) {
        toast.error("Title must be between 5 and 200 characters");
        return;
      }
      if (subtitle.length < 5 || subtitle.length > 300) {
        toast.error("Subtitle must be between 10 and 300 characters");
        return;
      }
      if (!content.trim()) {
        toast.error("Content cannot be empty");
        return;
      }
      if (!slug.trim()) {
        toast.error("Slug cannot be empty");
        return;
      }
      if (!metaTitle.trim()) {
        toast.error("Meta title cannot be empty");
        return;
      }
      if (!metaDescription.trim()) {
        toast.error("Meta description cannot be empty");
        return;
      }
      if (tags.length === 0) {
        toast.error("Tags must be added");
        return;
      }
      await handleSubmission({
        title,
        content,
        image,
        subtitle,
        slug,
        metaTitle,
        metaDescription,
        tags,
      });
    } catch (error) {
      console.error("Error creating/updating blog post:", error);
      toast.error("Failed to create/update blog post");
    }
  };

  const router = useRouter();
  const handleCancel = () => {
    router.back();
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter blog title"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="subtitle">Subtitle</Label>
        <Input
          id="subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          required
          placeholder="Enter blog subtitle"
          className="mt-1"
        />
      </div>
      <div className="space-y-3">
        <p className="font-medium">SEO Fields</p>
        <div className="grid grid-cols-2 gap-3 p-4 rounded-md border-1">
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value.replace(/\s+/g, ""))}
              required
              placeholder="Enter slug"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="meta_title">Meta Title</Label>
            <Input
              id="meta_title"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              required
              placeholder="Enter meta title"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="meta_description">Meta Description</Label>
            <Input
              id="meta_description"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              required
              placeholder="Enter meta description"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="tags">Tags</Label>
            <div className="flex items-center space-x-3 my-1">
              <Input
                id="tags"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Enter new tag"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // prevent form submit if inside a form
                    addTag();
                  }
                }}
              />
              <Button
                type="button"
                disabled={newTag.length === 0}
                onClick={() => addTag()}
              >
                Add
              </Button>
            </div>
            <div className="flex gap-3">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-amber-200 w-max px-2 py-1 rounded-md"
                >
                  <p>{tag}</p>
                  <X
                    className="h-5 w-5 bg-yellow-600/30 rounded cursor-pointer"
                    onClick={() => removeTag(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Label htmlFor="image">Featured Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1"
        />
        {imagePreview && (
          <div className="mt-2">
            <Image
              src={imagePreview || "/placeholder.svg"}
              alt="Image preview"
              width={200}
              height={200}
              className="object-cover rounded"
            />
          </div>
        )}
      </div>
      <div>
        <Label htmlFor="content">Content</Label>
        <div className="mt-1 border rounded-lg">
          {editor && <MenuBar editor={editor} />}
          {editor && (
            <EditorContent
              editor={editor}
              className="prose max-w-none p-4 min-h-[400px]"
            />
          )}
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button
          onClick={handleCancel}
          disabled={loading}
          variant="outline"
          type="button"
          className="w-full  text-black  cursor-pointer md:w-auto"
        >
          Cancel
        </Button>
        <Button
          disabled={loading}
          type="submit"
          className="w-full  text-white  cursor-pointer md:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {defaultValues ? "Updating..." : "Creating..."}
            </>
          ) : defaultValues ? (
            "Update Blog"
          ) : (
            "Create Blog"
          )}
        </Button>
      </div>
    </form>
  );
}

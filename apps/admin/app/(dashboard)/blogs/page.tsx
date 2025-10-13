"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, ImageIcon, Trash, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ConfirmationModal from "@/components/global/confirmation-modal";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@workspace/ui/components/button";
import { Switch } from "@workspace/ui/components/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";

import {
  deleteBlog,
  getBlogs,
  toggleBlogStatus,
} from "../../../services/blogServices";
import NavBar from "../../../components/global/nav-bar";
import Image from "next/image";

interface IBlog {
  _id: string;
  title: string;
  subtitle: string;
  isActive: boolean;
  image: string;
  content: string;
  tags: string[];
  slug: string;
  metaTitle: string;
  metaDescription: string;
}

const Page = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [blogs, setBlogs] = useState<IBlog[] | null>(null);
  const router = useRouter();
  const [blogId, setBlogId] = useState("");
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    total: 0,
    hasNextPage: false,
    hasPrevPage: false,
    totalPages: 1,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogData, setBlogData] = useState<IBlog | null>(null);

  const handlePaginationChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  const fetchBlogs = async () => {
    const response = await getBlogs();
    setBlogs(response.data?.blogs);
    setPagination({
      currentPage: response.data?.pagination?.page,
      total: response.data?.pagination?.total,
      hasNextPage: response.data?.pagination?.hasNextPage,
      hasPrevPage: response.data?.pagination?.hasPrevPage,
      totalPages: response.data?.pagination?.totalPages,
    });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleToggleStatus = async () => {
    const response = await toggleBlogStatus(blogId);
    if (response.success) {
      toast.success(response.message);
      fetchBlogs();
    } else {
      toast.error(response.message);
    }
  };

  const handleDelete = async () => {
    const response = await deleteBlog(blogId);
    if (response.success) {
      toast.success(response.message);
      fetchBlogs();
    } else {
      toast.error(response.message);
    }
  };

  const columns: ColumnDef<IBlog, any>[] = [
    {
      accessorKey: "Sl.No",
      header: "Sl.No",
      cell: ({ row }) => {
        return <div>{(pagination.currentPage - 1) * 10 + row.index + 1}</div>;
      },
    },
    {
      accessorKey: "Title",
      header: "Title",
      cell: ({ row }) => {
        const text = row.original.title;
        return (
          <div>{text.length > 35 ? `${text.substring(0, 35)}...` : text}</div>
        );
      },
    },
    {
      accessorKey: "Subtitle",
      header: "Subtitle",
      cell: ({ row }) => {
        const text = row.original.subtitle;
        return (
          <div>{text.length > 35 ? `${text.substring(0, 35)}...` : text}</div>
        );
      },
    },

    {
      accessorKey: "Status",
      header: "Status",
      cell: ({ row }) => {
        return (
          <div>
            <Switch
              className={`${row.original.isActive ? "!bg-green-500" : "bg-gray-400"}`}
              checked={row.original.isActive}
              onCheckedChange={() => {
                setBlogId(row.original._id);
                setOpen(true);
              }}
            />
          </div>
        );
      },
    },
    {
      accessorKey: "Action",
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="space-x-2">
            <Button
              variant={"outline"}
              onClick={() => {
                setIsModalOpen(true);
                setBlogData(row.original);
              }}
            >
              <Eye />
            </Button>
            <Link href={`/blogs/edit/${row.original._id}`}>
              <Button variant={"outline"}>
                <Edit className="text-blue-400" />
              </Button>
            </Link>
            <Button
              variant={"outline"}
              onClick={() => {
                setBlogId(row.original._id);
                setOpenDeleteDialog(true);
              }}
            >
              <Trash className="text-red-500" />
            </Button>
          </div>
        );
      },
    },
  ];

  if (!blogs) {
    return <div>Loading....</div>;
  }
  return (
    <div className="w-full flex flex-col gap-4">
      <NavBar
        label="Blogs"
        button={
          <Button
            className="bg-black text-white hover:bg-black/90 duration-150"
            onClick={() => router.push("/blogs/create")}
          >
            Add new Blog
          </Button>
        }
      />
      <DataTable
        onPaginationChange={handlePaginationChange}
        columns={columns}
        data={blogs}
      />
      <ConfirmationModal
        title="Toggle Blog status"
        description="Are you sure you want to update status?"
        open={open}
        onOpenChange={setOpen}
        onConfirm={() => handleToggleStatus()}
      />
      <ConfirmationModal
        title="Delete Blog"
        description="Are you sure you want to delete?"
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        onConfirm={() => handleDelete()}
      />
      <BlogDetailsModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        blog={blogData}
      />
    </div>
  );
};

export default Page;

const BlogDetailsModal = ({
  isOpen,
  setIsOpen,
  blog,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  blog: IBlog | null;
}) => {
  if (!blog) return null;

  // Function to strip HTML tags but preserve formatting for display
  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-hidden p-0 flex flex-col">
        <DialogHeader className="sticky top-0 z-10 px-6 py-4 bg-white border-b">
          <div className="flex items-center  justify-between">
            <DialogTitle className="text-xl">Blog Post Details</DialogTitle>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              <X size={16} />
            </Button>
          </div>
          <DialogDescription>Full details of the blog post</DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto flex-1 px-6 py-4 space-y-6">
          {/* Featured Image */}
          {blog.image ? (
            <div className="w-full flex justify-center">
              <div className="relative w-full max-w-2xl rounded-lg overflow-hidden shadow-md">
                <div className="aspect-video relative">
                  <Image
                    src={blog.image || "/placeholder.svg"}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full aspect-video max-w-2xl mx-auto bg-gray-100 flex items-center justify-center rounded-lg shadow-inner">
              <div className="flex flex-col items-center text-gray-400">
                <ImageIcon size={64} />
                <p className="mt-2 text-sm">No image available</p>
              </div>
            </div>
          )}

          {/* Title & Subtitle */}
          <div className="space-y-2 border-b pb-4">
            <h1 className="text-2xl font-bold">{blog.title}</h1>
            {blog.subtitle && (
              <h2 className="text-xl text-gray-600">{blog.subtitle}</h2>
            )}
          </div>

          <div>
            <p>Slug : {blog?.slug}</p>
            <p>Meta Title : {blog?.metaTitle}</p>
            <p>Meta Description: {blog?.metaDescription}</p>
            <div>
              {" "}
              Tags:
              {blog?.tags?.map((tag, index) => (
                <span key={index} className="ml-2 px-2 rounded-sm bg-amber-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center space-x-2">
            <span className="font-medium">Status:</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                blog.isActive
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {blog.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg border-b pb-2">Content</h3>
            <div
              className="prose prose-sm md:prose-base max-w-none border p-4 rounded-md bg-gray-50 shadow-inner"
              dangerouslySetInnerHTML={createMarkup(blog.content)}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

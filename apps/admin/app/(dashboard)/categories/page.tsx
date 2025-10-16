"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ConfirmationModal from "@/components/global/confirmation-modal";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@workspace/ui/components/button";
import NavBar from "@/components/global/nav-bar";
import { Switch } from "@workspace/ui/components/switch";
import { Input } from "@workspace/ui/components/input";
import { deleteCategory, getAllCategories, toggleCategoryStatus } from "../../../services/categoryServices";


interface Category {
  name: string;
  slug: string;
  image: string;
  createdAt: string;
}
const Page = () => {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);
  const [slug, setSlug] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false,
    totalPages: 0,
  })
  const router = useRouter();
  const pathname = usePathname()

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories(Number(searchParams.get("page") || 1), searchParams.get("search") || "");
      console.log({response})
      setCategories(response.data.categories);
      setPagination({
        currentPage: response.data.pagination.currentPage,
        hasNextPage: response.data.pagination.hasNextPage,
        hasPrevPage: response.data.pagination.hasPrevPage,
        totalPages: response.data.pagination.totalPages,
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [searchParams.get("search"), searchParams.get("page")]);

  const handleToggle = async () => {
    try {
      const response = await toggleCategoryStatus(slug as string);
      toast.success(response.message);
      fetchCategories();
    } catch (error: any) {
      toast.error(
        error.response.data.message || "Failed to toggle category status"
      );
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteCategory(slug as string);
      toast.success(response.message);
      fetchCategories();
    } catch (error: any) {
      toast.error(error.response.data.message || "Failed to delete category");
    }
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = (search: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", search);

    if (search === "") {
      params.delete("search");
    }

    router.push(`${pathname}?${params.toString()}`);
  };
  
  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: "Sl.No",
      header: "Sl.No",
      cell: ({ row }) => {
        return (
          <div>
            {(Number(searchParams.get("page") || 1) - 1 ) * 10 + row.index + 1}
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        return <div>{row.original.name}</div>;
      },
    },

    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const imageUrl = row.original.image;

        return (
          <div className="w-14 h-14 relative rounded-md overflow-hidden border">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return <div>{row.original.isActive ? "Active" : "Inactive"}</div>;
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const isActive = row.original.isActive;

        return (
          <div className="flex items-center gap-2 cursor-pointer">
            <Switch
              className={`cursor-pointer ${isActive ? "!bg-green-500" : "bg-gray-500"}`}
              checked={isActive}
              onCheckedChange={() => {
                setSlug(row.original.slug);
                setOpen(true);
              }}
            />
            <Link href={`/categories/edit/${row.original.slug}`}>
              <Button variant="outline" className=" cursor-pointer text-white">
                <EditIcon className="w-4 h-4 text-blue-500" />
              </Button>
            </Link>
            <Button
              variant={"outline"}
              className="cursor-pointer"
              onClick={() => {
                setSlug(row.original.slug);
                setOpenDeleteConfirmModal(true);
              }}
            >
              <Trash className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      <NavBar
        label="Categories"
        filtersComponent={
          <Input
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search category name"
          />
        }
        button={
          <Link href="/categories/create">
            <Button
              className="bg-black cursor-pointer text-white"
              variant="default"
            >
              Add Category
            </Button>
          </Link>
        }
      />
      <DataTable columns={columns} data={categories} pagination={pagination} onPaginationChange={handlePageChange} />
      <ConfirmationModal
        open={open}
        onOpenChange={setOpen}
        onConfirm={handleToggle}
        title="Toggle Category Status"
        description="Are you sure you want to toggle the category status?"
      />
      <ConfirmationModal
        open={openDeleteConfirmModal}
        onOpenChange={setOpenDeleteConfirmModal}
        onConfirm={handleDelete}
        title="Delete Category"
        description="Are you sure you want to delete the category?"
      />
    </div>
  );
};

export default Page;

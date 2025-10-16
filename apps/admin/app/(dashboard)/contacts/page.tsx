"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@workspace/ui/components/button";
import { getContacts } from "../../../services/contactServices";
import NavBar from "../../../components/global/nav-bar";
import ContactModal from "../../../components/contacts/contact-modal";

interface IContact {
  _id: string;
  name: string;
  email: string;
  message: string;
}

const Page = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [contacts, setContacts] = useState<IContact[] | null>(null);
  const [contactDataView, setContactDataView] = useState({ name: "", email: "", message: "" });
  const [openContactModal, setOpenContactModal] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    total: 0,
    hasNextPage: false,
    hasPrevPage: false,
    totalPages: 1,
  });

  const handlePaginationChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  const fetchContacts = async () => {
    const response = await getContacts();
    setContacts(response.data.contacts);
    setPagination({
      currentPage: response.data.pagination.page,
      total: response.data.pagination.total,
      hasNextPage: response.data.pagination.hasNextPage,
      hasPrevPage: response.data.pagination.hasPrevPage,
      totalPages: response.data.pagination.totalPages,
    });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const columns: ColumnDef<IContact, any>[] = [
    {
      accessorKey: "Sl.No",
      header: "Sl.No",
      cell: ({ row }) => {
        return <div>{(pagination.currentPage - 1) * 10 + row.index + 1}</div>;
      },
    },
    {
      accessorKey: "Name",
      header: "Name",
      cell: ({ row }) => {
        const text = row.original.name;
        return (
          <div>{text.length > 35 ? `${text.substring(0, 35)}...` : text}</div>
        );
      },
    },
    {
      accessorKey: "Email",
      header: "Email",
      cell: ({ row }) => {
        const text = row.original.email;
        return (
          <div>{text.length > 35 ? `${text.substring(0, 35)}...` : text}</div>
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
                setContactDataView({
                  name: row.original.name,
                  email: row.original.email,
                  message: row.original.message,
                });
                setOpenContactModal(true);
              }}
            >
              <Eye />
            </Button>
          </div>
        );
      },
    },
  ];

  if (!contacts) {
    return <div>Loading....</div>;
  }
  return (
    <div className="w-full flex flex-col gap-4">
      <NavBar
        label="Contacts"
      />
      <DataTable
        onPaginationChange={handlePaginationChange}
        columns={columns}
        data={contacts}
      />
      <ContactModal
        open={openContactModal}
        onOpenChange={setOpenContactModal}
        data={contactDataView}
      />
    </div>
  );
};

export default Page;
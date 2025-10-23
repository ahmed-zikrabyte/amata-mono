import React from "react";
import { Badge } from "@workspace/ui/components/badge";
import { cn } from "../../../../packages/ui/src/lib/utils";

interface CustomBadgeProps {
  text: string;
  type:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "returned"
}

const CustomBadge: React.FC<CustomBadgeProps> = ({ text, type }) => {
  const badgeClass = cn("px-3 py-1 text-sm font-medium rounded-full", {
    "bg-yellow-100 text-yellow-800 border border-yellow-300": type === "pending",
    "bg-blue-100 text-blue-800 border border-blue-300": type === "processing",
    "bg-green-100 text-green-800 border border-green-300": type === "shipped",
    "bg-green-200 text-green-900 border border-green-400": type === "delivered",
    "bg-red-100 text-red-800 border border-red-300": type === "cancelled",
    "bg-gray-100 text-gray-700 border border-gray-300": type === "returned",
    "bg-slate-100 text-slate-800 border border-slate-300": ![
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
      "returned",
    ].includes(type),
  });

  return <Badge className={badgeClass}>{text}</Badge>;
};

export default CustomBadge;

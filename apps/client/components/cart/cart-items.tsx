import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { Button } from "@workspace/ui/components/button";
import { Minus, Plus, Trash2 } from "lucide-react";

const CartItems = () => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Products Ghee</TableCell>
            <TableCell>
              <div className="flex items-center p-1 rounded-lg border-2 border-amber-950 w-min">
                <Button size={"sm"} className="cursor-pointer">
                  <Minus />
                </Button>
                <div className="h-10 w-8 flex justify-center items-center">
                  {5}
                </div>
                <Button size={"sm"} className="cursor-pointer">
                  <Plus />
                </Button>
              </div>
            </TableCell>
            <TableCell>800</TableCell>
            <TableCell className="text-right">
              <Button variant={"ghost"} className="cursor-pointer">
                <Trash2 />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CartItems;

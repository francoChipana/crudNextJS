"use client";

import { Product } from "@/entities/Product";
import { TableCell, TableRow } from "@/lib/ui/Table";
import { Button } from "@/lib/ui/button";
import { deleteProduct } from "@/service/ProductService";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  product: Product;
}

const ProductRow = ({ product }: Props) => {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    router.refresh();
  };

  const handleEdit = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <TableRow key={`product${product.id}`}>
      <TableCell className="font-medium">{product.id}</TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell className="flex gap-2 justify-center">
        <Button
          className="bg-blue-600 hover:bg-blue-500 p-2 text-sm"
          onClick={() => handleEdit(product.id)}
        >
          <Edit />
        </Button>
        <Button
          className="bg-red-600 hover:bg-red-500 p-2 text-sm"
          onClick={() => {
            handleDelete(product.id);
          }}
        >
          <Trash2 />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ProductRow;

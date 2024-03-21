"use client";

import { Button } from "@/lib/ui/button";
import { deleteProduct } from "@/service/ProductService";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  productId: string;
}

const DeleteProduct = ({ productId }: Props) => {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteProduct(productId);
    router.refresh();
  };

  return (
    <Button
      className="bg-red-600 hover:bg-red-500 p-2 text-sm"
      onClick={() => {
        handleDelete();
      }}
    >
      <Trash2 />
    </Button>
  );
};

export default DeleteProduct;

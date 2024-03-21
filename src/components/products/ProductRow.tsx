/* eslint-disable @next/next/no-img-element */
import { Product } from "@/entities/Product";
import { TableCell, TableRow } from "@/lib/ui/Table";
import { Edit } from "lucide-react";
import Link from "next/link";
import DeleteProduct from "./DeleteProduct";

interface Props {
  product: Product;
}

const ProductRow = ({ product }: Props) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{product.id}</TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell className="justify-center w-14">
        <img
          src={`http://127.0.0.1:8090/api/files/c9zsto4w07cy6e1/${product.id}/${product.image}`}
          alt="imagen"
        />
      </TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell className="flex gap-4 justify-center">
        <Link
          className="bg-blue-600 hover:bg-blue-500 p-2 text-sm text-white rounded-md"
          href={`/products/${product.id}`}
        >
          <Edit />
        </Link>
        <DeleteProduct productId={product.id} />
      </TableCell>
    </TableRow>
  );
};

export default ProductRow;

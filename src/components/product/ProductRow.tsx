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
    <TableRow key={`product${product.id}`}>
      <TableCell className="font-medium">{product.id}</TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell className="flex gap-2 justify-center">
        <Link
          className="bg-blue-600 hover:bg-blue-500 p-2 text-sm text-white rounded-md"
          href={`/product/${product.id}`}
        >
          <Edit />
        </Link>
        <DeleteProduct productId={product.id} />
      </TableCell>
    </TableRow>
  );
};

export default ProductRow;

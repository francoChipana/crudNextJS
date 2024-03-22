/* eslint-disable @next/next/no-img-element */
import { Product } from "@/entities/Product";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/lib/ui/card";
import { Edit } from "lucide-react";
import Link from "next/link";
import DeleteProduct from "./DeleteProduct";

interface Props {
  product: Product;
}

const ProductRow = ({ product }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription className="h-32">
          <img
            src={`http://127.0.0.1:8090/api/files/c9zsto4w07cy6e1/${product.id}/${product.image}`}
            alt={product.name}
            className="object-contain w-full h-full"
          />
        </CardDescription>
      </CardHeader>
      <CardContent>Precio: ${product.price}</CardContent>
      <CardFooter className="flex gap-4 justify-center">
        <Link
          className="bg-blue-600 hover:bg-blue-500 p-2 text-sm text-white rounded-md"
          href={`/products/edit/${product.id}`}
        >
          <Edit />
        </Link>
        <DeleteProduct productId={product.id} />
      </CardFooter>
    </Card>
  );
};

export default ProductRow;

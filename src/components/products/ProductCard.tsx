/* eslint-disable @next/next/no-img-element */
import { Product } from "@/entities/Product";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/ui/accordion";
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

const ProductCard = ({ product }: Props) => {
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
      <CardContent className="flex flex-col gap-2">
        <span>Precio: ${product.price}</span>
        <div className="flex justify-center gap-4">
          <Link
            className="bg-blue-600 hover:bg-blue-500 p-2 text-sm text-white rounded-md"
            href={`/products/edit/${product.id}`}
          >
            <Edit />
          </Link>
          <DeleteProduct productId={product.id} />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <h3 className="w-full text-left">Categorias</h3>
        <Accordion type="single" collapsible className="w-full">
          {product.categories.map((category) => (
            <AccordionItem
              key={`${product.id}${category.id}`}
              value={`${product.id}${category.id}`}
            >
              <AccordionTrigger>{category.name}</AccordionTrigger>
              <AccordionContent>{category.description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

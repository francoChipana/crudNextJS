import { Header } from "@/components/products/Header";
import ProductRow from "@/components/products/ProductRow";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/ui/Table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
} from "@/lib/ui/pagination";
import { listProducts } from "@/service/ProductService";

const productPage = async () => {
  const { totalPages, ...products } = await listProducts();
  const paginationItems = [];

  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <PaginationItem>
        <PaginationLink href={`/products/${i}`}>{i}</PaginationLink>
      </PaginationItem>
    );
  }

  return (
    <main className="container mt-10 max-w-6xl">
      <Header />
      <Table className="text-center">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center ">ID</TableHead>
            <TableHead className="text-center ">Nombre</TableHead>
            <TableHead className="text-center ">Imagen</TableHead>
            <TableHead className="text-center ">Precio</TableHead>
            <TableHead className="text-center ">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.items.map((product) => (
            <ProductRow
              key={`product${product.id}`}
              product={JSON.parse(JSON.stringify(product))}
            />
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          {paginationItems.map((page) => page)}
          <PaginationItem>
            <PaginationNext href={"products/2"} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
};

export default productPage;

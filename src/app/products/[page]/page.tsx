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
  PaginationPrevious,
} from "@/lib/ui/pagination";
import { listProducts } from "@/service/ProductService";

const tablePagination = async ({ params }: any) => {
  const { totalPages, ...products } = await listProducts(params.page);
  const paginationItems = [];

  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <PaginationItem key={`pagination${i}`}>
        <PaginationLink href={`/products/${i}`}>{i}</PaginationLink>
      </PaginationItem>
    );
  }

  return (
    <>
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
            {params.page != 1 && (
              <PaginationItem>
                <PaginationPrevious href={`${Number(params.page) - 1}`} />
              </PaginationItem>
            )}
            {paginationItems.map((page) => page)}
            {params.page != totalPages && (
              <PaginationItem>
                <PaginationNext href={`${Number(params.page) + 1}`} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </main>
    </>
  );
};

export default tablePagination;

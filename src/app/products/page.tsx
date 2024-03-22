import { Header } from "@/components/products/Header";
import Pagination from "@/components/products/Pagination";
import ProductRow from "@/components/products/ProductRow";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/ui/Table";
import { listProducts } from "@/service/ProductService";

const productPage = async ({ searchParams }: { searchParams: any }) => {
  const { totalPages, ...products } = await listProducts(
    searchParams.page ? Number(searchParams.page) : 1
  );

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
      <Pagination totalPages={totalPages} />
    </main>
  );
};

export default productPage;

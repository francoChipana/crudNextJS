import { Header } from "@/components/page/home/Header";
import ProductRow from "@/components/page/home/ProductRow";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/ui/Table";
import { listProducts } from "@/service/ProductService";

const productPage = async () => {
  const products = await listProducts();

  return (
    <main className="container mt-10 max-w-6xl">
      <Header />
      <Table className="text-center">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">ID</TableHead>
            <TableHead className="text-center">Nombre</TableHead>
            <TableHead className="text-center">Precio</TableHead>
            <TableHead className="text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <ProductRow
              key={`product${product.id}`}
              product={JSON.parse(JSON.stringify(product))}
            />
          ))}
        </TableBody>
      </Table>
    </main>
  );
};

export default productPage;

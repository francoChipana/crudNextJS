import { Header } from "@/components/page/home/Header";
import ProductRow from "@/components/page/home/ProductRow";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { listProducts } from "@/service/ProductService";

export default async function Home() {
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
}
import { Header } from "@/components/products/Header";
import Pagination from "@/components/products/Pagination";
import ProductCard from "@/components/products/ProductCard";
import { listProducts } from "@/service/ProductService";

const productPage = async ({ searchParams }: { searchParams: any }) => {
  const { totalPages, ...products } = await listProducts(
    searchParams.page ? Number(searchParams.page) : 1
  );

  return (
    <main className="container mt-10 max-w-6xl">
      <Header />
      <section className="grid grid-cols-4 gap-4">
        {products.items.map((product) => (
          <ProductCard
            key={`product${product.id}`}
            product={JSON.parse(JSON.stringify(product))}
          />
        ))}
      </section>
      <Pagination totalPages={totalPages} />
    </main>
  );
};

export default productPage;

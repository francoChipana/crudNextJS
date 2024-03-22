import { FormEdit } from "@/components/products/[id]/FormEdit";
import { listCategories } from "@/service/CategoryService";
import { viewProduct } from "@/service/ProductService";

const page = async ({ params }: any) => {
  const product = await viewProduct(params.id);
  const categories = await listCategories();

  return (
    <FormEdit
      product={JSON.parse(JSON.stringify(product))}
      categories={JSON.parse(JSON.stringify(categories))}
    />
  );
};

export default page;

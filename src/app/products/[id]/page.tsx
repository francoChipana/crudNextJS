import { FormEdit } from "@/components/products/[id]/FormEdit";
import { viewProduct } from "@/service/ProductService";

const page = async ({ params }: any) => {
  const product = await viewProduct(params.id);

  return <FormEdit product={JSON.parse(JSON.stringify(product))} />;
};

export default page;
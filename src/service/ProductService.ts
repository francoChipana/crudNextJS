import { ProductDataSource } from "@/datasouce/ProductDataSource";

export const listProducts = async (page?: number) => {
  const datasource = new ProductDataSource();
  const products = await datasource.list(page);
  return products;
};

export const createProduct = async (product: FormData) => {
  const datasource = new ProductDataSource();
  await datasource.create(product);
};

export const deleteProduct = async (id: string) => {
  const datasource = new ProductDataSource();
  await datasource.delete(id);
};

export const viewProduct = async (id: string) => {
  const datasource = new ProductDataSource();
  const product = await datasource.view(id);
  return product;
};

export const editProduct = async (id: string, data: FormData) => {
  const datasource = new ProductDataSource();
  await datasource.edit(id, data);
};

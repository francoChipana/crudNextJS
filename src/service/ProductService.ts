import { ProductDataSource } from "@/datasouce/ProductDataSource";
import { Product } from "@/entities/Product";

export const listProducts = async () => {
  const datasource = new ProductDataSource();
  const products = await datasource.list();
  return products;
};

export const createProduct = async (product: Product) => {
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

export const editProduct = async (id: string, data: Product) => {
  const datasource = new ProductDataSource();
  await datasource.edit(id, data);
};

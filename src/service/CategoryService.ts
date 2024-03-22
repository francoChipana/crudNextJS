import { CategoryDataSource } from "@/datasouce/CategoryDataSource";

export const listCategories = async () => {
  const categoryDataSource = new CategoryDataSource();
  return await categoryDataSource.list();
};

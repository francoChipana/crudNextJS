import { pb } from "@/config/pocketbase";
import { Category } from "@/entities/Category";
import { Product } from "@/entities/Product";

export class ProductDataSource {
  public async list(page?: number) {
    const records = await pb.collection("products").getList(page || 1, 10, {
      expand: "category",
      cache: "no-cache",
    });

    return {
      ...records,
      items: records.items.map((item) => {
        const categories = item.expand?.category.map((category: any) => {
          console.log(category);
          return new Category(category.id, category.name, category.description);
        });
        return new Product(
          item.id,
          item.name,
          item.price,
          item.image,
          categories
        );
      }),
    };
  }

  public async create(data: FormData) {
    await pb.collection("products").create(data);
  }

  public async delete(id: string) {
    await pb.collection("products").delete(id);
  }

  public async view(id: string) {
    const record = await pb.collection("products").getOne(id, {
      cache: "no-cache",
    });
    return new Product(id, record.name, record.price, record.image, []);
  }

  public async edit(id: string, data: FormData) {
    await pb.collection("products").update(id, data);
  }
}

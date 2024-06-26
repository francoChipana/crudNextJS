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
          return new Category(category.id, category.name, category.description);
        });
        return new Product(
          item.id,
          item.name,
          item.price,
          item.image,
          item.category,
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
    return new Product(
      id,
      record.name,
      record.price,
      record.image,
      record.category,
      []
    );
  }

  public async edit(id: string, data: FormData) {
    await pb.collection("products").update(id, data);
  }

  public async deleteCategories(id: string, categoriesId: string[]) {
    await pb.collection("products").update(id, {
      "category-": categoriesId,
    });
  }

  public async realtime(fn: any) {
    pb.collection("products").subscribe("*", function (e) {
      fn();
    });
  }
}

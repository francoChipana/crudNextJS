import { pb } from "@/config/pocketbase";
import { Product } from "@/entities/Product";

export class ProductDataSource {
  public async list(page?: number) {
    const records = await pb.collection("products").getList(page || 1, 10, {
      cache: "no-cache",
    });

    return {
      ...records,
      items: records.items.map(
        (item) => new Product(item.id, item.name, item.price, item.image)
      ),
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
    return new Product(id, record.name, record.price, record.image);
  }

  public async edit(id: string, data: FormData) {
    await pb.collection("products").update(id, data);
  }
}

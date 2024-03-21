import { pb } from "@/config/pocketbase";
import { Product } from "@/entities/Product";

export class ProductDataSource {
  public async list() {
    const records = await pb
      .collection("products")
      .getFullList({ cache: "no-cache" });

    return records.map(
      (record) =>
        new Product(record.id, record.name, record.price, record.image)
    );
  }

  public async create(data: Product) {
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

  public async edit(id: string, data: Product) {
    await pb.collection("products").update(id, data);
  }
}

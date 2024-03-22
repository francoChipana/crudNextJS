import { pb } from "@/config/pocketbase";
import { Category } from "@/entities/Category";

export class CategoryDataSource {
  public async list() {
    const records = await pb.collection("category").getFullList();

    return records.map(
      (record) => new Category(record.id, record.name, record.description)
    );
  }
}

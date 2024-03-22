import { Category } from "./Category";

export class Product {
  public id: string;
  public name: string;
  public price: number;
  public image: string;
  public categories: Category[];

  constructor(
    id: string,
    name: string,
    price: number,
    image: string,
    categories: Category[]
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.categories = categories;
  }

  public getJSON() {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      image: this.image,
    };
  }
}

export class Product {
  public id: string;
  public name: string;
  public price: number;
  public image: string;

  constructor(id: string, name: string, price: number, image: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
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

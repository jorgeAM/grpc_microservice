export class Product {
  constructor(readonly id: string, readonly name: string, readonly sku: string, private _stock: number, readonly price: number) {}

  get stock(): number {
    return this._stock
  }

  set stock(value: number) {
    this._stock = value
  }

  decreaseStock() {
    this.stock = this.stock - 1
  }
}

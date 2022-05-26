export class ProductOutOfStockException extends Error {
  constructor(message: string) {
    super(message)
  }
}

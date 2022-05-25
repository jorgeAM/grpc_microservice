export class StockDecreaseLog {
  constructor(
    private id: string,
    private orderId: string,
    private productId: string,
  ) {}
}

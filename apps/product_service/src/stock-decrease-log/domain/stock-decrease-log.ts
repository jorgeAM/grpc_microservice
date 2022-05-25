export class StockDecreaseLog {
  constructor(
    private id: number,
    private orderId: number,
    private productId: number,
  ) {}
}

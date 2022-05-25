export interface StockDecreaseLogRepository {
  decreaseStock(productId: number, orderId: number): Promise<void>;
}

export interface StockDecreaseLogRepository {
  decreaseStock(productId: string, orderId: string): Promise<void>;
}

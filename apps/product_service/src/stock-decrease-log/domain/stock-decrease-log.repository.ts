import { StockDecreaseLog } from './stock-decrease-log'

export interface StockDecreaseLogRepository {
  create(log: StockDecreaseLog): Promise<void>
}

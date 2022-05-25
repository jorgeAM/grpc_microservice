import { Product } from './product';

export interface ProductRepository {
  findById(id: string): Promise<Product>;
  create(product: Product): Promise<void>;
}

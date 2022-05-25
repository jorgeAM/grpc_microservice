import { Product } from './product';

export interface ProductRepository {
  findById(id: number): Promise<Product>;
  create(product: Product): Promise<void>;
}

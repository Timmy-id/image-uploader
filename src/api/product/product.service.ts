import IProduct from './product.interface';
import Product from './product.model';

export async function createProduct(input: IProduct) {
    return Product.create(input);
}

import IProduct from './product.interface';
import Product from './product.model';

export async function createProduct(input: IProduct) {
    return Product.create(input);
}

export async function getAllProducts() {
    return Product.find();
}

export async function getSingleProduct(id: string) {
    return await Product.findOne({ _id: id });
}

export async function searchProducts(name: string) {
    const products = await Product.find({
        name: { $regex: name, $options: 'i' }
    });
    return products;
}

import { productApi } from "@/app/auth/api/productsApi";
import { Product } from "../interfaces/product.interface";


export const updateCreateProductAction = async (product: Partial<Product>) => {
    product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock)
    product.price = isNaN(Number(product.price)) ? 0 : Number(product.price)


    if (product.id && product.id !== 'new') {
        return updateProduct(product)
    } else {
        return await createProduct(product)
    }
}
const updateProduct = async (product: Partial<Product>) => {
    const { id, images = [], user, ...rest } = product
    try {
        const data = await productApi.patch<Product>(`/products/${id}`, {
            ...rest,
        })
        return data
    } catch (error) {
        throw new Error('Error al actualizar el producto')
    }
}

const createProduct = async (product: Partial<Product>) => {
    const { id, images = [], user, ...rest } = product
    try {
        const data = await productApi.post<Product>(`/products`, {
            ...rest,
        })
        return data
    } catch (error) {
        throw new Error('Error al crear el producto')
    }
}


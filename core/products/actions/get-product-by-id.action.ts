import { productApi } from "@/app/auth/api/productsApi"
import { type Product } from "../interfaces/product.interface"


export const getProductById = async (id: string):Promise<Product> => {
    try {
        const {data} = await productApi.get('/products/' + id)
        return data
    } catch (error) {
        throw new Error('Error al obtener producto')
    }
}
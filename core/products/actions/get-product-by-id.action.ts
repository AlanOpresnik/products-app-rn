import { api_url, productApi } from "@/app/auth/api/productsApi"
import { Gender, type Product } from "../interfaces/product.interface"


const emptyProduct: Product = {
    id: 'new',
    title: 'Nuevo producto',
    price: 0,
    description: '',
    slug: '',
    images: [],
    sizes: [],
    gender: Gender.Men,
    stock: 0,
    tags: [],
}

export const getProductById = async (id: string): Promise<Product> => {
    
    if(id === 'new') return Promise.resolve(emptyProduct)

    try {
        const { data } = await productApi.get(`/products/${id}`)
        return {
            ...data,
            images: data.images.map(
                (image: string) => `${api_url}/files/product/${image}`)
        };
    } catch (error) {
        throw new Error('Error al obtener producto')
    }
}
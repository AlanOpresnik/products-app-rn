import { api_url, productApi } from "@/app/auth/api/productsApi";
import { type Product } from "../interfaces/product.interface";

export const getProducts = async (limit = 20, offset = 0) => {
  try {
    const { data } = await productApi.get<Product[]>("/products", {
      params: {
        limit: limit,
        offset: offset,
      },
    });
    return data.map((product) => ({
      ...product,
      images: product.images.map(
        (image) => `${api_url}/files/products/${image}`
      ),
    }));
  } catch (error) {
    throw new Error("Error al cargar los productos");
  }
};

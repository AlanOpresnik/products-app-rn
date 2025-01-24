import { updateCreateProductAction } from "@/core/products/actions/create-update-product-.action"
import { getProductById } from "@/core/products/actions/get-product-by-id.action"
import { Product } from "@/core/products/interfaces/product.interface"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRef } from "react"
import { Alert } from "react-native"


export const useProduct = (productId: string) => {
  const queryClient = useQueryClient()
  const productIdRef = useRef(productId)

  const productQuery = useQuery({
    queryKey: ['products', productId],
    queryFn: () => getProductById(productId),
    staleTime: 1000 * 60 * 60 ///1 hora
  })

  //mutations
  const productMutation = useMutation({
    mutationFn: async (data: Product) => (await updateCreateProductAction({
      ...data,
      id: productIdRef.current
    })).data,
    onSuccess: (data: Product) => {
      
      productIdRef.current = data.id

      queryClient.invalidateQueries({
        queryKey: ['products', data.id]
      })
      queryClient.invalidateQueries({
        queryKey: ['products', 'infinite'],
      })
      Alert.alert('Producto actualizado correctamente')
    },
    onError: (error: Error) => {
      Alert.alert('Error al actualizar el producto')
    }
  })
  return {
    productQuery,
    productMutation
  }
}

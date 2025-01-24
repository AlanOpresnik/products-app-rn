import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor'
import { useProducts } from '@/presentation/products/hooks/useProducts'
import ProductList from '@/presentation/products/components/ProductList'
import { FAB } from '@/presentation/theme/components/FAB'
import { router } from 'expo-router'

const HomeScreen = () => {
  const { productsQuery, LoadNextPage } = useProducts()
  const primaryColor = useThemeColor({}, 'primary')
  if (productsQuery.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={30} color={primaryColor} />
      </View>
    )
  }

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <ProductList products={productsQuery.data?.pages.flatMap(page => page) ?? []} loadNextPage={LoadNextPage} />
      <FAB iconName='add-outline' onPress={() => router.push('/(products-app)/product/new')} />
    </View>
  )
}

export default HomeScreen
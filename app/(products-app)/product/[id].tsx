import { View, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { Redirect, router, useLocalSearchParams, useNavigation } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { ThemedView } from '@/presentation/theme/components/ThemedView'
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput'
import { useProduct } from '@/presentation/products/hooks/useProduct'
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor'
import ProductImages from '@/presentation/products/components/ProductImages'
import ThemedButtonGroup from '@/presentation/theme/components/ThemedButtonGroup'
import ThemedButton from '@/presentation/theme/components/ThemedButton'
import { Formik } from 'formik'
import { Size } from '@/core/products/interfaces/product.interface'
import MenuIconButton from '@/presentation/theme/components/Menu-icon-button'

const ProductScreen = () => {
    const navigation = useNavigation()
    const { id } = useLocalSearchParams()
    const primaryColor = useThemeColor({}, 'primary')
    const { productQuery, productMutation } = useProduct(`${id}`)

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <MenuIconButton onPress={() => router.push('/camera')} icon='camera-outline' />,
        })
    }, [])

    useEffect(() => {
        if (productQuery.data) {
            navigation.setOptions({
                title: productQuery.data.title
            })
        }
    }, [productQuery.data])


    if (productQuery.isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={30} color={primaryColor} />
            </View>
        )
    }

    if (!productQuery.data) {
        return <Redirect href={'/(products-app)/(home)'} />
    }

    const product = productQuery.data!;

    return (
        <Formik
            initialValues={product}
            onSubmit={(productLike) => productMutation.mutate(productLike)}
        >
            {({ handleSubmit, handleChange, values, setFieldValue }) => (
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    <ScrollView>
                        <ProductImages images={values.images} />
                        <ThemedView style={{ marginHorizontal: 10, marginTop: 10 }}>
                            <ThemedTextInput
                                style={{ marginVertical: 5 }}
                                placeholder='titulo'
                                value={values.title}
                                onChangeText={handleChange('title')}
                            />
                            <ThemedTextInput
                                style={{ marginVertical: 5 }}
                                placeholder='Slug'
                                value={values.slug}
                                onChangeText={handleChange('slug')}
                            />
                            <ThemedTextInput
                                multiline
                                numberOfLines={5}
                                style={{ marginVertical: 5 }}
                                placeholder='Descripcion'
                                value={values.description}
                                onChangeText={handleChange('description')}
                            />
                        </ThemedView>
                        <ThemedView style={{ marginHorizontal: 10, marginVertical: 10, flexDirection: 'row', gap: 10 }}>
                            <ThemedTextInput
                                style={{ flex: 1 }}
                                placeholder='Precio'
                                value={values.price.toString()}
                                onChangeText={handleChange('price')}
                            />
                            <ThemedTextInput
                                style={{ flex: 1 }}
                                placeholder='Inventario'
                                value={values.stock.toString()}
                                onChangeText={handleChange('stock')}
                            />
                        </ThemedView>
                        <ThemedView style={{ marginHorizontal: 10, marginVertical: 10 }}>
                            <ThemedButtonGroup options={[
                                'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'
                            ]}
                                selectedOptions={values.sizes}
                                onSelect={(selectedSizes) => {
                                    if (values.sizes.includes(selectedSizes as Size)) {
                                        setFieldValue('sizes', values.sizes.filter(size => size !== selectedSizes))
                                    } else {
                                        setFieldValue('sizes', [...values.sizes, selectedSizes])
                                    }

                                }}
                            />
                            <ThemedButtonGroup options={[
                                'kid', 'men', 'women', 'unisex',
                            ]}
                                selectedOptions={[values.gender]}
                                onSelect={(option) => setFieldValue('gender', option)}
                            />
                        </ThemedView>
                        <View style={{ marginHorizontal: 10, marginBottom: 50, marginTop: 20 }}>
                            <ThemedButton
                                onPress={() => handleSubmit()}
                                icon='save-outline'
                            >
                                guardar
                            </ThemedButton>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            )}
        </Formik>
    )
}

export default ProductScreen
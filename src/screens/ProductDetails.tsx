import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

interface ProductDetailsProps {
  route: {
    params: {
      productId: number;
    };
  };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const navigation =useNavigation();

  useEffect(() => {
    if (product) {
      navigation.setOptions({
        title: product.title,
      });
    }
  }, [product, navigation]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!product) {
    return (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.title}</Text>
      <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default ProductDetails;

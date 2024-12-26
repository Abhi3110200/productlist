import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';


interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  viewType: 'list' | 'grid';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewType }) => {
    const navigation = useNavigation();
  return (

    <Pressable onPress={()=>navigation.navigate('ProductDetails', {productId: product.id})} style={viewType === 'grid' ? styles.gridCard : styles.productCard}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName} numberOfLines={1}>{product.title}</Text>
        <Text style={styles.productDescription} numberOfLines={2}>{product.description}</Text>
        <Pressable style={{}}>

        <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  gridCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    margin: 5,
    alignItems:'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
    resizeMode: 'contain',
  },
  productDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
});

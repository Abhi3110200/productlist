import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import ProductCard from '../components/ProductCard';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

const ProductScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState<'list' | 'grid'>('list');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleView = () => {
    setViewType(viewType === 'list' ? 'grid' : 'list');
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.filterText}>Filter</Text>
        <TouchableOpacity onPress={toggleView} style={styles.toggleButton}>
          <Icon
            name={viewType === 'grid' ? 'view-list' : 'grid-on'}
            size={20}
            color="white"
            style={styles.icon}
          />
          <Text style={styles.toggleText}>
            {viewType === 'grid' ? 'List View' : 'Grid View'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <ProductCard product={item} viewType={viewType} />
        )}
        contentContainerStyle={styles.listContainer}
        numColumns={viewType === 'grid' ? 2 : 1}
        key={viewType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems:'center',
    padding: 16,
    backgroundColor: '#2f2f2f',
    // elevation: 4,
  },
  filterText: {
    fontSize: 16,
    color: 'white',
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 6,
  },
  toggleText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ProductScreen;

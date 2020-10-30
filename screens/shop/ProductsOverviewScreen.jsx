import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Button,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";
import * as productsActions from "../../store/actions/products";

const ProductsOverviewScreen = (props) => {
  const { navigation, route } = props;
  const products = useSelector((store) => store.products.availableProducts);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const loadProducts = useCallback(async () => {
    console.log("loadproducts");
    try {
      setIsLoading(true);
      setError(null);
      await dispatch(productsActions.fetchProducts());
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [dispatch]);

  // useEffect(() => {
  //   console.log("useEffect  loadproducts");
  //   // This will execute only once at the first time when this screen loads. (loadProducts will never update, so this effect will not run after first time)
  //   loadProducts();
  // }, [loadProducts]);

  useEffect(() => {
    console.log("useEffect navigation Focus");
    const unsubscribe = navigation.addListener("focus", loadProducts); // Run every time when this screen gets focus from drawer

    return unsubscribe; //cleanup
  }, [navigation, loadProducts]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ marginBottom: 20 }}>{error}</Text>
        <Button
          title="Try again"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const selectHandler = (id, title) => {
    navigation.navigate("ProductDetail", {
      productId: id,
      title,
    });
  };
  return (
    <FlatList
      data={products}
      keyExtractor={(item, index) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price}
          image={itemData.item.imageUrl}
          onSelect={() => selectHandler(itemData.item.id, itemData.item.title)}
          // onAddToCart={() => {
          //   dispatch(cartActions.addToCart(itemData.item));
          // }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => selectHandler(itemData.item.id, itemData.item.title)}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductsOverviewScreen;

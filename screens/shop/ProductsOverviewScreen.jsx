import React from "react";
import { StyleSheet, FlatList, View, Text, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";

const ProductsOverviewScreen = (props) => {
  const products = useSelector((store) => store.products.availableProducts);
  const dispatch = useDispatch();
  const selectHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
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

const styles = StyleSheet.create({});

export default ProductsOverviewScreen;

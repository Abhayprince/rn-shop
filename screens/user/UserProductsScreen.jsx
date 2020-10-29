import React from "react";
import { StyleSheet, View, Text, FlatList, Button, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";
import * as productsActions from "../../store/actions/products";

const UserProductsScreen = (props) => {
  const products = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = (productId) => {
    props.navigation.navigate("AddEditProduct", { productId });
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
          onSelect={() => editProductHandler(itemData.item.id)}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => editProductHandler(itemData.item.id)}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              Alert.alert(
                "Delete Product",
                "Do you really want to delete this product?",
                [
                  {
                    text: "Yes",
                    onPress: () => {
                      dispatch(
                        productsActions.deleteUserProduct(itemData.item.id)
                      );
                    },
                  },
                  { text: "No", style: "destructive" },
                ]
              );
            }}
          />
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default UserProductsScreen;

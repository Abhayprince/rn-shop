import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";

const ProductDetailScreen = (props) => {
  console.log(props.navigation);
  const { route, navigation } = props;
  const { productId, title } = route.params;
  console.log(productId, title);

  //   useEffect(() => {
  //     navigation.setOptions({
  //       headerTitle: title,
  //     });
  //     return () => {};
  //   }, [navigation, title]);

  const products = useSelector((store) => store.products.availableProducts);
  console.log(products);
  const product = products.find((p) => p.id === productId);
  const dispatch = useDispatch();
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: product.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add to Cart"
          onPress={() => {
            dispatch(cartActions.addToCart(product));
          }}
        />
      </View>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300, //Use Dimensions Api
  },
  actions: {
    marginVertical: 20,
    alignItems: "center",
  },
  price: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "open-sans-bold",
  },
  description: {
    fontSize: 14,
    marginHorizontal: 20,
    fontFamily: "open-sans",
  },
});

export default ProductDetailScreen;

import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import OrderItem from "../../components/shop/OrderItem";
import Colors from "../../constants/Colors";
import * as ordersActions from "../../store/actions/orders";

const OrdersScreen = (props) => {
  const { navigation, route } = props;
  const orders = useSelector((state) => state.orders.orders);

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const loadOrders = useCallback(async () => {
    try {
      setIsRefreshing(true);
      setError(null);
      await dispatch(ordersActions.fetchOrders());
    } catch (error) {
      setError(error.message);
    }
    setIsRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsLoading(true);
      loadOrders().finally(() => setIsLoading(false));
    }); // Run every time when this screen gets focus from drawer

    return unsubscribe; //cleanup
  }, [navigation, loadOrders]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ marginBottom: 20 }}>{error}</Text>
        <Button title="Try again" onPress={loadOrders} color={Colors.primary} />
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

  return (
    <FlatList
      onRefresh={loadOrders}
      refreshing={isRefreshing}
      data={orders}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
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

export default OrdersScreen;

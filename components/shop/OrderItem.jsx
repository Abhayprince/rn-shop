import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Colors from "../../constants/Colors";

const OrderItem = ({ amount, date }) => {
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${amount.toFixed(2)}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Button color={Colors.primary} title="Show Details" />
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5, // Because Shadow only works on ios (Thats why wee need to add elevation. elevation works only on android)
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  date: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    color: "#888",
  },
});

export default OrderItem;

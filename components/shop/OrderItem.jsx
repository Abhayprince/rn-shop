import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Colors from "../../constants/Colors";
import Card from "../UI/Card";
import CartItem from "./CartItem";

const OrderItem = ({ amount, date, items }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${amount.toFixed(2)}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails ? "Hide Details" : "Show Details"}
        onPress={() => setShowDetails((prevState) => !prevState)}
      />
      {showDetails && (
        <View style={styles.items}>
          {items.map((item) => (
            <CartItem key={item.id} product={item} />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
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
  items: {
    width: "100%",
    marginVertical: 10,
  },
});

export default OrderItem;

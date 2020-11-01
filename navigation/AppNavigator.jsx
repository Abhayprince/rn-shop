import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View, Text } from "react-native";
import { useSelector } from "react-redux";
import StartupScreen from "../screens/StartupScreen";
import ShopNavigator, { AuthNavigator } from "./ShopNavigator";

const AppNavigator = (props) => {
  const isAuthenticated = useSelector((state) => !!state.auth.token);
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);

  return (
    <NavigationContainer>
      {isAuthenticated && <ShopNavigator />}
      {!isAuthenticated && didTryAutoLogin && <AuthNavigator />}
      {!isAuthenticated && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;

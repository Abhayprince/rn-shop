import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import { Platform, Button, Alert, SafeAreaView, View } from "react-native";
import Colors from "../constants/Colors";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import HeaderButton from "../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import { Ionicons } from "@expo/vector-icons";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import DrawerContent from "./DrawerContent";

const defautNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ProductsStackNavigator = createStackNavigator();
const ProductsNavigator = (props) => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defautNavigationOptions}>
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={({ navigation, route }) => {
          return {
            headerTitle: "All Products",
            headerLeft: () => {
              return (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                  <Item
                    title="Menu"
                    iconName={
                      Platform.OS === "android" ? "md-menu" : "ios-menu"
                    }
                    onPress={() => {
                      navigation.toggleDrawer();
                    }}
                  />
                </HeaderButtons>
              );
            },
            headerRight: () => {
              return (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                  <Item
                    title="Cart"
                    iconName={
                      Platform.OS === "android" ? "md-cart" : "ios-cart"
                    }
                    onPress={() => {
                      navigation.navigate("Cart");
                    }}
                  />
                </HeaderButtons>
              );
            },
          };
        }}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <ProductsStackNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={{ headerTitle: "My Cart" }}
      />
    </ProductsStackNavigator.Navigator>
  );
};

const OrdersStackNavigator = createStackNavigator();
const OrdersNavigator = (props) => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defautNavigationOptions}>
      <OrdersStackNavigator.Screen
        name="Orders"
        component={OrdersScreen}
        options={({ navigation, route }) => {
          // console.log("navigation", navigation);
          // console.log("route", route);
          return {
            headerTitle: "Your Orders",
            headerLeft: () => {
              return (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                  <Item
                    title="Menu"
                    iconName={
                      Platform.OS === "android" ? "md-menu" : "ios-menu"
                    }
                    onPress={() => {
                      navigation.toggleDrawer();
                    }}
                  />
                </HeaderButtons>
              );
            },
          };
        }}
      />
    </OrdersStackNavigator.Navigator>
  );
};

const AdminStackNavigator = createStackNavigator();
const AdminNavigator = (props) => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defautNavigationOptions}>
      <AdminStackNavigator.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={({ navigation, route }) => {
          return {
            headerTitle: "Your Products",
            headerLeft: () => {
              return (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                  <Item
                    title="Menu"
                    iconName={
                      Platform.OS === "android" ? "md-menu" : "ios-menu"
                    }
                    onPress={() => {
                      navigation.toggleDrawer();
                    }}
                  />
                </HeaderButtons>
              );
            },
            headerRight: () => {
              return (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                  <Item
                    title="Add Product"
                    iconName={
                      Platform.OS === "android" ? "md-create" : "ios-create"
                    }
                    onPress={() => {
                      navigation.navigate("AddEditProduct");
                    }}
                  />
                </HeaderButtons>
              );
            },
          };
        }}
      />
      <AdminStackNavigator.Screen
        name="AddEditProduct"
        component={EditProductScreen}
        options={({ navigation, route }) => {
          const productId = route.params?.productId;
          return {
            headerTitle: productId ? "Edit Product" : "Add Product",
            // headerRight: () => {
            //   return (
            //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
            //       <Item
            //         title="Save"
            //         iconName={
            //           Platform.OS === "android"
            //             ? "md-checkmark"
            //             : "ios-checkmark"
            //         }
            //         onPress={() => {}}
            //       />
            //     </HeaderButtons>
            //   );
            // },
          };
        }}
      />
    </AdminStackNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();
export const AuthNavigator = (props) => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defautNavigationOptions}>
      <AuthStackNavigator.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{ headerTitle: "Authenticate" }}
      />
    </AuthStackNavigator.Navigator>
  );
};

const ShopDrawerNavigator = createDrawerNavigator();
const ShopNavigator = (props) => {
  return (
    //<NavigationContainer>
    <ShopDrawerNavigator.Navigator
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}
      initialRouteName="Products"
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      {/* <ShopDrawerNavigator.Screen name="Auth" component={AuthNavigator} /> */}
      <ShopDrawerNavigator.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          drawerIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                size={23}
                color={color}
              />
            );
          },
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={Platform.OS === "android" ? "md-list" : "ios-list"}
                size={23}
                color={color}
              />
            );
          },
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={Platform.OS === "android" ? "md-create" : "ios-create"}
                size={23}
                color={color}
              />
            );
          },
        }}
      />
    </ShopDrawerNavigator.Navigator>
    //</NavigationContainer>
  );
};

export default ShopNavigator;

// const ProductsNavigator = createStackNavigator(
//   {
//     ProductsOverview: ProductsOverviewScreen,
//   },
//   {
//     defautNavigationOptions: {
//       headerStyle: {
//         backgroundColor: Platform.OS === "android" ? Colors.primary : "",
//       },
//       headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
//     },
//   }
// );

//export default createAppContainer(ProductsNavigator);

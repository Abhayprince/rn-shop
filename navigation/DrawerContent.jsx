import React from "react";
import { StyleSheet, View, SafeAreaView, Button } from "react-native";
import { DrawerItemList } from "@react-navigation/drawer";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";
import Colors from "../constants/Colors";

const DrawerContent = (props) => {
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
        <DrawerItemList {...props} />
        <View>
          <Button
            title="Logout"
            color={Colors.primary}
            onPress={() => {
              dispatch(authActions.logout());
              props.navigation.navigate({ name: "Auth" });
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default DrawerContent;

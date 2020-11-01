import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { readFromStorage } from "../services/storage-service";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";
import Colors from "../constants/Colors";

const StartupScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryAutoLogin = async () => {
      const authData = await readFromStorage();
      if (authData) {
        const { token, userId, expiryDate } = authData;
        if (token && userId && expiryDate) {
          const expirationDate = new Date(expiryDate);
          if (expirationDate > new Date()) {
            const expiryTime = expirationDate.getTime();
            dispatch(authActions.authenticate(token, userId, expiryTime));
            return;
          }
        }
      }
      dispatch(authActions.tryAutoLogin());
    };
    tryAutoLogin();
  }, [dispatch]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default StartupScreen;

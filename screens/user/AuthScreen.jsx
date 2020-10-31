import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import * as authActions from "../../store/actions/auth";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = ({ navigation }) => {
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const authHandler = async () => {
    // if (!formState.isValid) {
    //   Alert.alert("Wrong Input", "Please correct the inputs");
    //   return false;
    // }
    let action;
    if (isSignupMode) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      setIsLoading(false);
      navigation.navigate("Products");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
    }
  }, [error]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={1}
      style={styles.container}
    >
      <LinearGradient
        colors={[Colors.primary, Colors.accent]}
        style={styles.centered}
      >
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              initialValue=""
              errorText="Please enter valid email"
              onInputChange={inputChangeHandler}
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={3}
              autoCapitalize="none"
              initialValue=""
              errorText="Please enter valid password"
              onInputChange={inputChangeHandler}
            />
            <View style={styles.btn}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button
                  title={isSignupMode ? "Sign Up" : "Login"}
                  color={Colors.primary}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.btn}>
              <Button
                title={`Switch to ${isSignupMode ? "Login" : "Sign Up"}`}
                color={Colors.accent}
                onPress={() => {
                  setIsSignupMode((prevState) => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  authContainer: {
    padding: 20,
    width: "80%",
    maxWidth: 400,
  },
  btn: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 10,
  },
});

export default AuthScreen;

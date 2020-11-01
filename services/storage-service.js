import AsyncStorage from "@react-native-async-storage/async-storage";

const storageKeyName = "userData";

export const saveToStorage = async (token, userId, expiryDate) => {
  await AsyncStorage.setItem(
    storageKeyName,
    JSON.stringify({ token, userId, expiryDate: expiryDate.toISOString() })
  );
};

export const readFromStorage = async () => {
  const data = await AsyncStorage.getItem(storageKeyName);
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

export const removeFromStorage = async () => {
  await AsyncStorage.removeItem(storageKeyName);
};

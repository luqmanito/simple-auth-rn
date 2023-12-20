import AsyncStorage from "@react-native-async-storage/async-storage";

const prefix = "cache";

const store = async (key: string, value: any) => {
  const item = {
    value,
  };

  try {
    await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (err) {
    console.log(err);
  }
};

const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(prefix + key);
  } catch (err) {
    console.log(err);
  }
};

const get = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    if (value) {
      const item = JSON.parse(value);
      if (item && item.value !== null) {
        return item.value;
      }
    }
    return null;
  } catch (err) {
    console.log(err);
  }
};

export default { store, get, removeItem };

const { default: AsyncStorage } = require('@react-native-async-storage/async-storage');

export const setItem = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log(`Cannot save item to storage: ${error}`);
    }
};

export const getItem = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value) {
            return value;
        }
    } catch (error) {
        console.log(`Cannot get item from storage: ${error}`);
    }
};

export const importData = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);

        return result.map((req) => console.log(req));
    } catch (error) {
        console.error(error);
    }
};
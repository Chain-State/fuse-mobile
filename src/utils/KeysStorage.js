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

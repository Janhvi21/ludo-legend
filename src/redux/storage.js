import AsyncStorage from '@react-native-async-storage/async-storage';


const asyncStorage = {
        getItem: async (key) => {
                try {
                        const value = await AsyncStorage.getItem(key);
                        if (value !== null) {
                                return value;
                        }
                } catch (error) {
                }
        },
        setItem: async (key, value) => {
                try {
                        await AsyncStorage.setItem(key, value);
                } catch (error) {
                        console.error("Error saving data:", error);
                }
        },
        removeItem: (key) => {
                storage.delete(key);
                return Promise.resolve();
        }
}
export default asyncStorage;
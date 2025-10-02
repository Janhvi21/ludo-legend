import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

const reduxStorage = {
        getItem: (key) => {
                const value = storage.getString(key);
                return Promise.resolve(value);
        },
        setItem: (key, value) => {
                storage.set(key, value);
                return Promise.resolve(true);
        },
        removeItem: (key) => {
                storage.delete(key);
                return Promise.resolve();
        }
}
export default reduxStorage;
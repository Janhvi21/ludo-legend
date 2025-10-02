import reduxStorage from './storage'
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist'
import rootReducer from './root.reducer'
import { configureStore } from '@reduxjs/toolkit';

const persistConfig = {
        key: 'root',
        storage: reduxStorage,
        whitelist: ['game'], // only game will be persisted
        blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
        reducer: persistedReducer,
        middleware: getDefaultMiddleware =>
                getDefaultMiddleware({
                        serializableCheck: {
                                ignoreActions: [FLUSH, REHYDRATE, REGISTER, PAUSE, PURGE, PERSIST],
                        },
                }),
});
export const persistor = persistStore(store);
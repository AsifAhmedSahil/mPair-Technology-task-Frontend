import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import userReducer from "./features/userSlice"
import { persistReducer, persistStore } from 'redux-persist'

import storage from 'redux-persist/lib/storage'


const persistUserConfig = {
  key:'user',
  storage
}

const persistedUserReducer = persistReducer(persistUserConfig,userReducer)

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    user:persistedUserReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck:false}).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;


export const persistor = persistStore(store)
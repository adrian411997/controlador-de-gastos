import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import gastosSlice from "../Reducers/Todolist";
import storage from "redux-persist/lib/storage";

const persistConfig = { key: "root", version: 1, storage };
const persistedReducer = persistReducer(persistConfig, gastosSlice);

export const store = configureStore({
  reducer: { gastos: persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

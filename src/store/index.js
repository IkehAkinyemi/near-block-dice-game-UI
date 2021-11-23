import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";
import autoMergeLevel1  from "reduxjs-toolkit-persist/es/stateReconciler/autoMergeLevel1";
import gameListSlice from "./slices/gameList.slice";

const persistConfig = {
  key: "block-dice",
  storage,
  stateReconciler: autoMergeLevel1,
};

const reducers = combineReducers({
  gameList: gameListSlice
});

const _persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: _persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }
  }),
})

export const persistor = persistStore(store);
export default store;

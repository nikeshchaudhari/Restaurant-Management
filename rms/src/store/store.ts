import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { menuSlice } from "../features/menuSlice";
import { authSlice } from "../features/Auth";
import { cartSlice } from "../features/CartSlice";
import { cartUi } from "../features/CartOpen";
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import persistReducer from 'redux-persist/es/persistReducer';


const rootReducer = combineReducers({
   menu: menuSlice.reducer,
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    cartUi:cartUi.reducer,

});

const persistConfig = {
  key:'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer:persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

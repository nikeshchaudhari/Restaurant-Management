import { configureStore } from "@reduxjs/toolkit";
import { menuSlice } from "../features/menuSlice";
import { authSlice } from "../features/Auth";
import { cartSlice } from "../features/CartSlice";
import { cartUi } from "../features/CartOpen";
export const store = configureStore({
  reducer: {
    menu: menuSlice.reducer,
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    cartUi:cartUi.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

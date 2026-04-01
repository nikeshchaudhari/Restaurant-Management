import { configureStore } from "@reduxjs/toolkit";
import { menuSlice } from "../features/menuSlice";
import { authSlice } from "../features/Auth";
export const store = configureStore({

    reducer:{
        menu:menuSlice.reducer,
        auth:authSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
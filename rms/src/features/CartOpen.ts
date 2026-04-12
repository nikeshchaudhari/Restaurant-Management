import { createSlice } from "@reduxjs/toolkit";


export const cartUi = createSlice({
    name:"cartui",
    initialState:{
        isCartOpen:false,
    },
    reducers:{
        openCart:(state)=>{
            state.isCartOpen = true;

        },
        closeCart:(state)=>{
            state.isCartOpen = false;
        }
    }

})

export const{openCart,closeCart }= cartUi.actions;
export default cartUi.reducer;
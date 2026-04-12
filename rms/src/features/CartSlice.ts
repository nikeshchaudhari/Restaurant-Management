import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartItems {
  total: number
  menuId: string;
  name: string;
  price: string;
  image: string;
  tableId: string;
  tableNumber: number;
  quantity: number;
}

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [] as CartItems[],
  },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(
        (items) => items.menuId === action.payload.menuId,
      );
      if (existing) {
        existing.quantity = existing.quantity + 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },
    removeCart: (state, action) => {
      state.items = state.items.filter(
        (item: any) => item.menuId != action.payload,
      );
    },
    clearCart: (state) => {
      state.items = [];
    },

    increaseQty: (state, action: PayloadAction<string>) => {
      const items = state.items.find((i) => i.menuId === action.payload);
      if (items && items.quantity < 10) {
        items.quantity += 1;
      }
    },

    decreaseQty: (state, action: PayloadAction<string>) => {
      const items = state.items.find((i)=>i.menuId === action.payload);
      if(items && items.quantity >1){
        items.quantity -= 1;
      }
    },
  },
});

export const { addToCart, clearCart, removeCart,increaseQty,decreaseQty} = cartSlice.actions;
export default cartSlice.reducer;

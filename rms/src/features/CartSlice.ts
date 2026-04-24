import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartItems {
  _id: string;
  menuName: string;
  total: number;
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
    addToCart: (state, actions) => {
      const item = actions.payload;

      const exist = state.items.find((i: any) => i._id === item._id);

      if (exist) {
        exist.quantity = exist.quantity + 1;
      } else {
        state.items.push({
          ...item,
          quantity: 1,
        });
      }
    },
    removeCart: (state, action) => {
      state.items = state.items.filter(
        (item: any) => item._id != action.payload,
      );
    },
    clearCart: (state) => {
      state.items = [];
    },

  

    increaseQty: (state, action: PayloadAction<string>) => {
      const items = state.items.find((i:any) => i._id === action.payload);
      if (items && items.quantity < 20) {
        items.quantity += 1;
        // console.log("updated qty:", items.quantity);
        
      }else {
    console.log("not found");
  }
    },

    decreaseQty: (state, action: PayloadAction<string>) => {
      const items = state.items.find((i) => i._id === action.payload);
      if (items && items.quantity > 1) {
        items.quantity -= 1;
      }
    },
  },
});

export const { addToCart, clearCart, removeCart, increaseQty, decreaseQty } =
  cartSlice.actions;
export default cartSlice.reducer;

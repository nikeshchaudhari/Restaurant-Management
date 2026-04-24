import { createSlice } from "@reduxjs/toolkit";


interface Table{
  _id:string,
  tableNumber:number
}

interface TableState {
  selectedTable:Table | null
}

const initialState:TableState = {
    selectedTable: null,
  }
export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setSelectedTable :(state,action)=>{
      state.selectedTable = action.payload
    }
  },
});

export const{setSelectedTable} = tableSlice.actions;
export default tableSlice.reducer


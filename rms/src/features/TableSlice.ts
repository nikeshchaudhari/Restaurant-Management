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
    },
    clearSelectedTable:(state)=>{
      state.selectedTable = null;

    }
  },
  
});

export const{setSelectedTable,clearSelectedTable} = tableSlice.actions;
export default tableSlice.reducer


import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Table {
  _id: string;
  tableNumber: string;
  status: "available" | "unavailable";
}

interface TableState {
  tables: Table[];
}
const initialState: TableState = {
  tables: [],
};
export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTable: (state, action: PayloadAction<Table[]>) => {
      state.tables = action.payload;
    },

    updateTable: (state, action:PayloadAction<{tableId:string,status:"available"|"unavailable"}>) => {
      const table = state.tables.find((t) => t._id === action.payload.tableId);

      if (!table) return;
    },
  },
});


export const{setTable,updateTable}=tableSlice.actions
export default tableSlice.reducer
import { createSlice } from "@reduxjs/toolkit";


interface menuState {
    isOpen:boolean,
    
}
export const menuSlice = createSlice({

    name:"menu",
    initialState:{
        isOpen:false

    },
    reducers:{
        toggleMenu:(state: menuState)=>{
            state.isOpen = !state.isOpen

        },
        menuClose :(state:menuState)=>{
            state.isOpen = false
        },
        menuOpen :(state: menuState)=>{
            state.isOpen = true
        },

    },
})

export const{toggleMenu,menuOpen,menuClose}= menuSlice.actions;
export default menuSlice.reducer
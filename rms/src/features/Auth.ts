import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState{
  isLoggedIn:boolean,
  user:{
    name:string,
    profileImage:string

  }| null
}


export const authSlice = createSlice({
  name:"auth",
  initialState:{
    isLoggedIn:false,
    user:null

  },
  reducers:{
    login:(state:AuthState,action:PayloadAction<{name:string;profileImage:string}>)=>{
      state.isLoggedIn=true,
      state.user={...state.user,...action.payload}

    },

    logout:(state:AuthState)=>{
      state.isLoggedIn=false,
      state.user=null
    },
    
    updateProfile:(state,action:PayloadAction<{profileImage?:string; name:string;}>)=>{
      if(state.user){
        state.user={...state.user,...action.payload};
      }

    }
  }
})

export const{login,logout}=authSlice.actions
export default authSlice.reducer
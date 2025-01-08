import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
  _id: string,
  email: string,
  name: string,
  employeeId:string,
  position:string,
  image:string
  iat:number,
  exp: number
}

type TAuthState = {
  user: null | TUser,
  token: null | string,
  
}

const initialState : TAuthState = {
  user:null,
  token: null,
 
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
   
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout:(state) =>{
      state.user = null;
      state.token = null;
    }
  },
});

export const { setToken, setUser,logout } = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState={
  _id:"",
  username:"",
  email:"",
  auth:false,
  profilePhoto:"",
  name:""
}

export const userSlice = createSlice({
name:"user",
initialState:initialState,
reducers:{
    setUser:(state,action)=>{
        const {_id,username,name,profilePhoto,email,auth}=action.payload;

        state._id=_id;
        state.username=username;
        state.email=email;
        state.auth=auth;
        state.profilePhoto=profilePhoto;
        state.name  = name;

    },
    resetUser:(state,action)=>{
        state._id="";
        state.username="";
        state.email="";
        state.auth=false;
        state.profilePhoto="";
        state.name= "";
    }
}
})


export const {setUser,resetUser}= userSlice.actions;
export default userSlice.reducer;
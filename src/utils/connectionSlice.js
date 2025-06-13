import { createSlice } from "@reduxjs/toolkit";

const connectionSLice = createSlice({
  name: "connection",
  initialState: [],
  reducers: {
    addConnection: (state,action) => {
     return action.payload;
    },
    removeConnection:()=>{
        return null
    }
   
  },
});


export const {addConnection,removeConnection } = connectionSLice.actions ;
export default connectionSLice.reducer ;

import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name:"request",
    initialState:[],
    reducers:{
        addRequests:(state,action)=>{
return action.payload;
        }, removeRequests: (state,action) => {

           
         return state.filter((st) => st._id !== action.payload);
    },
    }
})

export const {addRequests,removeRequests} = requestSlice.actions;
export default requestSlice.reducer ;
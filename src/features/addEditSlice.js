import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    description: "",
    amount: 0,
    category: "",
    date: ""
};

const addEditSlice = createSlice({
    name: 'AddEdit',
    initialState,
    reducers: {
        descriptionAction: (state, action) => {
            state.description = action.payload;
        },
        amountAction: (state, action) => {
            state.amount = action.payload;
        },
        categoryAction: (state, action) => {
            state.category = action.payload;
        },
        dateAction: (state, action) => {
            console.log(action)
            state.date = action.payload;
        },
        clearVals: (state, action) => {
            state.date = "";
            state.amount = 0;
            state.category = "";
            state.description = "";
        }
    }
});

export const {descriptionAction, categoryAction, amountAction, dateAction, clearVals} = addEditSlice.actions;

export default addEditSlice.reducer;
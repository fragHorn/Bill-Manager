import { configureStore } from "@reduxjs/toolkit";

import billReducer from './features/billSlice';
import addEditReducer from './features/addEditSlice';

export const store = configureStore({
    reducer: {
        bill: billReducer,
        addEdit: addEditReducer
    },
});

import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../reducerSlices/counterSlice";

const store = configureStore({
    reducer:{
        counter: counterSlice,
    }
})

export default store
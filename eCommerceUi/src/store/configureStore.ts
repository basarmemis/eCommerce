import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { catalogSlice } from "../components/catalog/catalogSlice";
import { basketSlice } from "../pages/basket/basketSlice";
import { counterSlice } from "../pages/contact/counterSlice";

//export function configureStore () {
//    return createStore(counterReducer);
//}

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        basket: basketSlice.reducer,
        catalog: catalogSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
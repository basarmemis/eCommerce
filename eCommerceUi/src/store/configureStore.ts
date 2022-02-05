import { createStore } from "redux";
import counterReducer from "../pages/contact/counterReducer";

export function configureStore () {
    return createStore(counterReducer);
}
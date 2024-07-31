import { configureStore } from "@reduxjs/toolkit";
import reducer from "./authSlice";

const store = configureStore({
    reducer: reducer,
    // devTools: true,

    
    
}
// ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store
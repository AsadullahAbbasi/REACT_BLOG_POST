import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
      status : false,
      userData : null
    },
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.user = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
    },
});

// authSlice.actions will retirns method define in reducers
export const { login, logout } = authSlice.actions;
console.log(authSlice.reducer,"asad");
export default authSlice.reducer;
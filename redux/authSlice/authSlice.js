import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  userData: {
    displayName: "",
    email: "",
    photoURL: "",
    uid: "",
  },
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState: authInitialState,
  reducers: {
    addCurrentUser(state, action) {
      state.userData.displayName = action.payload.displayName;
      state.userData.email = action.payload.email;
      state.userData.photoURL = action.payload.photoURL;
      state.userData.uid = action.payload.uid;
    },
  },
});

export const { addCurrentUser } = authSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
  name: "register",
  initialState: {
    registrationStatus: null,
  },
  reducers: {
    setRegistrationStatus: (state, action) => {
      state.registrationStatus = action.payload;
    },
  },
});

export const { setRegistrationStatus } = registerSlice.actions;
export default registerSlice.reducer;

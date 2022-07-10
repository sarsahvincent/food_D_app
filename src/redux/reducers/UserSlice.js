import { createSlice } from "@reduxjs/toolkit";
const UserSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    categories: [],
    location: {},
    loading: false,
    status: null,
    message: null,
    error: null,
  },
  reducers: {
    getLocationDetails(state, action) {
      state.location = action.payload;
    },
    fetchData(state, action) {
      state.data = action.payload;
    },
    getCategories(state, action) {
      state.categories = action.payload;
    },
  },

  extraReducers: {},
});

export const { getCategories, getLocationDetails, fetchData } =
  UserSlice.actions;
export default UserSlice.reducer;

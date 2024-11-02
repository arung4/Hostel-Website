import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    filterHostel:[],
    savedHostels: [], // to store saved hostels by the student 
  },
  reducers: {
    // actions
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // Role based hostel actions
    setSavedHostels: (state, action) => {
      state.savedHostels = action.payload;
    },
    addSavedHostel: (state, action) => {
        state.savedHostels = [...(state.savedHostels || []), action.payload];
      },
    deleteSavedHostel: (state, action) => {
      state.savedHostels = state.savedHostels.filter(
        (hostel) => hostel._id !== action.payload
      );
    },
      // Filter criteria actions
      setFilterHostel: (state, action) => {
        state.filterHostel = action.payload || []
      },
      updateFilterHostel: (state, action) => {
        state.filterHostel = { ...state.filterHostel, ...action.payload };
      },
      resetFilterHostel: (state) => {
        state.filterHostel = {};
      },
  },
});
export const {
  setLoading,
  setUser,
  setSavedHostels,
  setFilterHostel,
  updateFilterHostel,
  resetFilterHostel,
  addSavedHostel,
  deleteSavedHostel,
} = authSlice.actions;
export default authSlice.reducer;

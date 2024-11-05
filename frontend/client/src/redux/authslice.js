import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HOSTEL_API_END_POINT } from "../utils/constant.js";

// // Thunks for API calls
// export const fetchSavedHostels = createAsyncThunk(
//   'auth/fetchSavedHostels', 
//   async () => {
//     const response = await axios.get(`${HOSTEL_API_END_POINT}/getSavedHostel`, {
//       withCredentials: true,
//     });
//     return response.data.savedHostels;
//   }
// );

// export const addSavedHostel = createAsyncThunk(
//   'auth/addSavedHostel', 
//   async (hostelId) => {
//     const response = await axios.post(`${HOSTEL_API_END_POINT}/saveHostel`, {hostelId} , {
//       withCredentials: true,
//     });
//     return hostelId;
//   }
// );

// export const deleteSavedHostel = createAsyncThunk(
//   'auth/deleteSavedHostel', 
//   async (hostelId) => {
//     const response = await axios.post(`${HOSTEL_API_END_POINT}/removeHostel`,  {hostelId} , {
//       withCredentials: true,
//     });
//     return hostelId;
//   }
// );


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
    setSavedHostels: (state, action) => {
      state.savedHostels = action.payload;
    },
    addSavedHostel: (state, action) => {
      state.savedHostels.push(action.payload);
    },
    deleteSavedHostel: (state, action) => {
      state.savedHostels = state.savedHostels.filter(
        (hostel) => hostel._id !== action.payload
      );
    },
    clearAllSavedHostels: (state) => {
      state.savedHostels = []; // Clear all saved hostels
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
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchSavedHostels.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(fetchSavedHostels.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.savedHostels = action.payload;
  //     })
  //     .addCase(fetchSavedHostels.rejected, (state) => {
  //       state.loading = false;
  //     })
  //     .addCase(addSavedHostel.fulfilled, (state, action) => {
  //       state.savedHostels = action.payload;
  //     })
  //     .addCase(deleteSavedHostel.fulfilled, (state, action) => {
  //       state.savedHostels = action.payload;
  //     });
  // },
});
export const {
  setLoading,
  setUser,
  addSavedHostel,
  deleteSavedHostel,
  setFilterHostel,
  updateFilterHostel,
  resetFilterHostel,
  clearAllSavedHostels,
} = authSlice.actions;
export default authSlice.reducer;

import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"; 
import axios from "axios";
import { HOSTEL_API_END_POINT } from "../utils/constant";

// Async thunk to fetch hostels by owner ID
export const fetchHostelsByOwner = createAsyncThunk(
    'hostels/fetchByOwner',
    async (ownerId) => {
      const response = await axios.get(`${HOSTEL_API_END_POINT}/owner`, {ownerId}, {
        withCredentials: true,
      });
      return response.data; // Assuming the API returns an array of hostels
    }
  );

const hostelSlice= createSlice({
    name:"hostel",
    initialState:{
        loading: false,
        hostel : null,
        hostels:[] // for handling multiple hostels 
    },
    reducers:{
       // actions
       setLoading: (state, action) => {
        state.loading = action.payload;
    },
    setHostel: (state, action) => {
        state.hostel = action.payload;
    },
    setHostels: (state, action) => {
        state.hostels = action.payload;
    },
    addHostel: (state, action) => {
        state.hostels.push(action.payload);
    },
    updateHostel: (state, action) => {
        const index = state.hostels.findIndex(hostel => hostel._id === action.payload._id);
        if (index !== -1) {
            state.hostels[index] = action.payload;
        }
    },
    deleteHostel: (state, action) => {
        state.hostels = state.hostels.filter(hostel => hostel._id !== action.payload);
    }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchHostelsByOwner.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchHostelsByOwner.fulfilled, (state, action) => {
            state.hostels = action.payload; // Set fetched hostels to the state
            state.loading = false;
          })
          .addCase(fetchHostelsByOwner.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message; // Handle error
          });
      },
 });

 export const {setLoading, setHostel, setHostels, addHostel, updateHostel, deleteHostel} = hostelSlice.actions;
 export default hostelSlice.reducer;

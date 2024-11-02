import {createSlice} from "@reduxjs/toolkit"; 



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
    }
 });

 export const {setLoading, setHostel, setHostels, addHostel, updateHostel, deleteHostel} = hostelSlice.actions;
 export default hostelSlice.reducer;

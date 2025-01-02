import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk to fetch methods
export const fetchMethods = createAsyncThunk(
  'methods/fetchMethods',
  async () => {
    const response = await axios.get('/api/methods');
    return response.data;
  }
);

const methodSlice = createSlice({
  name: 'methods',
  initialState: {
    methods: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    addMethod: (state, action) => {
      state.methods.push(action.payload);
    },
    deleteMethod: (state, action) => {
      state.methods = state.methods.filter(
        (method) => method._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMethods.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMethods.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.methods = action.payload;
      })
      .addCase(fetchMethods.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addMethod, deleteMethod } = methodSlice.actions;

export default methodSlice.reducer;

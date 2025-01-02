import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk to fetch communications
export const fetchCommunications = createAsyncThunk(
  'communications/fetchCommunications',
  async () => {
    const response = await axios.get('/api/communications');
    return response.data;
  }
);

const communicationSlice = createSlice({
  name: 'communications',
  initialState: {
    communications: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    addCommunication: (state, action) => {
      state.communications.push(action.payload);
    },
    deleteCommunication: (state, action) => {
      state.communications = state.communications.filter(
        (comm) => comm._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunications.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCommunications.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.communications = action.payload;
      })
      .addCase(fetchCommunications.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addCommunication, deleteCommunication } = communicationSlice.actions;

export default communicationSlice.reducer;

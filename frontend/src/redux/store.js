import { configureStore } from '@reduxjs/toolkit';
import communicationReducer from './slices/communicationSlice';
import companyReducer from './slices/companySlice';
import methodReducer from './slices/methodSlice';

const store = configureStore({
  reducer: {
    communications: communicationReducer,
    companies: companyReducer,
    methods: methodReducer,
  },
});

export default store;

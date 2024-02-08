// redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './features/index';

const store = configureStore({
  reducer: rootReducer,
});

export default store;

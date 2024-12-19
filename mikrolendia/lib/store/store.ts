import { configureStore } from '@reduxjs/toolkit';
import walletReducer from './wallet/walletSlice';  

const store = configureStore({
  reducer: {
    wallet: walletReducer,  
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import inputReducer from 'features/inputSlice';
import pickerReducer from 'features/pickerSlice';

export const store = configureStore({
  reducer: {
    input: inputReducer,
      picker: pickerReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

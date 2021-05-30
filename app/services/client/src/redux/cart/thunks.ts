import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import request from '../../utils/axios';
import { ThunkAPI } from '../store';

export const fetchCart = createAsyncThunk<
  ICart,
  undefined,
  ThunkAPI<IValidationError>
>('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const { data } = await request.get(`/cart/`);
    return data;
  } catch (error) {
    let err: AxiosError<IValidationError> = error;
    if (!err.response) {
      throw error;
    }
    return rejectWithValue(err.response.data);
  }
});

export const refreshCart = createAsyncThunk<
  ICart,
  IProduct[],
  ThunkAPI<IValidationError>
>('cart/refresh', async (cartItems: IProduct[]) => {
  const { data } = await request.put(`/cart/refresh`, {
    items: JSON.stringify(cartItems)
  });
  return data;
});

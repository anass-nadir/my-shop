import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import request from '../../utils/axios';
import { ThunkAPI } from '../store';

export const getInventory = createAsyncThunk<
  IProduct[],
  undefined,
  ThunkAPI<IValidationError>
>('product/getInventory', async (_, { rejectWithValue }) => {
  try {
    const { data } = await request.get(`/products/`);
    return data;
  } catch (error) {
    let err: AxiosError<IValidationError> = error;
    if (!err.response) {
      throw error;
    }
    return rejectWithValue(err.response.data);
  }
});
export const getCategories = createAsyncThunk<
  ICategory[],
  undefined,
  ThunkAPI<IValidationError>
>('product/getCategories', async (_, { rejectWithValue }) => {
  try {
    const { data } = await request.get(`/products/categories`);
    return data;
  } catch (error) {
    let err: AxiosError<IValidationError> = error;
    if (!err.response) {
      throw error;
    }
    return rejectWithValue(err.response.data);
  }
});

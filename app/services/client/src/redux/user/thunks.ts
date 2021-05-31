import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import request from '../../utils/axios';
import { ThunkAPI } from '../store';

export const registerUser = createAsyncThunk<
  IUser,
  IUser,
  ThunkAPI<IValidationError>
>('user/register', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await request.post(`/auth/register`, payload);
    return data;
  } catch (error) {
    const err: AxiosError<IValidationError> = error;
    if (!err.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});
export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await request.post('/auth/logout');
      return data;
    } catch (error) {
      let err: AxiosError<IValidationError> = error;
      if (!err.response) {
        throw error;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginUser = createAsyncThunk<
  IUser,
  IUser,
  ThunkAPI<IValidationError>
>('user/login', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await request.post(`/auth/login`, payload);
    return data;
  } catch (error) {
    const err: AxiosError<IValidationError> = error;
    if (!err.response) {
      throw error;
    }
    return rejectWithValue(err.response.data);
  }
});

export const getCurrentUser = createAsyncThunk<
  IUser,
  undefined,
  ThunkAPI<IValidationError>
>('user/currentUser', async (_, { rejectWithValue }) => {
  try {
    const { data } = await request.get('/auth/current-user');
    return data.user;
  } catch (error) {
    const err: AxiosError<IValidationError> = error;
    if (!err.response) {
      throw error;
    }
    return rejectWithValue(err.response.data);
  }
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://api.openweathermap.org/geo/1.0/';
const KEY = '49e7675ce522af79afa483dcb6943f32';

export const getCityData = createAsyncThunk(
  'cities/getAll',
  async (city, thunkAPI) => {
    try {
      const cityRes = await axios.get('direct', {
        params: {
          q: city,
          limit: 1,
          appid: KEY,
        },
      });

      if (cityRes.data.length === 0) {
        return thunkAPI.rejectWithValue('City not found');
      }

      const { lon, lat } = cityRes.data[0];

      const weatherRes = await axios.get(
        'http://api.openweathermap.org/data/2.5/weather',
        {
          params: {
            lon,
            lat,
            units: 'metric',
            appid: KEY,
          },
        }
      );
      console.log(weatherRes.data);
      return weatherRes.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

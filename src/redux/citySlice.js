import { createSlice } from '@reduxjs/toolkit';
import { getCityData } from './citiesOPS';

const citySlice = createSlice({
  name: 'city',
  initialState: {
    cities: [],
    loading: false,
    error: false,
  },
  reducers: {
    deleteCity: (state, action) => {
      state.cities = state.cities.filter(city => city.name !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCityData.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getCityData.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = [...state.cities, action.payload];
      })
      .addCase(getCityData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { deleteCity } = citySlice.actions;
export const selectCities = state => state.city.cities;
export const selectLoading = state => state.city.loading;
export const selectError = state => state.city.error;

export default citySlice.reducer;

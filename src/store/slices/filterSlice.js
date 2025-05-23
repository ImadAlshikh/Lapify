import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cpu: [],
  gpu: [],
  ram: [],
  hardDisk: [],
  screenRes: [],
  minPrice: null,
  maxPrice: null,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      const { filterType, value } = action.payload;

      // Toggle the value in the array
      if (state[filterType].includes(value)) {
        state[filterType] = state[filterType].filter((item) => item !== value);
      } else {
        state[filterType].push(value);
      }
    },
    resetFilters: () => {
      return initialState;
    },
    resetAllFilters: (state) => {
      return initialState;
    },
  },
});

export const { updateFilter, resetFilters, resetAllFilters } =
  filterSlice.actions;
export default filterSlice.reducer;

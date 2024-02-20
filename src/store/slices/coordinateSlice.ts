import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ICoordinate {
  regionCode: string;
  latitude: number;
  longitude: number;
}

const initialState: ICoordinate = {
  regionCode: '',
  latitude: 0,
  longitude: 0,
};

const coordinateSlice = createSlice({
  name: 'coordinate',
  initialState,
  reducers: {
    resetState: () => initialState,
    setRegionCode: (state, action: PayloadAction<string>) => {
      state.regionCode = action.payload;
    },
    setLatitude: (state, action: PayloadAction<number>) => {
      state.latitude = action.payload;
    },
    setLongitude: (state, action: PayloadAction<number>) => {
      state.longitude = action.payload;
    },
  },
});

export const { resetState, setRegionCode, setLatitude, setLongitude } =
  coordinateSlice.actions;

export default coordinateSlice.reducer;

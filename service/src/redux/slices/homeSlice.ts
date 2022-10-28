import {createSlice} from '@reduxjs/toolkit';

interface HomeState {
  no: number;
}

const initialState: HomeState = {
  no: 0
};

const HomeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setNo(state, action) {
      state.no = action.payload;
    },
  },
});

export const { setNo } = HomeSlice.actions;
export default HomeSlice.reducer;
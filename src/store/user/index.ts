import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'user',
  initialState: { name: null, points: 0 } as UserState,
  reducers: {
    updateUser: (state, { payload: { name, points } }: UserPayload) => {
      if (typeof name !== 'undefined') {
        state.name = name;
      }
      if (typeof points !== 'undefined') {
        state.points = points;
      }
    },
    updatePoints: (state, { payload: { points } }: UserPayload) => {
      if (typeof points !== 'undefined') {
        state.points += points;
      }
    },
  },
});

export const { updateUser, updatePoints } = slice.actions;

export default slice.reducer;

export type UserState = {
  name: string | null;
  points: number;
};

export type UserPayload = {
  payload: Partial<UserState>;
};

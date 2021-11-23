import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  games: [],
};

const gameListSlice = createSlice({
  name: "GAMELIST",
  initialState,
  reducers: {
    addToList: (state, { payload }) => {
      state.games = payload;
    },
  },
});

const { addToList } = gameListSlice.actions;

export const selectGameListState = (state) => state.gameList;

export const addToGameList = (id) => (dispatch, getState) => {
  const list = getState()?.gameList?.games;
  const newList = [...list, id];
  dispatch(addToList(newList));
};

export const removeFromGameList = (id) => (dispatch, getState) => {
  const list = [...getState()?.gameList?.games];
  const index = list.findIndex((listIdx) => listIdx === id);
  list.splice(index, 1);
  dispatch(addToList(list));
};

export default gameListSlice.reducer;

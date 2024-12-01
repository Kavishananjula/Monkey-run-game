import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  play: false,
  pause: false,
  die: false,
  speed: 0,
  score: 0,
  lastScore: 0,
  level: 1,
  loadingScreen: true,
};

export const engineSlice = createSlice({
  name: "engine",
  initialState,
  reducers: {
    setReady: (state, action) => {
      state.play = action.payload;
    },
    setPause: (state, action) => {
      state.pause = action.payload;
    },
    setDie: (state, action) => {
      state.die = action.payload;
    },
    setSpeed: (state, action) => {
      state.speed += action.payload;
    },
    setScore: (state, action) => {
      state.score = action.payload;
    },
    setLastScore: (state, action) => {
      state.lastScore = action.payload;
    },
    setLoadingScreen: (state, action) => {
      state.loadingScreen = action.payload;
    },
    setLevel: (state) => {
      state.level += 1;
      state.score = 100; // Reset score for new level
      state.die = false; // Reset die status for new level
    },
  },
});

export const {
  setReady,
  setPause,
  setDie,
  setSpeed,
  setScore,
  setLastScore,
  setLoadingScreen,
  setLevel,
} = engineSlice.actions;

export default engineSlice.reducer;

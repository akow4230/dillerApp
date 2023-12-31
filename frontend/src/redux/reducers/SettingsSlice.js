import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  settingsArray: [],
  settingBoxColor: ""
};
export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    getSettings(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    getSettingsSuccess(state, action) {
      state.settingsArray = action.payload;
      state.isLoading = false;
    },
    getSettingsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});
export const {
  getSettings,
  getSettingsSuccess,
  getSettingsFailure
} = settingsSlice.actions;
export default settingsSlice.reducer;

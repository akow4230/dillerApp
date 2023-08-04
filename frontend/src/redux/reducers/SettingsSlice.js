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
    setSettingBoxColor(state, action) {
      state.settingBoxColor = action.payload;
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
  setSettingBoxColor,
  getSettingsFailure
} = settingsSlice.actions;
export default settingsSlice.reducer;

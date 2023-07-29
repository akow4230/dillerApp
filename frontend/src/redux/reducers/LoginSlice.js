import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  loggedIn: false,
  error: null,
  navigation: "",
  formData: {
    phone: "",
    password: "",
    rememberMe: ""
  }
};
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setFormData(state, action) {
      state.formData = action.payload;
    },
    UserLogIn(state, action) {
      console.log(action.payload);
      state.formData = action.payload;
    },
    UserSuccess(state, action) {
      state.isLoading = false;
      state.loggedIn = true;
    },
    UserFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    signUserStart: state => {
      state.isLoading = true;
    }
  }
});
export const {
  setFormData,
  UserLogIn,
  UserSuccess,
  UserFailure,
  signUserStart
} = loginSlice.actions;
export default loginSlice.reducer;

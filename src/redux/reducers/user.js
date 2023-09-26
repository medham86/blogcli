import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notifyError } from "../../config/notify";
import Api from "../../config/api";

export const fetchUserData =  createAsyncThunk(
  "user/fetchUserData",
  async(_, thunkapi) => {
    try {
      const response = await Api.get("/user");
      return response.data;
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || error?.response?.data?.error;
      notifyError(errorMsg);
      return thunkapi.rejectWithValue(errorMsg);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_,thunkapi)=>{
    try{
      let response = Api.post("/user/logout")
      return response.data
    }catch(error){
      const errorMsg = error?.response?.data?.message || error?.response?.data?.error
      notifyError(errorMsg)
      return thunkapi.rejectWithValue(errorMsg)
    }
  }
)

const initialState = {
  isLogin: false,
  data: {},
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
    },
  },
  extraReducers: (builder) => {
      builder.addCase(fetchUserData.fulfilled, (state, action) => {
        state.data = action.payload 
        state.isLogin = true
      })
      builder.addCase(logoutUser.fulfilled, (state, action) => {
        state.isLogin = false;
      });
    },
});

export const { login, logout } = user.actions;

export default user.reducer;

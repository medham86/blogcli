import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notifyError } from "../../config/notify";
import Api from "../../config/api";

export const fetchUserBlogs =  createAsyncThunk(
  "user/fetchUserBlogs",
  async(_, thunkapi) => {
    try {
      const response = await Api.get("/blog");
     
      return response.data;
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || error?.response?.data?.error;
      notifyError(errorMsg);
      return thunkapi.rejectWithValue(errorMsg);
    }
  }
);

export const fetchAdminBlogs =  createAsyncThunk(
  "user/fetchAdminBlogs",
  async(_, thunkapi) => {
    try {
      const response = await Api.get("/blog/allblogs");
     
      return response.data;
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || error?.response?.data?.error;
      notifyError(errorMsg);
      return thunkapi.rejectWithValue(errorMsg);
    }
  }
);

const initialState = {
  data: [],
  alldata :[]
};

const blog = createSlice({
  name: "blogs",
  initialState,
  extraReducers: (builder) => {
      builder.addCase(fetchUserBlogs.fulfilled, (state, action) => {
        state.data = action.payload 
       
      })
      builder.addCase(fetchAdminBlogs.fulfilled, (state, action) => {
        state.alldata = action.payload 
      })
      
    },
});

export const {} = blog.actions;

export default blog.reducer;

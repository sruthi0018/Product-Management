import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

const initialState = {
  isLoading: false,
  error: null,
  subCategory: null,
  subCategories: [],
};

const slice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createSubCategorySuccess(state, action) {
      state.isLoading = false;
      state.subCategories.push(action.payload);
    },
    getSubCategoriesSuccess(state, action) {
      state.isLoading = false;
      state.subCategories = action.payload;
    },
    getSubCategorySuccess(state, action) {
      state.isLoading = false;
      state.subCategory = action.payload;
    },
  },
});

export default slice.reducer;

export function CreateSubCategory(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`${BASE_URL}/api/subcategory`, data);
      console.log("createsub",response.data.subCategory)
      dispatch(slice.actions.createSubCategorySuccess(response.data.subCategory));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      throw error;
    }
  };
}

export function GetAllSubCategories() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${BASE_URL}/api/subcategory`);
      console.log(response.data, "sss");
      dispatch(slice.actions.getSubCategoriesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
}





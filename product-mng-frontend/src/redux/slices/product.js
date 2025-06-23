import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

const initialState = {
  isLoading: false,
  error: null,
  product: null,
  products: [],
};

const slice = createSlice({
  name: "products",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createProductSuccess(state, action) {
      state.isLoading = false;
      state.products.push(action.payload);
    },
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },
    getProductSuccess(state, action) {
      state.isLoading = false;
      state.product = action.payload;
    },
    searchProductSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },
    updateProductSuccess(state, action) {
      state.isLoading = false;
      const updated = action.payload;
      const index = state.products.findIndex((p) => p._id === updated._id);
      if (index !== -1) {
        state.products[index] = updated;
      }
    },
  },
});

export default slice.reducer;

export function CreateProduct(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`${BASE_URL}/api/products`, data);
      dispatch(slice.actions.createProductSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      throw error;
    }
  };
}

export function GetAllProducts() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${BASE_URL}/api/product`);
      console.log(response, "rrr");
      dispatch(slice.actions.getProductsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
}

export function GetProductById(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${BASE_URL}/api/products/${id}`);
      dispatch(slice.actions.getProductSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
}

export function SearchProducts(query) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `${BASE_URL}/api/products/search/${query}`
      );
      dispatch(slice.actions.searchProductSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
}

export function UpdateProduct(id, data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`${BASE_URL}/api/products/${id}`, data);
      dispatch(slice.actions.updateProductSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      throw error;
    }
  };
}


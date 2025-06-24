import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";

// const BASE_URL = "http://localhost:5000";

const initialState = {
  isLoading: false,
  error: null,
  wishlist: [],
  wishlistProducts: [],
};

const slice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getWishlistSuccess(state, action) {
      state.isLoading = false;
      const products = action.payload;
      state.wishlistProducts = products;
      state.wishlist = products.map((p) => p._id);
    },
    toggleWishlistSuccess(state, action) {
      const productId = action.payload;
      const index = state.wishlist.indexOf(productId);
      if (index > -1) {
        state.wishlist.splice(index, 1);
        state.wishlistProducts = state.wishlistProducts.filter(
          (p) => p._id !== productId
        );
      } else {
        state.wishlist.push(productId);
      }
      state.isLoading = false;
    },
  },
});

export default slice.reducer;

export function GetWishlist(userId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${BASE_URL}/api/wishlist/${userId}`);
      console.log("wishhhh", response.data);
      dispatch(slice.actions.getWishlistSuccess(response.data.products));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
}

export function ToggleWishlist(userId, productId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post(`${BASE_URL}/api/wishlist/${userId}/${productId}`);
      dispatch(slice.actions.toggleWishlistSuccess(productId));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
}

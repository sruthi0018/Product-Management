
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/product';
import categoryReducer from './slices/category'
import subCategoryReducer from './slices/subCategory'
import wishListReducer from './slices/wishList'

export const store = configureStore({
  reducer: {
    products: productReducer,
    categories:categoryReducer,
    subCategory:subCategoryReducer,
    wishList:wishListReducer
  },
});


import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/product';
import categoryReducer from './slices/category'
import subCategoryReducer from './slices/subCategory'

export const store = configureStore({
  reducer: {
    products: productReducer,
    categories:categoryReducer,
    subCategory:subCategoryReducer
  },
});

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/header";
import Sidebar from "../components/sideBar";
import ProductList from "../components/productList";
import { GetAllProducts } from "../../redux/slices/product";
import { GetAllCategories } from "../../redux/slices/category";
import { GetAllSubCategories } from "../../redux/slices/subCategory";

export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllProducts());
    dispatch(GetAllCategories())
      dispatch(GetAllSubCategories());

  }, [dispatch]);
   const { subCategories } = useSelector((state) => state.subCategory);

  const { products } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

console.log("produ",products)

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar categories={categories} subCategories={subCategories} />
        <ProductList products={products} />
      </div>
    </div>
  );
}

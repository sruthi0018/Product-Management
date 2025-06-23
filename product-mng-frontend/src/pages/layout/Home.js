import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/header";
import Sidebar from "../components/sideBar";
import ProductList from "../components/productList";
import { GetAllProducts } from "../../redux/slices/product";

export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllProducts());
  }, [dispatch]);
  const { products } = useSelector((state) => state.products);
console.log("produ",products)

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <ProductList products={products} />
      </div>
    </div>
  );
}

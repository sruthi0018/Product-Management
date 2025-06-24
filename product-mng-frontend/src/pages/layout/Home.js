import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/header";
import Sidebar from "../components/sideBar";
import ProductList from "../components/productList";
import { GetAllProducts } from "../../redux/slices/product";
import { GetAllCategories } from "../../redux/slices/category";
import { GetAllSubCategories } from "../../redux/slices/subCategory";

export default function HomePage() {
  const dispatch = useDispatch();
  const { products, total } = useSelector((state) => state.products);
  const { subCategories } = useSelector((state) => state.subCategory);
  const { categories } = useSelector((state) => state.categories);
  const [selectedSubIds, setSelectedSubIds] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  console.log("TO", selectedSubIds);

useEffect(() => {
  const delay = setTimeout(() => {
    const subCategoryId = selectedSubIds.length > 0 ? selectedSubIds.join(',') : undefined;
    dispatch(GetAllProducts({ search, page, limit, subCategoryId }));
  }, 300);

  return () => clearTimeout(delay);
}, [dispatch, search, page, selectedSubIds]);


  useEffect(() => {
    dispatch(GetAllCategories());
    dispatch(GetAllSubCategories());
  }, [dispatch]);

  const handleSearchChange = (value) => {
    setPage(1);
    setSearch(value);
  };

    const handleFilterChange = (subIds) => {
    setPage(1);
    setSelectedSubIds(subIds);
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header onSearch={handleSearchChange} searchValue={search} />

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar categories={categories} subCategories={subCategories}   onFilterChange={handleFilterChange} />

        <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
          <ProductList products={products} />

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                style={{
                  padding: "6px 12px",
                  border: "1px solid #ccc",
                  backgroundColor: i + 1 === page ? "#1e3a8a" : "#fff",
                  color: i + 1 === page ? "#fff" : "#000",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

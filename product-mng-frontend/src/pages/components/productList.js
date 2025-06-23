import React, { useEffect, useState } from "react";
import ProductCard from "./productCard";
import AddCategoryModal from "./addCategory";
import { CreateCategory, GetAllCategories } from "../../redux/slices/category";
import { useDispatch, useSelector } from "react-redux";
import { AddSubCategoryModal } from "./addSubCategory";

export default function ProductList({ products }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllCategories());
  }, [dispatch]);
  const { categories } = useSelector((state) => state.categories);

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);

  const handleAddCategory = () => setShowCategoryModal(true);
  const handleAddSubCategory = () => setShowSubCategoryModal(true);
  const handleCloseModal = () => setShowCategoryModal(false);
  const handleCloseSubCatModal = () => setShowSubCategoryModal(false);

  const handleCategorySubmit = async (categoryName) => {
    try {
      console.log("Create category:", categoryName);
      await dispatch(CreateCategory({ name: categoryName }));
    } catch (error) {
      console.error("Category creation failed:", error.message);
    }
  };

  return (
    <main style={{ flex: 1, padding: "20px" }}>
   
      <div style={{ marginBottom: "20px", display: "flex", gap: "15px" }}>
        <button style={styles.button} onClick={handleAddCategory}>
          Add Category
        </button>
        <button style={styles.button} onClick={handleAddSubCategory}>
          Add Subcategory
        </button>
        <button style={styles.button}>Add Product</button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <AddCategoryModal
        open={showCategoryModal}
        onClose={handleCloseModal}
        onSubmit={handleCategorySubmit}
      />
      <AddSubCategoryModal
        open={showSubCategoryModal}
        onClose={handleCloseSubCatModal}
        categories={categories}
      />
    </main>
  );
}

const styles = {
  button: {
    backgroundColor: "#facc15",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

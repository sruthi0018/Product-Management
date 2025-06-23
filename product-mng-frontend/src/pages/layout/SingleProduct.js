import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearSingleProduct, GetProductById } from "../../redux/slices/product";
import { UPLOAD_URL } from "../../constants/constants";
import { FaHeart } from "react-icons/fa";
import AddProductModal from "../components/addProduct";

export default function SingleProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.products);
  const [showProductEditModal, setShowProductEditModal] = useState(false);

  const [selectedImage, setSelectedImage] = useState("");
  const [qty, setQty] = useState(1);

useEffect(() => {
  if (id) {
    dispatch(GetProductById(id));
  }

  return () => {
    dispatch(clearSingleProduct()); 
  };
}, [id, dispatch]);

  useEffect(() => {
    if (product?.image?.length > 0) {
      setSelectedImage(product.image[0]);
    }
  }, [product]);

  if (loading || !product || Object.keys(product).length === 0) {
    return <div style={styles.loading}>Loading product...</div>;
  }

  const mainImage = selectedImage ? UPLOAD_URL + selectedImage : "";

  return (
    <div style={styles.container}>
      {/* Image Section */}
      <div style={styles.imageBox}>
        <img src={mainImage} alt={product.title} style={styles.mainImage} />
        <div style={styles.subImageContainer}>
          {product.image?.map((img, idx) => (
            <img
              key={idx}
              src={UPLOAD_URL + img}
              alt={`sub-${idx}`}
              onClick={() => setSelectedImage(img)}
              style={{
                ...styles.subImage,
                border: selectedImage === img ? "2px solid #1e3a8a" : "1px solid #ccc",
              }}
            />
          ))}
        </div>
      </div>

      {/* Details Section */}
      <div style={styles.details}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>{product.title}</h2>
         
        </div>

        <p style={styles.subCategory}>Subcategory: {product?.subCategoryId?.name}</p>
        <p style={styles.description}>{product.description}</p>

        {/* <h4>Variants</h4>
        <ul style={styles.variants}>
          {product.variants?.map((variant, idx) => (
            <li key={idx}>
              ₹{variant.price} - Qty: {variant.qty}
            </li>
          ))}
        </ul> */}

        <div style={styles.qtyBox}>
          <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)} style={styles.qtyBtn}>-</button>
          <span>{qty}</span>
          <button onClick={() => setQty(qty + 1)} style={styles.qtyBtn}>+</button>
        </div>

        <div style={styles.actions}>
          <button style={styles.editBtn} onClick={() => setShowProductEditModal(true)}>Edit Product</button>
          <button style={styles.editBtn}>Add to Cart</button>
           <button style={styles.favBtn}>
            <FaHeart />
          </button>
        </div>
      </div>
      <AddProductModal
        open={showProductEditModal}
        onClose={() => setShowProductEditModal(false)}
        productId={product._id}
/>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "30px",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
  },
  imageBox: {
    width: "40%",
  },
  title:{
    color:'#1e3a8a'
  },
  mainImage: {
    width: "100%",
    borderRadius: "8px",
    objectFit: "cover",
    height: "300px",
    border: "2px solid #1e3a8a",
  },
  subImageContainer: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
  },
  subImage: {
    width: "60px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "6px",
    cursor: "pointer",
  },
  details: {
    flex: 1,
  },
  favBtn: {
    // background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "50%",
    padding: "8px",
    cursor: "pointer",
    color: "#9999",
  },
  subCategory: {
    fontSize: "14px",
    color: "#555",
  },
  description: {
    marginTop: "10px",
    fontSize: "16px",
    lineHeight: "1.6",
  },
  variants: {
    marginTop: "10px",
    listStyle: "disc inside",
    fontSize: "15px",
  },
  qtyBox: {
    marginTop: "15px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "bold",
    fontSize: "16px",
  },
  qtyBtn: {
    padding: "6px 12px",
    fontSize: "18px",
    border: "1px solid #1e3a8a",
    backgroundColor: "#fff",
    borderRadius: "4px",
    cursor: "pointer",
  },
  actions: {
    marginTop: "20px",
    display: "flex",
    gap: "15px",
  },
  editBtn: {
    padding: "10px 20px",
    backgroundColor: "#facc15",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  cartBtn: {
    padding: "10px 20px",
    backgroundColor: "#1e3a8a",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  loading: {
    textAlign: "center",
    padding: "40px",
    fontSize: "18px",
  },
};

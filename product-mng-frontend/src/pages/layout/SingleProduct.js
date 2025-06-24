import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearSingleProduct, GetProductById } from "../../redux/slices/product";
import { FaHeart } from "react-icons/fa";
import AddProductModal from "../components/addProduct";
import { GetWishlist, ToggleWishlist } from "../../redux/slices/wishList";
import { useAuth } from "../../context/auth";

export default function SingleProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { product, loading } = useSelector((state) => state.products);
  const { wishlist } = useSelector((state) => state.wishList);
  const [showProductEditModal, setShowProductEditModal] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const [selectedImage, setSelectedImage] = useState("");
  const [qty, setQty] = useState(1);
  const userId = user?.id;

  useEffect(() => {
    if (id) {
      dispatch(GetProductById(id));
    }
    if (userId) {
      dispatch(GetWishlist(userId));
    }

    return () => {
      dispatch(clearSingleProduct());
    };
  }, [id, userId, dispatch]);

  useEffect(() => {
    if (product?.image?.length > 0) {
      setSelectedImage(product.image[0]);
    }
  }, [product]);

  const isWishlisted = wishlist.includes(product?._id);
  console.log(isWishlisted, "si");

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    if (userId && product?._id) {
      dispatch(ToggleWishlist(userId, product._id));
    }
  };

  if (loading || !product || Object.keys(product).length === 0) {
    return <div style={styles.loading}>Loading product...</div>;
  }

  const mainImage = selectedImage ? process.env.REACT_APP_UPLOAD_URL + selectedImage : "";

  return (
    <div style={styles.container}>
      <div style={styles.imageBox}>
        <img src={mainImage} alt={product.title} style={styles.mainImage} />
        <div style={styles.subImageContainer}>
          {product.image?.map((img, idx) => (
            <img
              key={idx}
              src={process.env.REACT_APP_UPLOAD_URL + img}
              alt={`sub-${idx}`}
              onClick={() => setSelectedImage(img)}
              style={{
                ...styles.subImage,
                border:
                  selectedImage === img
                    ? "2px solid #1e3a8a"
                    : "1px solid #ccc",
              }}
            />
          ))}
        </div>
      </div>

      <div style={styles.details}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>{product.title}</h2>
        </div>

        <p style={styles.subCategory}>
          Subcategory: {product?.subCategoryId?.name}
        </p>
        <p style={{ fontWeight: "bold", fontSize: "18px", margin: "10px 0" }}>
          Price: ₹{product.variants?.[selectedVariantIndex]?.price ?? "N/A"}
        </p>

        <p style={styles.description}>{product.description}</p>

        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          {product.variants?.map((variant, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSelectedVariantIndex(idx);
                setQty(1);
              }}
              style={{
                padding: "8px 12px",
                border:
                  selectedVariantIndex === idx
                    ? "2px solid #1e3a8a"
                    : "1px solid #ccc",
                backgroundColor:
                  selectedVariantIndex === idx ? "#1e3a8a" : "#fff",
                color: selectedVariantIndex === idx ? "#fff" : "#000",
                borderRadius: "20px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              {variant.ram}
            </div>
          ))}
        </div>

        <div style={styles.qtyBox}>
          <button
            onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
            style={styles.qtyBtn}
          >
            -
          </button>
          {/* <span>{qty}</span> */}
          <span style={{ fontSize: "14px", color: "#888" }}>
            {product.variants?.[selectedVariantIndex]?.qty ?? "N/A"}
          </span>
          <button
            onClick={() => {
              const maxQty = product.variants?.[selectedVariantIndex]?.qty ?? 1;
              if (qty < maxQty) setQty(qty + 1);
            }}
            style={styles.qtyBtn}
          >
            +
          </button>
        </div>

        <div style={styles.actions}>
          <button
            style={styles.editBtn}
            onClick={() => setShowProductEditModal(true)}
          >
            Edit Product
          </button>
          <button style={styles.editBtn}>Add to Cart</button>
          {user && (
            <button style={styles.favBtn} onClick={handleToggleWishlist}>
              {isWishlisted ? (
                <FaHeart color="red" />
              ) : (
                <FaHeart color="#ccc" />
              )}
            </button>
          )}
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
  title: {
    color: "#1e3a8a",
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
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "10px",
  },
  qtyBtn: {
    padding: "6px 10px",
    border: "1px solid #ccc",
    backgroundColor: "#f9fafb",
    cursor: "pointer",
    borderRadius: "6px",
    fontSize: "16px",
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

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateProduct,
  UpdateProduct,
  GetProductById,
  GetAllProducts,
} from "../../redux/slices/product";
import { GetAllSubCategories } from "../../redux/slices/subCategory";
import { UPLOAD_URL } from "../../constants/constants";

export default function AddProductModal({ open, onClose, productId }) {
  const dispatch = useDispatch();
  const { subCategories } = useSelector((state) => state.subCategory);
  const { product } = useSelector((state) => state.products);

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
      subCategoryId: "",
      variants: [{ ram: "", price: "", qty: "" }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "variants",
  });

  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(GetAllSubCategories());
  }, [dispatch]);

  useEffect(() => {
    if (productId) {
      dispatch(GetProductById(productId));
    }
  }, [productId, dispatch]);

  useEffect(() => {
    if (productId && product?._id === productId) {
      reset({
        title: product.title,
        description: product.description,
        subCategoryId: product.subCategoryId?._id || "",
        variants: product.variants,
       
      });
      setImages(product.image || []);
    }
  }, [productId, product, reset]);

  if (!open) return null;

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  console.log("Proid", productId);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("subCategoryId", data.subCategoryId);
    formData.append("variants", JSON.stringify(data.variants));
    images.forEach((img) => formData.append("image", img));

    if (productId) {
      const id = productId;
      await dispatch(UpdateProduct(id, formData));
      await dispatch(GetProductById(productId));
    } else {
      await dispatch(CreateProduct(formData));
      await dispatch(GetAllProducts());
    
    reset({
      title: "",
      description: "",
      subCategoryId: "",
      variants: [{ ram: "", price: "", qty: "" }],
    });
    setImages([]);
  }
    onClose();
  };

  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <div style={styles.scrollArea}>
          <h3>{productId ? "Edit Product" : "Add Product"}</h3>
          <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
            <div style={styles.row}>
              <label style={styles.label}>Title</label>
              <input
                {...register("title", { required: true })}
                style={styles.input}
              />
            </div>

            <h4 style={styles.subHeading}>Variants</h4>
            {fields.map((field, index) => (
              <div key={field.id} style={styles.row}>
                <input
                  placeholder="RAM"
                  {...register(`variants.${index}.ram`)}
                  style={styles.inputSmall}
                />
                <input
                  placeholder="Price"
                  type="number"
                  {...register(`variants.${index}.price`, {
                    valueAsNumber: true,
                  })}
                  style={styles.inputSmall}
                />
                <input
                  placeholder="Quantity"
                  type="number"
                  {...register(`variants.${index}.qty`, {
                    valueAsNumber: true,
                  })}
                  style={styles.inputSmall}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ ram: "", price: "", qty: "" })}
              style={styles.button}
            >
              Add Variant
            </button>

      
            <div style={styles.row}>
              <label style={styles.label}>Subcategory</label>
              <select
                {...register("subCategoryId", { required: true })}
                style={styles.input}
              >
                <option value="">Select Subcategory</option>
                {subCategories.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>

   
            <div style={styles.row}>
              <label style={styles.label}>Description</label>
              <textarea {...register("description")} style={styles.textarea} />
            </div>

      
            <div style={styles.row}>
              <label style={styles.label}>Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            {productId && Array.isArray(images) && images.length > 0 && (
              <div style={styles.imagePreviewRow}>
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={
                      typeof img === "string"
                        ? `${UPLOAD_URL}${img}`
                        : URL.createObjectURL(img)
                    }
                    alt={`product-${idx}`}
                    style={styles.previewImage}
                  />
                ))}
              </div>
            )}

            {/* Actions */}
            <div style={{ ...styles.row, justifyContent: "flex-end" }}>
              <button type="button" onClick={onClose} style={styles.cancel}>
                Discard
              </button>
              <button type="submit" style={styles.submit}>
                {productId ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
const styles = {
  scrollArea: {
    padding: 20,
    overflowY: "auto",
    maxHeight: "70vh", 
  },
  imagePreviewRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    // marginTop: 10,
    paddingLeft: "30%",
  },
  previewImage: {
    width: 70,
    height: 70,
    objectFit: "cover",
    border: "1px solid #ccc",
    borderRadius: 6,
  },
  backdrop: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    borderRadius: 10,
    width: 700,
    maxHeight: "80vh",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    padding: 20,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  label: {
    width: "30%",
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  textarea: {
    flex: 1,
    padding: 10,
    height: 80,
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  inputSmall: {
    flex: 1,
    padding: 8,
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  subHeading: {
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: -5,
  },
  button: {
    alignSelf: "flex-start",
    padding: "8px 16px",
    backgroundColor: "#e2e8f0",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    marginBottom: 10,
  },
  cancel: {
    padding: "8px 16px",
    backgroundColor: "#ccc",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  submit: {
    padding: "8px 16px",
    backgroundColor: "#facc15",
    border: "none",
    borderRadius: 6,
    fontWeight: "bold",
    cursor: "pointer",
  },
};

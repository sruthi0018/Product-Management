import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import {
  CreateSubCategory,
  GetAllSubCategories,
} from "../../redux/slices/subCategory";

export function AddSubCategoryModal({ open, onClose, categories }) {
  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    categoryId: Yup.string().required("Category is required"),
    name: Yup.string().required("Subcategory name is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await dispatch(CreateSubCategory(data));
      await dispatch(GetAllSubCategories());

      reset();
      onClose();
    } catch (error) {
      console.error("Error creating subcategory:", error.message);
    }
  };

  if (!open) return null;

  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <h3>Add Subcategory</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <select {...register("categoryId")} style={styles.input}>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p style={styles.error}>{errors.categoryId.message}</p>
          )}

          <input
            placeholder="Subcategory Name"
            {...register("name")}
            style={styles.input}
          />
          {errors.name && <p style={styles.error}>{errors.name.message}</p>}

          <div style={styles.actions}>
            <button type="button" onClick={onClose} style={styles.cancel}>
              Discard
            </button>
            <button type="submit" style={styles.submit}>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  backdrop: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 100,
  },
  modal: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    width: 300,
    margin: "100px auto",
  },
  input: {
    width: "90%",
    padding: 10,
    margin: "10px 0",
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  actions: { display: "flex", justifyContent: "flex-end", gap: 10 },
  cancel: {
    padding: "8px 16px",
    backgroundColor: "#ccc",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  submit: {
    padding: "6px 12px",
    backgroundColor: "#facc15",
    border: "none",
    borderRadius: 6,
  },
};

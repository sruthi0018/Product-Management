import React, { useEffect, useState } from 'react';

export function EditProductModal({ open, onClose, onSubmit, subCategories, product }) {
  const [variants, setVariants] = useState([]);
  const [images, setImages] = useState([]);
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    subCategoryId: '',
  });

  useEffect(() => {
    if (product) {
      setFormValues({
        title: product.title || '',
        description: product.description || '',
        subCategoryId: product.subCategoryId || '',
      });
      setVariants(product.variants || [{ ram: '', price: '', qty: '' }]);
    }
  }, [product]);

  if (!open) return null;

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { ram: '', price: '', qty: '' }]);
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', formValues.title);
    formData.append('description', formValues.description);
    formData.append('subCategoryId', formValues.subCategoryId);
    formData.append('variants', JSON.stringify(variants));
    images.forEach((img) => formData.append('image', img));

    onSubmit(product._id, formData);
    onClose();
  };

  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <div style={styles.scrollArea}>
          <h3>Edit Product</h3>
          <form onSubmit={handleSubmit}>
            <div style={styles.fieldRow}>
              <label style={styles.label}>Title:</label>
              <input
                name="title"
                value={formValues.title}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>

            <h4 style={styles.sectionHeading}>Variants</h4>
            {variants.map((variant, index) => (
              <div key={index} style={{ marginBottom: 10 }}>
                <div style={styles.variantGroup}>
                  <input
                    placeholder="RAM"
                    value={variant.ram}
                    onChange={(e) => handleVariantChange(index, 'ram', e.target.value)}
                    style={styles.inputSmall}
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={variant.price}
                    onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                    style={styles.inputSmall}
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={variant.qty}
                    onChange={(e) => handleVariantChange(index, 'qty', e.target.value)}
                    style={styles.inputSmall}
                  />
                </div>
              </div>
            ))}
            <button type="button" onClick={addVariant} style={{ ...styles.submit, marginBottom: 10 }}>
              Add Variant
            </button>

            <div style={styles.fieldRow}>
              <label style={styles.label}>Subcategory:</label>
              <select
                name="subCategoryId"
                value={formValues.subCategoryId}
                onChange={handleInputChange}
                required
                style={styles.input}
              >
                <option value="">Select Subcategory</option>
                {subCategories.map((sub) => (
                  <option key={sub._id} value={sub._id}>{sub.name}</option>
                ))}
              </select>
            </div>

            <div style={styles.fieldRow}>
              <label style={styles.label}>Description:</label>
              <textarea
                name="description"
                value={formValues.description}
                onChange={handleInputChange}
                style={styles.textarea}
              />
            </div>

            <div style={styles.fieldRow}>
              <label style={styles.label}>Images:</label>
              <input
                type="file"
                name="image"
                multiple
                onChange={handleImageChange}
                accept="image/*"
                style={styles.input}
              />
            </div>

            <div style={styles.actions}>
              <button type="button" onClick={onClose} style={styles.cancel}>
                Cancel
              </button>
              <button type="submit" style={styles.submit}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


const styles = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    background: '#fff',
    borderRadius: 10,
    width: 700,
    maxHeight: '80vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  scrollArea: {
    padding: 20,
    overflowY: 'auto',
  },
  fieldRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,
  },
  label: {
    width: '30%',
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    border: '1px solid #ccc',
  },
  textarea: {
    flex: 1,
    padding: 10,
    height: 80,
    borderRadius: 6,
    border: '1px solid #ccc',
  },
  sectionHeading: {
    marginTop: 20,
    marginBottom: 10,
  },
  variantGroup: {
    display: 'flex',
    gap: 10,
    justifyContent: 'space-between',
  },
  variantItem: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  inputSmall: {
    padding: 8,
    borderRadius: 6,
    border: '1px solid #ccc',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 20,
  },
  cancel: {
    padding: '8px 16px',
    backgroundColor: '#ccc',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  },
  submit: {
    padding: '8px 16px',
    backgroundColor: '#facc15',
    border: 'none',
    borderRadius: 6,
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

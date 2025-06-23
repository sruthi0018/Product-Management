
import React, { useState } from 'react';

export function AddProductModal({ onClose, onSubmit, subCategories }) {
  const [variants, setVariants] = useState([{ ram: '', price: '', qty: '' }]);

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { ram: '', price: '', qty: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      title: e.target.title.value,
      description: e.target.description.value,
      subCategoryId: e.target.subCategoryId.value,
      variants
    };
    onSubmit(product);
    onClose();
  };

  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <h3>Add Product</h3>
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Product Title" style={styles.input} required />
          <textarea name="description" placeholder="Description" style={styles.input} />
          <select name="subCategoryId" required style={styles.input}>
            <option value="">Select Subcategory</option>
            {subCategories.map((sub) => (
              <option key={sub._id} value={sub._id}>{sub.name}</option>
            ))}
          </select>
          <h4>Variants</h4>
          {variants.map((variant, index) => (
            <div key={index}>
              <input
                placeholder="RAM"
                value={variant.ram}
                onChange={(e) => handleVariantChange(index, 'ram', e.target.value)}
                style={styles.input}
              />
              <input
                placeholder="Price"
                type="number"
                value={variant.price}
                onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                style={styles.input}
              />
              <input
                placeholder="Quantity"
                type="number"
                value={variant.qty}
                onChange={(e) => handleVariantChange(index, 'qty', e.target.value)}
                style={styles.input}
              />
            </div>
          ))}
          <button type="button" onClick={addVariant} style={{ ...styles.submit, marginTop: 10 }}>Add Variant</button>
          <div style={styles.actions}>
            <button type="button" onClick={onClose} style={styles.cancel}>Cancel</button>
            <button type="submit" style={styles.submit}>Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  backdrop: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100 },
  modal: { background: '#fff', padding: 20, borderRadius: 10, width: 300, margin: '100px auto' },
  input: { width: '100%', padding: 10, margin: '10px 0', borderRadius: 6, border: '1px solid #ccc' },
  actions: { display: 'flex', justifyContent: 'flex-end', gap: 10 },
  cancel: { padding: '6px 12px' },
  submit: { padding: '6px 12px', backgroundColor: '#facc15', border: 'none', borderRadius: 6 }
};
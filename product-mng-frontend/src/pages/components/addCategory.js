import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = Yup.object().shape({
  category: Yup.string().required('Category name is required').min(2, 'Too short'),
});

export default function AddCategoryModal({ open, onClose, onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitHandler = (data) => {
    onSubmit(data.category);
    reset();
    onClose();
  };

  if (!open) return null;

  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <h3>Add Category</h3>
        <form onSubmit={handleSubmit(submitHandler)}>
          <input
            placeholder="Category Name"
            {...register('category')}
            style={styles.input}
          />
          {errors.category && (
            <p style={styles.error}>{errors.category.message}</p>
          )}
          <div style={styles.actions}>
            <button type="button" onClick={() => { reset(); onClose(); }} style={styles.cancel}>Discard</button>
            <button type="submit" style={styles.submit}>Add</button>
          </div>
        </form>
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
    padding: 20,
    borderRadius: 10,
    width: 320,
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
  },
  input: {
    width: '95%',
    padding: 10,
    marginTop: 10,
    borderRadius: 6,
    border: '1px solid #ccc',
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: '13px',
    marginTop: '5px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 15,
  },
  cancel: {
    padding: '6px 12px',
    backgroundColor: '#ddd',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  },
  submit: {
    padding: '6px 12px',
    backgroundColor: '#facc15',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

import React from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();
  const product = {
    title: `Product ${id}`,
    description: 'This is a detailed view of the product.',
    mainImage: 'https://via.placeholder.com/300',
    subImages: [
      'https://via.placeholder.com/100',
      'https://via.placeholder.com/100',
      'https://via.placeholder.com/100'
    ],
    variants: [
      { ram: '4GB', price: 5000, qty: 10 },
      { ram: '8GB', price: 7000, qty: 5 }
    ]
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>{product.title}</h2>
      <img src={product.mainImage} alt="Main" style={{ width: '300px', borderRadius: '8px' }} />
      <div style={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
        {product.subImages.map((img, i) => (
          <img key={i} src={img} alt="Sub" style={{ width: '80px', height: '80px', borderRadius: '6px' }} />
        ))}
      </div>
      <p>{product.description}</p>
      <h4>Variants:</h4>
      <ul>
        {product.variants.map((v, i) => (
          <li key={i}>{v.ram} - ₹{v.price} ({v.qty} in stock)</li>
        ))}
      </ul>
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button style={styles.button}>Edit Product</button>
        <button style={styles.cartBtn}>Add to Cart</button>
      </div>
    </div>
  );
}

const styles = {
  button: {
    backgroundColor: '#facc15',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  cartBtn: {
    backgroundColor: '#1e3a8a',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

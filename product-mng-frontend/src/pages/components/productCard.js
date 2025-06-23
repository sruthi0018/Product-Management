import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UPLOAD_URL } from '../../constants/constants';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  console.log("ijh", product);

  const productImage = Array.isArray(product.image) ? product.image[0] : product.image;
  const price = product.variants?.[0]?.price ?? 'N/A';
console.log(UPLOAD_URL + productImage,"UPLOAD_URL + productImage")

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px', textAlign: 'center', cursor: 'pointer' }}
    >
      {productImage && (
        <img
          src={`${UPLOAD_URL}${productImage}`}
          alt={product.title}
          style={{ width: '100%', borderRadius: '8px', height: '150px', objectFit: 'cover' }}
        />
      )}
      <h4 style={{ margin: '10px 0' }}>{product.title}</h4>
      <p style={{ fontWeight: 'bold' }}>₹{price}</p>
    </div>
  );
}

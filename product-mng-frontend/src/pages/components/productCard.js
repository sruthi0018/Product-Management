import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UPLOAD_URL } from '../../constants/constants';
import { GetWishlist, ToggleWishlist } from '../../redux/slices/wishList';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../context/auth';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const userId = user?.id;

  const productImage = Array.isArray(product.image) ? product.image[0] : product.image;
  const price = product.variants?.[0]?.price ?? 'N/A';

  const { wishlist } = useSelector((state) => state.wishList);
  console.log("WER",wishlist)
 const isWishlisted = wishlist.includes(product?._id);


  const handleToggleWishlist = (e) => {
    e.stopPropagation(); 
    dispatch(ToggleWishlist(userId, product._id));
    dispatch(GetWishlist(userId))
  };

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '10px',
        textAlign: 'center',
        cursor: 'pointer',
        position: 'relative', 
      }}
    >
   {user&&
    <button
        onClick={handleToggleWishlist}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          fontSize: '20px',
          cursor: 'pointer',
        }}
      >
        {isWishlisted ? '❤️' : '🤍'}
      </button>
   }
     

      {productImage && (
        <img
          src={`${UPLOAD_URL}${productImage}`}
          alt={product.title}
          style={{
            width: '100%',
            borderRadius: '8px',
            height: '150px',
            objectFit: 'cover',
          }}
        />
      )}
      <h4 style={{ margin: '10px 0' }}>{product.title}</h4>
      <p style={{ fontWeight: 'bold' }}>₹{price}</p>
    </div>
  );
}

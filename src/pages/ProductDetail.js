import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../api/api';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import { Link } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    API.get(`/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  return (
    <div className="p-4">
      {product ? (
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <img src={product.image} alt={product.name} className="w-60 h-60 object-cover mt-4" />
          <p className="mt-2">Price: ₹{product.discountedPrice}</p>
          <p className="line-through text-gray-500">₹{product.price}</p>
          <p className="mt-2 font-semibold">Category: {product.Category?.name}</p>
          <div className="flex gap-2 mt-4">
            <button onClick={() => dispatch(addToCart(product))} className="bg-blue-600 text-white px-3 py-1 rounded">Add to Cart</button>
            <button onClick={() => alert('Proceed to Buy Now')} className="bg-green-600 text-white px-3 py-1 rounded">Buy Now</button>
           

          </div>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
}

export default ProductDetail;

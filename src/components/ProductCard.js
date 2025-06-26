import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition hover:scale-105 hover:shadow-xl duration-300">
      <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
        <p className="text-gray-600 mt-1">
          ₹ {product.discountedPrice} 
          <span className="line-through text-gray-400 ml-2 text-sm">₹{product.price}</span>
        </p>
        <div className="flex gap-2 mt-3">
          <button 
            onClick={() => dispatch(addToCart(product))}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
          >
            Add to Cart
          </button>
          <Link 
            to={`/product/${product.id}`} 
            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

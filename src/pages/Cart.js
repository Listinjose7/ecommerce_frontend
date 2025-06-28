import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateCartItem } from '../redux/actions/cartActions';
import { Link } from 'react-router-dom';

function Cart() {
  const { cartItems } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateCartItem(id, quantity));
    }
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.discountedPrice * item.quantity,
    0
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">🛒 Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
          <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div
                key={item.id}
                className="flex items-center bg-white rounded shadow p-4 gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded"
                />
                <div className="flex-1 space-y-1">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-600">₹ {item.discountedPrice}</p>
                  <div className="flex items-center gap-2">
                    <label className="text-gray-600 text-sm">Qty:</label>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) =>
                        handleQuantityChange(item.id, Number(e.target.value))
                      }
                      className="w-16 border p-1 rounded text-center"
                    />
                  </div>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-600 font-medium text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded shadow space-y-4 h-fit">
            <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
            <div className="flex justify-between text-lg">
              <span>Items: {cartItems.length}</span>
              <span>₹ {totalAmount}</span>
            </div>
            <div className="border-t"></div>
            <Link
              to="/checkout"
              className="block bg-green-600 text-white text-center py-3 rounded font-semibold hover:bg-green-700"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;

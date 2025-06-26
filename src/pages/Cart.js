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
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🛒 My Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-gray-500 mb-4">Your cart is empty.</p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded font-medium hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Section: Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div
                key={item.id}
                className="flex bg-white shadow rounded p-4 items-center gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded"
                />

                <div className="flex-1 space-y-1">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-600">₹ {item.discountedPrice}</p>
                  <div className="flex items-center mt-2 gap-3">
                    <label className="text-gray-600 text-sm">Qty:</label>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={e =>
                        handleQuantityChange(item.id, Number(e.target.value))
                      }
                      className="w-16 border rounded p-1 text-center"
                    />
                  </div>
                </div>

                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-600 font-semibold text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Right Section: Order Summary */}
          <div className="bg-white shadow rounded p-6 h-fit">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between text-gray-700 text-lg">
              <span>Items: {cartItems.length}</span>
              <span>₹ {totalAmount}</span>
            </div>
            <div className="border-t my-4"></div>
            <button
              onClick={() => (window.location.href = '/checkout')}
              className="bg-green-600 text-white w-full py-3 rounded text-lg hover:bg-green-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;

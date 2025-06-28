import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API } from '../api/api';
import { clearCart } from '../redux/actions/cartActions';
import { useNavigate, Link } from 'react-router-dom';

function Checkout() {
  const { cartItems } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!customer.name || !customer.phone || !customer.address) {
      alert("Please fill all fields.");
      return;
    }
    try {
      await API.post('/orders', {
        customerName: customer.name,
        customerPhone: customer.phone,
        customerAddress: customer.address,
        cartItems: cartItems,
      });
      dispatch(clearCart());
      alert("✅ Order placed successfully!");
      navigate('/');
    } catch (error) {
      console.error(error);
      alert("Something went wrong while placing your order.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">📦 Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form */}
        <form
          onSubmit={handlePlaceOrder}
          className="lg:col-span-2 bg-white p-6 rounded shadow space-y-4"
        >
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Your Details</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={customer.name}
            onChange={handleChange}
            className="border w-full p-3 rounded focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={customer.phone}
            onChange={handleChange}
            className="border w-full p-3 rounded focus:ring-2 focus:ring-blue-300"
          />
          <textarea
            name="address"
            placeholder="Full Address"
            value={customer.address}
            onChange={handleChange}
            className="border w-full p-3 rounded h-32 focus:ring-2 focus:ring-blue-300"
          ></textarea>

          <button
            type="submit"
            className="bg-green-600 text-white w-full py-3 rounded text-lg hover:bg-green-700"
          >
            ✅ Place Order
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded shadow space-y-4 h-fit">
          <h2 className="text-2xl font-bold text-gray-700">Order Summary</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-3">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-600">₹ {item.discountedPrice} × {item.quantity}</p>
                  </div>
                </div>
              ))}

              <div className="border-t pt-3 text-lg font-semibold flex justify-between">
                <span>Total</span>
                <span>
                  ₹ {cartItems.reduce((total, item) => total + item.discountedPrice * item.quantity, 0)}
                </span>
              </div>
            </div>
          )}

          <Link to="/cart" className="block text-blue-600 font-medium text-center hover:underline">
            🛒 Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

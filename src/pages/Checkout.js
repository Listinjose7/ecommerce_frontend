import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API } from '../api/api';  // ✅ if your api.js is inside src/api/

import { clearCart } from '../redux/actions/cartActions';
import { useNavigate } from 'react-router-dom';

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
        cartItems: cartItems
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
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📦 Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="max-w-lg bg-white shadow p-6 rounded space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={customer.name}
          onChange={handleChange}
          className="border w-full p-3 rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={customer.phone}
          onChange={handleChange}
          className="border w-full p-3 rounded"
        />
        <textarea
          name="address"
          placeholder="Address"
          value={customer.address}
          onChange={handleChange}
          className="border w-full p-3 rounded h-28"
        ></textarea>

        <button type="submit" className="bg-green-600 text-white w-full py-3 rounded text-lg hover:bg-green-700">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;

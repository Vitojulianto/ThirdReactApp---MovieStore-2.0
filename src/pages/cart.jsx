import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

import 'react-toastify/dist/ReactToastify.css';

function Cart() {
    const navigate = useNavigate()
  const { cart, removeFromCart, clearCart, totalItems, totalPrice } = useContext(CartContext);
  const handleBuy = () => {
    navigate('/anime')
  }

  const handleCheckout = () => {
    navigate('/checkout')
  }
 

  

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-center">
        <h1 className="text-3xl font-bold text-pink-600 mb-4">Your cart is empty 😢</h1>
        <p className="text-gray-700">Go add some awesome anime movies!</p>
        <Button onClick={handleBuy} className='btn btn-sm btn-primary mt-4'>To Anime</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-xl">
        <h1 className="text-3xl font-extrabold text-center text-pink-600 mb-6">🛒 Your Cart</h1>
        
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-between bg-purple-50 border border-purple-200 p-4 rounded-lg shadow"
            >
              <div className="flex items-center gap-4">
                {item.img && (
                  <img src={item.img} alt={item.img} className="w-24 h-24 rounded-md object-cover" />
                )}
                <div>
                  <h2 className="text-xl font-bold text-purple-700">{item.name}</h2>
                  <p className="text-sm text-gray-600">Price: Rp.{item.price.toLocaleString('id-ID')}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item)}
                className="mt-4 md:mt-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 text-right ">
          <h2 className="text-lg font-medium text-gray-800">Total Items: <span className="text-pink-600">{totalItems}</span></h2>
          <h2 className="text-lg font-medium text-gray-800">Subtotal: <span className="text-pink-600">Rp.{totalPrice.toLocaleString('id-ID')}</span></h2>
          <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">

  <Button 
    onClick={handleBuy} 
    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded shadow w-full md:w-auto"
  >
    Back to Anime
  </Button>

  <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
    <Button 
      onClick={clearCart} 
      className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded shadow w-full md:w-auto"
    >
      Clear Cart
    </Button>
    <Button 
      onClick={handleCheckout} 
      className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded shadow w-full md:w-auto"
    >
      Checkout
    </Button>
  </div>
  
</div>

          
        </div>
      </div>
    </div>
  );
}

export default Cart;

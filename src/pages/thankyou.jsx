import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { CartContext } from '../contexts/CartContext';

function ThankYou() {
    const {clearCart} = useContext(CartContext)
  const navigate = useNavigate();

  const handleBackHome = () => {
    clearCart()
    navigate('/anime');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 text-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
        <h1 className="text-4xl font-extrabold text-green-600 mb-4">🎉 Thank You!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Your order has been confirmed. We hope you enjoy your anime experience!
        </p>
        <img
          src="https://gifdb.com/images/high/kobayashi-thank-you-anime-blush-maid-outfit-be0tilsti92t7g49.gif"
          alt="thank you"
          className="mx-auto mb-6 rounded-lg shadow-lg w-64"
        />
        <Button
          onClick={handleBackHome}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md shadow"
        >
          Back to Anime
        </Button>
      </div>
    </div>
  );
}

export default ThankYou;

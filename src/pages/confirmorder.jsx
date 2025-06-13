import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Navbar from '../Fragments/Navbar';

function ConfirmOrder() {
  const [buyer, setBuyer] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const savedData = localStorage.getItem('buyerInfo');
    if (savedData) {
      setBuyer(JSON.parse(savedData));
    }
  }, []);

  const handleGoBack = () => {
    navigate("/checkout");
  }

  const handleNext = () => {
    navigate("/thankyou");
  }

  if (!buyer) return <div className="text-center mt-10 text-xl text-pink-500">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-lg text-black">
        <h1 className="text-3xl font-bold text-pink-600 mb-4">🎉 Order Confirmed!</h1>
        <div className="space-y-3 text-lg">
          <p>
            <span className="font-semibold text-purple-700">Name:</span> {buyer.fullName}
          </p>
          <p>
            <span className="font-semibold text-purple-700">Email:</span> {buyer.email}
          </p>
          <p>
            <span className="font-semibold text-purple-700">Address:</span> {buyer.address}
          </p>
          <p>
            <span className="font-semibold text-purple-700">Payment Method:</span> {buyer.payment}
          </p>

          <div className='flex justify-end gap-4'>
            <Button
              className='mt-6 px-4 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg text-lg font-semibold'
              onClick={handleGoBack}
            >
              Go Back
            </Button>
            <Button
              className='mt-6 px-4 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg text-lg font-semibold'
              onClick={handleNext}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmOrder;

// /pages/CheckoutPage.jsx
import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
    const {cart, totalPrice} = useContext(CartContext);
    const navigate = useNavigate();
    const { register, handleSubmit , formState:{errors} } = useForm();

    const onSubmit = (data) => {
        localStorage.setItem('buyerInfo', JSON.stringify(data));
        navigate('/confirmorder');
    }
   
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-pink-600">Checkout</h1>

      {/* Ringkasan Item */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 text-purple-700">Your Items</h2>
        <div className="space-y-4">
        {cart.map((item) => (
        <div
         key={item.id}
            className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm"
        >
        <div className="flex items-center gap-4">
          {item.img && (
            <img
              src={item.img}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-md"
            />
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {item.name}
            </h3>
            <p className="text-sm text-gray-600">
              Price: Rp. {item.price.toLocaleString('id-ID')}
            </p>
            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
          </div>
        </div>
        <div className="text-right font-semibold text-pink-600">
          Rp. {(item.price * item.quantity).toLocaleString('id-ID')}
        </div>
      </div>
    ))}
  </div>

  {/* Total */}
  <div className="text-right font-bold text-xl text-pink-700 mt-6 border-t pt-4">
    Total: Rp {totalPrice.toLocaleString('id-ID')}
  </div>
</div>

      {/* Form Pembeli */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
  <h2 className="text-xl font-semibold mb-4 text-purple-700">Buyer Info</h2>
  
  <input
    className="w-full border p-2 mb-2 rounded"
    placeholder="Full Name"
    {...register("fullName", { required: "Full Name is required" })}
  />
  {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}

  <input
    className="w-full border p-2 mb-2 rounded"
    placeholder="Email"
    type="email"
    {...register("email", { required: "Email is required" })}
  />
  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

  <textarea
    className="w-full border p-2 mb-2 rounded"
    placeholder="Shipping Address"
    {...register("address", { required: "Address is required" })}
  />
  {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}

  <h2 className="text-xl font-semibold mt-6 mb-2 text-purple-700">Payment Method</h2>
  <div className="space-y-2 text-black">
    <label className="flex items-center">
      <input type="radio" value="Bank Transfer" {...register("payment", { required: true })} className="mr-2" />
      Transfer Bank
    </label>
    <label className="flex items-center">
      <input type="radio" value="E-Wallet" {...register("payment")} className="mr-2" />
      E-Wallet (OVO, DANA)
    </label>
    <label className="flex items-center">
      <input type="radio" value="COD" {...register("payment")} className="mr-2" />
      COD (Cash on Delivery)
    </label>
    {errors.payment && <p className="text-red-500 text-sm">Select a payment method</p>}
  </div>

  <button type="submit" className="mt-6 w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg text-lg font-semibold">
    Confirm Order
  </button>
</form>
</div>
  );
}

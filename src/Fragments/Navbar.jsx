import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext.jsx';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';
import Button from '../components/Button.jsx';
function Navbar() {
    const {cart, totalItems, totalPrice} = useContext(CartContext)
    const navigate = useNavigate()
    const {user, Login, Logout} = useContext(AuthContext)
    const handleView = () => {
        navigate('/cart')
    }
  return (
    <div className="navbar bg-gradient-to-r from-pink-200 via-rose-100 to-violet-200 shadow-md px-4">
  
  <div className="flex-none">
    <Link to="/" className="text-2xl font-bold text-pink-600 hover:text-pink-800 transition">
      🌸 AnimeStore
    </Link>
  </div>

  
  <div className="hidden lg:flex flex-1 justify-center items-center">
    <ul className="menu menu-horizontal px-1 gap-6 text-md font-medium">
      <li><Link to="/home" className="text-black hover:text-pink-600 transition">Home</Link></li>
      <li><Link to="/anime" className="text-black hover:text-pink-600 transition">Anime</Link></li>
      
    </ul>
  </div>

  
  <div className="flex flex-row items-center gap-2 ml-auto">
  
  <div className="dropdown dropdown-end lg:hidden">
    <label tabIndex={0} className="btn btn-ghost btn-circle">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
        viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </label>
    <ul tabIndex={0} className="menu dropdown-content mt-3 p-2 shadow bg-white rounded-box w-44 z-[999]">
      <li><Link to="/home" className='text-black'>Home</Link></li>
      <li><Link to="/anime" className='text-black'>Anime</Link></li>
      
    </ul>
  </div>

  
  <div className="dropdown dropdown-end">
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle relative">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none"
        viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2.293 2.293c-.63.63-.184 
          1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 
          2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <span className="badge badge-sm bg-pink-500 text-white absolute -top-1 -right-1">{totalItems}</span>
    </div>
    <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-56 bg-white shadow-xl rounded-xl z-[999]">
      <div className="card-body">
        <span className="text-lg font-bold text-black">{totalItems} Items</span>
        <span className="text-sm text-pink-600">Subtotal:Rp.{totalPrice.toLocaleString('id-ID')}</span>
        <div className="card-actions">
          <button className="btn btn-sm btn-primary w-full"
          onClick={handleView}>View Cart</button>
        </div>
      </div>
    </div>
  </div>

  
  <div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
    <div className="w-10 rounded-full ring ring-pink-400 ring-offset-2">
      <img
        alt="User Avatar"
        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
      />
    </div>
  </div>

  <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52 z-[999]">
    {user ? (
      <>
        <li><span className="font-semibold text-pink-600 px-2">Hello, {user.name} 👋</span></li>
        <li><Button onClick={Logout} className="text-left border border-red-500 px-3 py-1 rounded hover:bg-red-100 transition">Logout</Button></li>
      </>
    ) : (
      <li>
        <Link to="/login" className="text-left">Login</Link>
      </li>
    )}
  </ul>
</div>
</div>
</div>

  );
}

export default Navbar;

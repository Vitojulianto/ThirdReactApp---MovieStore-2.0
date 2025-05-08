import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function LoginPage() {
  const { Login } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    const savedUser = JSON.parse(localStorage.getItem('newUser'));

    if (!savedUser) {
      alert('User not found. Please register first.');
      return;
    }

    if (data.username === savedUser.username && data.password === savedUser.password) {
      // Simpan ke localStorage sebagai login session
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('user', JSON.stringify(savedUser));
      Login(data.username)
      navigate('/home');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-4">🌸 Anime Login 🌸</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-black">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-pink-600 hover:underline font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

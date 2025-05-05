import { createBrowserRouter } from 'react-router-dom'
import App from './App'


import Hero from './pages/hero'
import AnimeDesc from './Fragments/AnimeDesc'
import ProtectedRoute from './pages/ProtectedRoute'
import Anime from './pages/anime'
import Cart from './pages/cart'
import CheckoutPage from './pages/checkout'
import LoginPage from './pages/login'
import ThankYou from './pages/thankyou'
import ConfirmOrder from './pages/confirmorder'
import RegisterPage from './pages/register'
import HomePage from './pages/home'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, 
    children: [
      { path: '/', element: <Hero />},
      { path: '/anime', element: <ProtectedRoute><Anime /></ProtectedRoute> },
      { path: '/anime/:id', element: <ProtectedRoute><AnimeDesc /></ProtectedRoute> },
      { path: '/cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: '/checkout', element: <ProtectedRoute><CheckoutPage /></ProtectedRoute> },
      { path: '/login', element: <LoginPage />},
      { path: '/register', element: <RegisterPage />},
      { path: '/thankyou', element: <ProtectedRoute><ThankYou /></ProtectedRoute> },
      { path: '/confirmorder', element: <ProtectedRoute><ConfirmOrder /></ProtectedRoute> },
      
      
      { path: '/home', element: <ProtectedRoute>< HomePage/></ProtectedRoute> },
    ]
  }
])

import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { Outlet } from 'react-router-dom'


export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        
        <Outlet /> 
        
      </CartProvider>
    </AuthProvider>
  )
}

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast  } from 'react-toastify';
export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cartItems");
        return savedCart ? JSON.parse(savedCart) : [];
      });

      useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cart));
      }, [cart]);

    const addToCart = (anime)=> {
        const exist = cart.find((item)=>item.id===anime.id)
        if(exist){
            setCart(cart.map((item)=>(
                item.id===anime.id? {...exist, quantity: item.quantity + 1} : item
            )))
        }else{
            setCart([...cart, {...anime, quantity:1}])
        }
    }

    const removeFromCart = (anime) => {
        const exist = cart.find((item)=>item.id===anime.id)
        if(exist.quantity === 1){
            setCart(cart.filter((item)=>(item.id !== anime.id)))
        }else{
            setCart(cart.map((item)=>(
                item.id===anime.id? {...exist, quantity: item.quantity - 1} : item
            )))
        }

        toast.error(`Item removed from cart!`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            theme: "colored",
          });
        
        
    }
    const clearCart = () => {
        setCart([])
    }

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice}}>
            {children}
        </CartContext.Provider>
    )
}


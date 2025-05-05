import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const navigate = useNavigate()
    const [user, setUser]  = useState(()=>{
        const saved = localStorage.getItem('user')
        return saved? JSON.parse(saved) : null
    }) 
        
    
    const Login = (username) => {
        setUser ({name: username})
        localStorage.setItem('user', JSON.stringify({name:username}))
    }

    const Logout = () => {
        setUser(null)
        localStorage.removeItem('user')
        navigate('/hero')
    }

    return(
        <AuthContext.Provider value={{user, Login, Logout}}>
            {children}
        </AuthContext.Provider>
    )
}
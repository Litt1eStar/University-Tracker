import { createContext, useContext , useEffect, useState} from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
    const API_URL = import.meta.env.VITE_API_URL
    const [authUser, setAuthUser] = useState(sessionStorage.getItem('token'))
    const [user, setUser] = useState({username: ""})
    
    const getUser = async() => {
        try {
            const res = await fetch(`${API_URL}/api/user/user-info`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${authUser}`
                }
            });
            const data = await res.json();
            if(data.error)
                throw new Error(data.error)
            setUser(data)
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(()=>{
        if(authUser)
            getUser();
    },[authUser])
    return (
        <AuthContext.Provider value={{authUser, setAuthUser, user}}>
            { children }
        </AuthContext.Provider>
    )
}
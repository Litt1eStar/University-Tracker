import { createContext, useContext , useEffect, useState} from "react";

const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(sessionStorage.getItem('token'))
    console.log(authUser);
    
    // const getUser = async() => {
    //     try {
    //         const res = await fetch(`/api/user/getUser`);
    //         const data = await res.json();
    //         if(data.error)
    //             throw new Error(data.error)
    //         setAuthUser(data)
    //     } catch (error) {
    //         toast.error(error.message)
    //     }
    // }
    // console.log(authUser)
    // useEffect(()=>{
    //     getUser();
    // },[])
    return (
        <AuthContext.Provider value={{authUser, setAuthUser}}>
            { children }
        </AuthContext.Provider>
    )
}
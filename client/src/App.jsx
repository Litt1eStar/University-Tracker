import { Box, Stack } from "@mui/material";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import SideBar from './components/SideBar'
import "./App.css";

function App() {  
  const { authUser } = useAuthContext()
  return (
    <>
      <BrowserRouter>
        <Stack width='100%' height='620px' direction='row'>
          {authUser && (<SideBar />)} 
          <Routes>
            <Route path="/" element={authUser ? <Home />: <SignIn />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Stack>
      </BrowserRouter>
    </>
  );
}

export default App;

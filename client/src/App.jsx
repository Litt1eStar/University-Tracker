import { Box } from "@mui/material";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import "./App.css";

function App() {  
  const { authUser } = useAuthContext()
  return (
    <>
      <BrowserRouter>
        <Box width='100%' height='620px'>
          <Routes>
            <Route path="/" element={authUser ? <Home />: <SignIn />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </>
  );
}

export default App;

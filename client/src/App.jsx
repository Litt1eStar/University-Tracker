import { Box, Stack } from "@mui/material";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import SideBar from './components/SideBar'
import YearPage from "./pages/YearPage";
import SemesterPage from "./pages/SemesterPage";
import ClassesPage from "./pages/ClassesPage";
import AssignmentDonePage from "./pages/AssignmentDonePage";

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
            <Route path="/profile" element={authUser ? <Profile /> : <SignIn />} />
            <Route path="/dashboard" element={authUser ? <Dashboard /> : <SignIn />} />
            <Route path="/year/:year_id/:year_val" element={authUser ? <YearPage /> : <SignIn />} />
            <Route path="/semester/:semester_id/:semester_val" element={authUser ? <SemesterPage /> : <SignIn/> } />
            <Route path="/class/:class_id" element={authUser ? <ClassesPage /> :  <SignIn />} />
            <Route path="/assignment/done/:class_id" element={authUser ? <AssignmentDonePage /> : <SignIn />} />
          </Routes>
        </Stack>
      </BrowserRouter>
    </>
  );
}

export default App;

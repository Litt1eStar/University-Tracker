import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

import { Button, Stack, TextField, Typography } from "@mui/material";

const SignUp = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()
  const { setAuthUser } = useAuthContext()

  const initialForm = {
    username: "",
    password: "",
    confirmPassword: "",
  }
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API_URL}/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Successfully Create User");
        const data = await res.json();
        setAuthUser(data)
        sessionStorage.setItem("token", data)
        setForm(initialForm)
        navigate('/')
      }else{
        setForm(initialForm)
        throw new Error('Failed to Create User')
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <>
      <Stack width="50%" mx={"auto"} mt={5}>
        <Typography mx={'auto'} mb={5} variant="h4">
          Signup
        </Typography>
        <TextField
          id="username"
          label="Username"
          size="small"
          value={form.username}
          sx={{ mb: 2, width: "70%", mx: "auto" }}
          onChange={(e) => handleChange(e)}
        />
        <TextField
          id="password"
          label="Password"
          size="small"
          value={form.password}
          sx={{ mb: 2, width: "70%", mx: "auto" }}
          type="password"
          onChange={(e) => handleChange(e)}
        />
        <TextField
          id="confirmPassword"
          label="Confirm Password"
          size="small"
          value={form.confirmPassword}
          sx={{ mb: 2, width: "70%", mx: "auto" }}
          type="password"
          onChange={(e) => handleChange(e)}
        />
        <Button sx={{ width: "20%", mx: "auto", mb: 1 }} onClick={(e)=>handleSubmit(e)}>
          Submit
        </Button>
        <Typography fontSize={10} mx={'auto'}>
          Already Have Account?{" "}
          <Typography fontSize={12} display={"inline"} color={"red"} onClick={()=>navigate('/signin')}>
            Signin
          </Typography>{" "}
        </Typography>
      </Stack>
    </>
  );
};

export default SignUp;

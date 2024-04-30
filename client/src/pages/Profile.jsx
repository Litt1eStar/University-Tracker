import React from "react";
import { Card, CardContent, CardHeader, Stack, Avatar, Typography, Button } from "@mui/material";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
const Profile = () => {
  const { user, setAuthUser } = useAuthContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    toast.success("Succesfully Logout");
    setAuthUser(null);
    navigate("/signin");
  };

  return (
    <>
      <Stack width={'50%'} height={'100%'} mx={'auto'}>
        <Card variant="outlined" sx={{ height: '80%', width: '80%', mt: 2 ,mx: 'auto'}}>
          <CardHeader title='Profile' sx={{ px: '40%'}} />
          <CardContent>
            <Stack justifyContent={'center'} alignItems={'center'} gap={3}>
              <Avatar src={`https://avatar.iran.liara.run/public/boy?username=${user.username}`} sx={{ width: 100, height: 100}} />
              <Typography>Hi👋 {user.username}, You're doing great😁</Typography>
              <Button
                color="warning"
                variant="text"
                sx={{ width: "80%", height: "30px", mx: "auto" }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </>
  )
};

export default Profile;

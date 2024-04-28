import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, Icon, Box } from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <Stack direction="row" width={isOpen ? "6%" : 0} mr={isOpen ? 1 : 5}>
        <Stack
          width={isOpen ? "98%" : 0}
          gap={2}
          pt={1}
          color="gray"
          sx={{ transition: "width 0.3s ease-in-out" }}
        >
          <Icon
            sx={{ mx: "auto", cursor: "pointer" }}
            color="inherit"
            onClick={toggleSidebar}
          >
            {isOpen ? <MenuOpenIcon /> : <CloseIcon />}{" "}
          </Icon>
          {isOpen && (
            <>
              <Typography
                color="black"
                fontWeight={500}
                sx={{ mx: "auto", cursor: isOpen ? "pointer" : "default" }}
                onClick={() => navigate("/profile")}
              >
                Woody
              </Typography>
              <Icon
                sx={{ mx: "auto", cursor: isOpen ? "pointer" : "default" }}
                onClick={() => navigate("/")}
              >
                <HomeIcon />
              </Icon>
              <Icon
                sx={{ mx: "auto", cursor: isOpen ? "pointer" : "default" }}
                onClick={() => navigate("/dashboard")}
              >
                <DashboardIcon />
              </Icon>
            </>
          )}
        </Stack>
        <Box bgcolor="gray" height="100%" width="2%" />
        {!isOpen && (
          <Box
            position="fixed"
            top={0}
            left={isOpen ? "7%" : 0}
            bgcolor="white"
            p={1}
            zIndex={1000}
          >
            <Icon
              sx={{ cursor: "pointer" }}
              color="inherit"
              onClick={toggleSidebar}
            >
              <KeyboardArrowRightIcon />
            </Icon>
          </Box>
        )}
      </Stack>
    </>
  );
};

export default SideBar;

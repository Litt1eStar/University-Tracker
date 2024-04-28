import React from "react";
import { Card, CardHeader, CardActions, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom'
import LaunchIcon from "@mui/icons-material/Launch";

const SemesterCard = ({ item, currentYear }) => {
const navigate = useNavigate()

  const handleOpen = () => {
    navigate(`/semester/${item._id}/${item.semester}`)
  };

  return (
    <>
      <Card sx={{ width: 300, height: 200 }}>
        <CardHeader title={`Year ${currentYear}, Semester ${item.semester}`} />
        <CardActions>
          <Button sx={{ mx: "auto", mt: 10 }} onClick={handleOpen}>
            <LaunchIcon />
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default SemesterCard;

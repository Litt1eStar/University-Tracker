import React from "react";
import { Card, CardHeader, CardActions, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom'
import LaunchIcon from "@mui/icons-material/Launch";

const YearCard = ({ item }) => {
    const navigate = useNavigate()

  const handleOpen = () => {
    navigate(`/year/${item._id}`)
  };

  return (
    <>
      <Card sx={{ width: 200, height: 200 }}>
        <CardHeader title={`Year ${item.year}`} />
        <CardActions>
          <Button sx={{ mx: "auto", mt: 10 }} onClick={handleOpen}>
            <LaunchIcon />
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default YearCard;

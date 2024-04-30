import React from "react";
import { Card, Stack, Typography, Button } from "@mui/material";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
const AssignmentCard = ({ item, fetchData, updateScore, updateClassScore }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { authUser } = useAuthContext();


  const calculateDayLeft = (date) => {
    const parts = date.split("/");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10); // Adjust month to zero-based index
    const year = parseInt(parts[2], 10);

    const targetDate = new Date(year, month, day);
    const currentDate = new Date();

    const differenceMs = targetDate - currentDate;
    const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

    return differenceDays;
  };

    
  const dayLeft = calculateDayLeft(item.duedate);
  const dayLeftTxt = item.status ? '-' : dayLeft;

  const handleDone = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/assignment/update/status/${item._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authUser}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to update status");
      }
      toast.success("Nice one bro :3");
      await updateScore(item.score_value);
      await updateClassScore();
      await fetchData();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Card sx={{ height: 80, width: "100%", mb: 2 }}>
        <Stack height={"100%"} direction="column">
          <Stack
            width={"100%"}
            height={"50%"}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            pl={1}
          >
            <Typography fontSize={item.name.length > 35 ? 20 : 25}>
              {item.name}
            </Typography>
            <Typography fontSize={20} mr={2} ml={3}>
              Days Left: {dayLeftTxt}
            </Typography>
          </Stack>

          <Stack
            width={"100%"}
            height={"50%"}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            pl={1}
          >
            <Typography fontSize={15}>
              Due Date: {item.duedate} |{" "}
              <Typography display={"inline"} fontWeight={400}>
                Score: {item.score_value}
              </Typography>
            </Typography>
            <Stack
              height={"100%"}
              width={"23%"}
              direction={"row"}
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                fontSize={15}
                color={item.status ? "green" : "darkgoldenrod"}
                fontWeight={500}
              >
                {item.status ? "Complete" : "Ongoing"}
              </Typography>
              {!item.status && (
                <Button
                  variant="contained"
                  sx={{ mr: 2, height: 30, ":hover": { color: "lightblue" } }}
                  onClick={handleDone}
                >
                  Done
                </Button>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </>
  );
};

export default AssignmentCard;

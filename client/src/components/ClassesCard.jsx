import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Stack, Typography, Button, Icon, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";
import toast from "react-hot-toast";
const ClassesCard = ({ item, authUser, fetchData }) => {
  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL;
  const priorityColor = () => {
    let color;
    switch(item.priority){
      case 'high':
        color = 'green'
        break
      case 'mid':
        color = 'gray'
        break
      case 'low':
        color = 'red'
        break
      default:
        break
    }

    return color
  }
  
  const handleDelete = async() => {
    try {
      const res = await fetch(`${API_URL}/api/classes/${item._id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${authUser}`
        }
      })
      if(!res.ok){
        throw new Error('Failed to deleted Class')
      }
      fetchData()
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <Card sx={{width: 1070, height: 100 }}>
        <Stack direction={"row"}>
          <Stack width="70%" height={100} alignItems="flex-start" pl={1}>
            <Typography fontSize={30}>
              {item.class_name}
            </Typography>
            <Typography>Lecturer: {item.lecturer}</Typography>
            <Box mt={2} width='60%' height={5} bgcolor={priorityColor(item.priority)}/>
          </Stack>
          <Stack width="30%" height={100} alignItems="flex-end" pt={2}>
            <Button color="inherit" onClick={handleDelete}>
              <DeleteIcon />
            </Button>
            <Button color="inherit" onClick={()=>navigate(`/class/${item._id}`)}>
              <LaunchIcon />
            </Button>
          </Stack>
        </Stack>
      </Card>
    </>
  );
};

export default ClassesCard;

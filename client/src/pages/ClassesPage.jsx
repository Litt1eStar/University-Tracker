import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from '../context/AuthContext'
import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import AssignmentCard from "../components/AssignmentCard";
import LaunchIcon from "@mui/icons-material/Launch";
import toast from "react-hot-toast";
const ClassesPage = () => {
  const { class_id } = useParams();
  const { authUser } = useAuthContext()
  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL

  const [assignment_name, setAssignmentName] = useState("");
  const [score, setScore] = useState("");
  const [duedate, setDuedate] = useState("");
  const [data, setData] = useState([])

  const handleAdd = async() => {
    try {
      const res = await fetch(`${API_URL}/api/assignment/create/${class_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authUser}`
        },
        body: JSON.stringify({
          name: assignment_name,
          duedate: formattedDate(duedate),
          score_value: score
        })
      })
      if(!res.ok){
        throw new Error('Failed to create new assignment')
      }
      await fetchData()
      setAssignmentName("")
      setScore("")
      setDuedate("")
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchData = async() => {
    try {
      const res = await fetch(`${API_URL}/api/assignment/getAll/${class_id}`,{
        method: "GET",
        headers: {
          "Authorization": `Bearer ${authUser}`
        }
      })
      if(!res.ok){
        throw new Error(`Failed to get data from db`)
      }
      const data = await res.json()
      setData(data)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const formattedDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  useEffect(()=>{
    fetchData()
  }, [])

  return (
    <>
      <Stack width={"100%"} direction="row">
        <Stack width={"65%"} height={"100%"}>
          <div style={{ height: "100%", overflowY: "auto" }}>
            {/* Assignment Card */}
            {data?.map(item => (
              <AssignmentCard item={item} />
            ))}
            {/* Assignment Card */}
          </div>
        </Stack>
        <Stack width={"35%"} height={"100%"}>
          {/* Input Box */}
          <Stack
            width={"95%"}
            height={"30%"}
            gap={1}
            alignItems={"center"}
            pt={1}
            border={"1px solid"}
            borderRadius={2}
            mx={"auto"}
          >
            <TextField
              size="small"
              value={assignment_name}
              label="Assignment Name"
              sx={{ width: "90%" }}
              onChange={(e) => setAssignmentName(e.target.value)}
            />
            <TextField
              size="small"
              value={score}
              label="Score"
              type="number"
              sx={{ width: "90%" }}
              onChange={(e) => setScore(e.target.value)}
            />
            <TextField
              size="small"
              value={duedate}
              type="date"
              sx={{ width: "90%" }}
              onChange={(e) => setDuedate(e.target.value)}
            />
            <Button onClick={handleAdd} >Add new assignment</Button>
          </Stack>
          {/* Input Box */}

          {/* Data Box */}
          <Stack
            width={"95%"}
            height={"22%"}
            border={"1px solid"}
            borderRadius={2}
            mt={1}
            pt={1}
            mx="auto"
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
          >
            <Typography mx={1} fontSize={15} color={"GrayText"}>
              Score: 0/100
            </Typography>
            <Typography mx={1} fontSize={15} color={"GrayText"}>
              Assignment Done: 0
            </Typography>
            <Typography mx={1} fontSize={15} color={"GrayText"} mb={1}>
              Assignemnt Ongoing: 3
            </Typography>
            <Card
              variant="outlined"
              sx={{
                width: "95%",
                height: 40,
                mx: 1,
              }}
            >
              <Stack
                direction="row"
                justifyContent={"space-between"}
                alignItems={"center"}
                pt={0.5}
              >
                <Typography ml={1}>Open Assignment(Done)</Typography>
                <Box
                  width={30}
                  sx={{
                    cursor: "pointer",
                    ":hover": {
                      color: "primary.main",
                    },
                  }}
                  onClick={()=>navigate(`/assignment/done/${class_id}`)}
                >
                  <LaunchIcon />
                </Box>
              </Stack>
            </Card>
          </Stack>
          {/* Data Box */}
        </Stack>
      </Stack>
    </>
  );
};

export default ClassesPage;

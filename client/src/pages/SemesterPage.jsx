import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  Modal,
  TextField,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useAuthContext } from "../context/AuthContext";
import ClassesCard from "../components/ClassesCard";
import toast from "react-hot-toast";

const SemesterPage = () => {
  const { semester_id, semester_val } = useParams();
  const [classname, setClassname] = useState("");
  const [lecturer, setLecturer] = useState("");
  const [priority, setPriority] = useState("");
  const [data, setData] = useState([]) //Data for visualize on web page

  const API_URL = import.meta.env.VITE_API_URL
  const { authUser } = useAuthContext()

  const handleClick = async() => {
    try {
      const res = await fetch(`${API_URL}/api/classes/create/${semester_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authUser}`
        },
        body: JSON.stringify({
          class_name: classname,
          lecturer,
          priority
        })
      })
      const data = await res.json()
      if(!res.ok){
        throw new Error('Failed to Create new Class')
      }
      await fetchData()
      setClassname("")
      setLecturer("")
      setPriority("")
      toast.success('Successfully Create New Class')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/api/classes/all/${semester_id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${authUser}`
        }
      })
      const data = await res.json()
      if(!res.ok){
        throw new Error('Failed to fetch data from db')
      }
      setData(data)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchData()
  }, [])
  return (
    <>
      <div
        style={{ maxHeight: "calc(100vh - 20px)", overflow: "auto" }}
        onClick={() => setOpen(true)}
      >
        <Stack width={1100} p={1}>
          <Stack direction="row" height={60}>
            <Button sx={{ width: "30%", ml: "10%" }} variant="outlined" onClick={handleClick}>
              Add New Class
            </Button>
            <Stack direction="column" width={300} mr={1}>
              <input
                value={classname}
                placeholder="Class Name"
                style={{ height: "50%" }}
                onChange={(e) => setClassname(e.target.value)}
              />
              <input
                value={lecturer}
                placeholder="Lecturer Name"
                style={{ height: "50%" }}
                onChange={(e)=>setLecturer(e.target.value)}
              />
            </Stack>
            <FormControl>
              <FormLabel sx={{ fontSize: 15 }}>Priority</FormLabel>
              <RadioGroup
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                sx={{ height: 60 }}
              >
                <FormControlLabel
                  value="high"
                  control={<Radio />}
                  label="High"
                />
                <FormControlLabel value="mid" control={<Radio />} label="Mid" />
                <FormControlLabel value="low" control={<Radio />} label="Low" />
              </RadioGroup>
            </FormControl>
          </Stack>

          <Stack mt={2} spacing={2}>
            {data?.map(item => (
              <ClassesCard item={item} authUser={authUser} fetchData={fetchData} />
            ))}
          </Stack>
        </Stack>
      </div>
    </>
  );
};

export default SemesterPage;

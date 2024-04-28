import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import {
  Stack,
  Button,
  Modal,
  Card,
  Typography,
  TextField,
  Box
} from "@mui/material";
import toast from "react-hot-toast";
import SemesterCard from "../components/SemesterCard";

const YearPage = () => {
  const { year_id, year_val } = useParams();
  const API_URL = import.meta.env.VITE_API_URL
  const { authUser } = useAuthContext()

  const [open, setOpen] = useState(false);
  const [semester, setSemester] = useState(null);
  const [data, setData] = useState([])
  const handleInsert = async() => {
    try {
        const res = await fetch(`${API_URL}/api/semester/create/${year_id}/${semester}`,{
            method: "POST",
            headers:{
                "Authorization": `Bearer ${authUser}`
            }
        })
        if(!res.ok){
            throw new Error('Failed to create new Semester')
        }
        await fetchData()
        setSemester(null)
        setOpen(false)
    } catch (error) {
        toast.error(error.message)
    }
  };
  console.log(semester);
  
  const fetchData = async() => {
    try {
        const res = await fetch(`${API_URL}/api/semester/all/${year_id}`, {
            method: "GET",
            headers:{
                "Authorization": `Bearer ${authUser}`
            }
        })
        if(!res.ok){
            throw new Error('Failed to get all Semester')
        }
        const data = await res.json()
        setData(data)
    } catch (error) {
        toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchData()
  }, [])

  console.log(data);
  
  return (
    <>
      <Stack width="100%">
        <Stack>
          <Button
            variant="contained"
            color="info"
            sx={{ color: "white", width: "12%", mx: "auto" }}
            onClick={() => setOpen(true)}
          >
            Add Semester
          </Button>
        </Stack>

        <Stack
          height="100%"
          direction="row"
          p={2}
          gap={3.5}
          flexWrap="wrap"
        >
            {data?.map(item => (
                <SemesterCard item={item} currentYear={year_val} />
            ))}
        </Stack>
      </Stack>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={{ width: "15%", height: "20%", mx: "auto", mt: 25 }}>
          <Stack pt={1}>
            <Typography mx="auto">Which Semseter?</Typography>
            <TextField
              value={semester}
              label="Semester"
              size="small"
              sx={{ mt: 1, width: "80%", mx: "auto" }}
              onChange={(e) => setSemester(e.target.value)}
            />
            <Button sx={{ width: "30%", mx: "auto" }} onClick={handleInsert}>
              Done
            </Button>
          </Stack>
        </Card>
      </Modal>
    </>
  );
};

export default YearPage;

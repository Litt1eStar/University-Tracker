import {
  Stack,
  Card,
  CardHeader,
  CardActions,
  Button,
  Modal,
  Box,
  Typography,
  TextField,
} from "@mui/material";

import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import YearCard from "../components/YearCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Home = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [year, setYear] = useState(null);
  const { authUser } = useAuthContext();
  const API_URL = import.meta.env.VITE_API_URL;


  const handleInsert = async () => {
    try {
      const res = await fetch(`${API_URL}/api/university_year/create/${year}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authUser}`,
        },
      });
      if (!res.ok) throw new Error("Failed to create New Item");
      await fetchData();
      setYear(null);
      setOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/api/university_year/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authUser}`,
        },
      });
      if (!res.ok) throw new Error("Failed to Get Item From Database");
      const data = await res.json();
      setData(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Stack width="100%">
        <Stack>
          <Button
            variant="contained"
            color="info"
            sx={{ color: "white", width: "10%", mx: "auto" }}
            onClick={() => setOpen(true)}
          >
            Add Year
          </Button>
        </Stack>

        <Stack height="100%" direction="row" p={2} gap={3.5} flexWrap='wrap'>
          {data?.map((item) => (
            <YearCard key={item._id} item={item}/>
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
            <Typography mx="auto">Which Year?</Typography>
            <TextField
              value={year}
              label="Year"
              size="small"
              sx={{ mt: 1, width: "80%", mx: "auto" }}
              onChange={(e) => setYear(e.target.value)}
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

export default Home;

import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AssignmentCard from "../components/AssignmentCard";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
const AssignmentDonePage = () => {
  const { class_id } = useParams();
  const [data, setData] = useState([]);
  const { authUser } = useAuthContext();

  const API_URL = import.meta.env.VITE_API_URL;

  const filterdData = data?.filter((data) => data.status === true);
  console.log(filterdData);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/api/assignment/getAll/${class_id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authUser}`,
        },
      });
      if (!res.ok) {
        throw new Error(`Failed to get data from db`);
      }
      const data = await res.json();
      setData(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div style={{ height: "100%", overflowY: "auto" }}>
        <Stack>
          {filterdData?.map((item) => (
            <AssignmentCard item={item} />
          ))}
        </Stack>
      </div>
    </>
  );
};

export default AssignmentDonePage;

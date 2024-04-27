import { useState } from "react";
import { Box, Button } from "@mui/material";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchData = async () => {
    const res = await fetch(`${apiUrl}/api/university_year`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Mjc1NGY5YTBlNDZhNzVkYmJmMGE2MiIsInVzZXJuYW1lIjoidXNlcjAzIiwiaWF0IjoxNzE0MTkwNjkyfQ.Gj_xe5KawMw6GlvGF6-D6A15ersJEHYzYeABQuzDyfY`,
      },
    });
    const data = await res.json();
    setData(data);    
  };

  return (
    <>
      <Button onClick={fetchData}>Click Me!! Now</Button>
      <Box>
        {data?.map((item) => (
          <Box>{item.year}</Box>
        ))}
      </Box>
    </>
  );
}

export default App;

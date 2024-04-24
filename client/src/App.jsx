import { useState } from "react";
import { Box, Button } from "@mui/material";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await fetch("/api/university_year", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Mjc1NGY5YTBlNDZhNzVkYmJmMGE2MiIsInVzZXJuYW1lIjoidXNlcjAzIiwiaWF0IjoxNzEzODU1NDg0fQ.2iAu-_vZLHMcoikYyKCuQHiwAvbeSuALNFlcP9YrLQo`,
      },
    });
    const data = await res.json();
    setData(data);
  };

  return (
    <>
      <Button onClick={fetchData}>Click Me!!</Button>
      <Box>
        {data?.map((item) => (
          <Box>{item.year}</Box>
        ))}
      </Box>
    </>
  );
}

export default App;

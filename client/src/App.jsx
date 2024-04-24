import { useState } from 'react'
import { Box } from '@mui/material'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Box>
        This is new Message
      </Box>
    </>
  )
}

export default App

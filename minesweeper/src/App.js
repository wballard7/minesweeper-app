import React from 'react';
import { Box, Container } from "@chakra-ui/react"
import './App.css';
import Minefield from './minefield';


function App() {
  return (
    <Box>
      <div className="App">
        <header className="page title">
          <h1>Welcome to Minesweeper</h1>
        </header>
        <Container maxW='md' bg='blue.600' color='white'>
          <Minefield/>
        </Container>
      </div>
    </Box>

  );
}

export default App;

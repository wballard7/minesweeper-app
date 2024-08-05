import React from 'react';
import { Center, Heading, Container } from "@chakra-ui/react"
import './App.css';
import Minefield from './minefield';


function App() {
  return (
    <Center>
      <div className="App">
        <Heading mb={4} as='h2' size='3xl' noOfLines={1}>
           Welcome to Minesweeper
        </Heading>
        <Container maxW='2000px' bgPos='center'  bgRepeat="no-repeat" bgImage="url(https://w.wallhaven.cc/full/o5/wallhaven-o5woxm.png)"  p={4} color='white'>
            <Minefield/>
        </Container>
      </div>
    </Center>

  );
}

export default App;

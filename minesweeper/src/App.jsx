import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Center, Heading, Container } from "@chakra-ui/react"
import './App.css';
import Login from './Login';
import Minefield from './minefield';


function App() {
  // const [user, setUser] = useState(null);
  // const navigate = useNavigate();

  // const handleLogin = (name) => {
  //   setUser(name);
  //   navigate('/home');
  // };

  return (
    <Center>
      <div className="App">
        <Heading mb={4} as='h2' size='3xl' noOfLines={1}>
           Welcome to Minesweeper
        </Heading>
        {/* <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/home" element={user ? <Minefield user={user} /> : <Login onLogin={handleLogin} />} />
        </Routes> */}
        <Container maxW='2000px' bgPos='center'  bgRepeat="no-repeat" bgImage="url(https://w.wallhaven.cc/full/o5/wallhaven-o5woxm.png)"  p={4} color='white'>
            <Minefield/>
        </Container>
      </div>
    </Center>

  );
}

export default App;

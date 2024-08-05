import React, { useState } from 'react';
import { Box, Grid, Button, GridItem, Center, Alert, AlertIcon, AlertTitle, AlertDescription, } from '@chakra-ui/react';
import Timer from './Timer';

const createBoard = (hardMode) => {
    const rows = hardMode ? 20 : 10;
    const cols = hardMode ? 20 : 10;
    const board = Array.from({ length: rows }, () => 
        Array.from({ length: cols }, () => ({ clicked: false, adjacentMines: 0 }))
    );
    const minePositions = [];
    let minesPlaced = 0;
    const totalMines = hardMode ? 20 : 10;
    while (minesPlaced < totalMines) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);
        if (!minePositions.some(pos => pos[0] === row && pos[1] === col)) {
            minePositions.push([row, col]);
            minesPlaced++;
        }
    }
    return { board, minePositions };
};

const Minefield = () => {
    const [hardMode, setHardMode] = useState(false);
    const [gameState, setGameState] = useState(() => createBoard(false));
    const [isGameOver, setIsGameOver] = useState(false);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [resetTimer, setResetTimer] = useState(false);

    const resetGame = () => {
        setHardMode(false);
        setGameState(createBoard(false));
        setIsGameOver(false);
        setIsTimerActive(false);
        setResetTimer(true);
    };

    const goHard = () => {
        setHardMode(true);
        setGameState(createBoard(true));
        setIsGameOver(false);
        setIsTimerActive(false);
        setResetTimer(true);
    };

    const countAdjacentMines = (row, col, minePositions) => {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                const newRow = row + i;
                const newCol = col + j;
                if (newRow >= 0 && newRow < gameState.board.length && newCol >= 0 && newCol < gameState.board[0].length) {
                    if (minePositions.some(pos => pos[0] === newRow && pos[1] === newCol)) {
                        count++;
                    }
                }
            }
        }
        return count;
    };

    const handleClick = (row, col) => {
        if (isGameOver) return; // No action if game is over

        if (!isTimerActive) {
            setIsTimerActive(true);
            setResetTimer(false);
        }

        setGameState(prevState => {
            const newBoard = prevState.board.map((r, rowIndex) =>
                r.map((cell, colIndex) => {
                    if (rowIndex === row && colIndex === col) {
                        const adjacentMines = countAdjacentMines(row, col, prevState.minePositions);
                        return { clicked: true, adjacentMines };
                    }
                    return cell;
                })
            );

            const isMine = prevState.minePositions.some(pos => pos[0] === row && pos[1] === col);

            if (isMine) {
                setIsGameOver(true);
                setIsTimerActive(false);
            }

            return { ...prevState, board: newBoard };
        });
    };

    return (
        <Box>
            {isGameOver && (
                <Alert
                    status='error'
                    variant='subtle'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'
                    height='200px'
                    colorScheme='red'
                >
                    <AlertIcon boxSize='80px' mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize='lg'>
                        Game Over!
                    </AlertTitle>
                    <AlertDescription maxWidth='sm'>
                        You hit a mine!
                    </AlertDescription>
                </Alert>
            )}
            <Center height="100vh">
                <Box 
                    h='1200px'
                    w='1200px'
                    border='2px' 
                    borderColor='gray.400' 
                    borderRadius='md' 
                    p={4}
                >
                    <Timer isActive={isTimerActive} resetTimer={resetTimer} />
                    <Grid 
                        templateColumns={`repeat(${hardMode ? 20 : 10}, 1fr)`} 
                        gap={2}
                    >
                        {gameState.board.map((row, rowIndex) => (
                            row.map((cell, colIndex) => (
                                <GridItem key={`${rowIndex}-${colIndex}`} display="flex" justifyContent="center" alignItems="center">
                                    <Button 
                                        border='2px'
                                        borderColor='black'
                                        w='50px' 
                                        h='50px'
                                        bg={cell.clicked ? (gameState.minePositions.some(pos => pos[0] === rowIndex && pos[1] === colIndex) ? "red" : "green") : "gray"}
                                        color="white"
                                        _hover={{ bg: "blue.500" }}
                                        onClick={() => handleClick(rowIndex, colIndex)}
                                    >
                                        {cell.clicked && (gameState.minePositions.some(pos => pos[0] === rowIndex && pos[1] === colIndex) ? "💣" : cell.adjacentMines)}
                                    </Button>
                                </GridItem>
                            ))
                        ))}
                    </Grid>
                    <Button 
                        onClick={resetGame} 
                        mb={4} 
                        colorScheme='teal'
                    >
                        Reset Game
                    </Button>
                    <Button 
                        onClick={goHard} 
                        mb={4} 
                        colorScheme='teal'
                    >
                        Hard Mode
                    </Button>
                </Box>
            </Center>
        </Box>
    );
};

export default Minefield;

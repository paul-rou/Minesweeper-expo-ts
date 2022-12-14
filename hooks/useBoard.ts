import { useState, useEffect, useCallback } from "react";
import { Grid, ILevel, Coordinates, ICell } from "../types";
import * as Constants from '../constants'


export default function useBoard() {

    let numberOfCycles = 0

    const [grid, setGrid] = useState<Grid>([]);
    const [difficultyLevel, setDifficultyLevel] = useState<ILevel>(Constants.INTERMEDIATE_LEVEL);
    const [gameState, setGameState] = useState("");
    const [numberOpenCells, setNumberOpenCells] = useState(0);
    const [flagMode, setFlagMode] = useState(false);


    const generateEmptyGrid = useCallback((): Grid => {

        let tempId = -1;

        const emptyGrid = Array.apply(null, Array(difficultyLevel.boardSize)).map((el, rowId) => {
            return Array.apply(null, Array(difficultyLevel.boardSize)).map((el, columnId) => {
              tempId++
                return {
                    id: tempId,
                    isCleared: false,
                    isBombed: false,
                    isFlaged: false,
                    coordinates: [rowId, columnId],
                    bombsAround: 0,
                } as ICell;
            });
          });
        
        return emptyGrid;

    }, [difficultyLevel])



    const getRandomInBoardSize = useCallback((alreadyTakenValue: Set<number>): number => {

        const randomValue = Math.round(Math.random() * difficultyLevel.boardSize * difficultyLevel.boardSize)
        return (alreadyTakenValue.has(randomValue))? getRandomInBoardSize(alreadyTakenValue) : randomValue

    }, [difficultyLevel])



    const getBombsIds = useCallback((): Set<number> => {

        const bombsIds = new Set<number>()
        let tempId = 1
        for (let i=0; i<difficultyLevel.numberOfBombs; i++) {
            tempId = getRandomInBoardSize(bombsIds)
            bombsIds.add(tempId)
        }
        return bombsIds

    }, [difficultyLevel, getRandomInBoardSize])



    const getCoordinatesAround = useCallback(([x, y]: Coordinates): Coordinates[] => {

        const listAllCoordinatesAround = [
            [x - 1, y - 1],
            [x, y - 1],
            [x + 1, y - 1],
            [x - 1, y],
            [x + 1, y],
            [x - 1, y + 1],
            [x, y + 1],
            [x + 1, y + 1],
          ];

        let listCoordinatesAround: Coordinates[] = [];

        listAllCoordinatesAround.forEach(
            (coordinatesAround) => {

                const x = coordinatesAround[0]
                const y = coordinatesAround[1]

                if (x >= 0 && y >= 0 && x < difficultyLevel.boardSize && y < difficultyLevel.boardSize) {
                    listCoordinatesAround.push([x, y])
                }
            }
        );

        return listCoordinatesAround
        
    }, [difficultyLevel]);



    const generateGridWithBombs = useCallback((): Grid => {

        const newGrid = generateEmptyGrid()
        const bombsIds = getBombsIds()

        for (let rowId=0; rowId<difficultyLevel.boardSize; rowId++) {
            for (let columnId=0; columnId<difficultyLevel.boardSize; columnId++) {
                const id = newGrid[rowId][columnId].id

                if (bombsIds.has(id)) {

                    newGrid[rowId][columnId].isBombed = true

                    const coordinates = newGrid[rowId][columnId].coordinates

                    const listCoordinatesAround = getCoordinatesAround(coordinates)

                    listCoordinatesAround.forEach(coordinatesAround => {                        
                        const x = coordinatesAround[0]

                        const y = coordinatesAround[1]
                        
                        newGrid[x][y].bombsAround ++
                        })


                }
            }
        }


        return newGrid
    }, [difficultyLevel, generateEmptyGrid, getBombsIds, getCoordinatesAround]);



    const loopThroughEmptyCell = useCallback((listEmptyCell: Coordinates[], grid: Grid) => {

        const newListEmptyCell = [...listEmptyCell];
        const x = newListEmptyCell[0][0];
        const y = newListEmptyCell[0][1];
        const listCoordinatesAround = getCoordinatesAround([x, y]);

        listCoordinatesAround.forEach(
            coordinatesAround => {
                const x = coordinatesAround[0];
                const y = coordinatesAround[1];

                if (!grid[x][y].isCleared) {
                    grid[x][y].isCleared = true;
                    numberOfCycles++

                    if (grid[x][y].bombsAround === 0) {
                       newListEmptyCell.push([x, y]) 
                    };
                };

                
            }
        );

        newListEmptyCell.shift();

        if (newListEmptyCell.length > 0)
            {
                loopThroughEmptyCell(newListEmptyCell, grid);
            };

    }, [numberOpenCells, getCoordinatesAround]);



    const handleEmptyCell = useCallback((cell: ICell, grid: Grid) => {

        numberOfCycles = 0

        const newGrid = [...grid]
        const listEmptyCell = [cell.coordinates];
        const x = cell.coordinates[0];
        const y = cell.coordinates[1];
        newGrid[x][y].isCleared = true;
    
        loopThroughEmptyCell(listEmptyCell, newGrid);

        setNumberOpenCells(numberOpenCells+numberOfCycles+1);
        setGrid(newGrid);

    }, [numberOpenCells, loopThroughEmptyCell]);



    const handleNumberedCell = useCallback((cell: ICell, grid: Grid) => {

        const newGrid = [...grid]
        const x = cell.coordinates[0];
        const y = cell.coordinates[1];
        newGrid[x][y].isCleared = true;
        setNumberOpenCells(numberOpenCells+1);

        setGrid(newGrid);

    }, [numberOpenCells])



    const openAllBombs = useCallback((grid: Grid) => {

        let bombsCleared = 0

        for (let rowId=0; rowId<difficultyLevel.boardSize; rowId++) {
            for (let columnId=0; columnId<difficultyLevel.boardSize; columnId++) {
                if (grid[rowId][columnId].isBombed) {
                    grid[rowId][columnId].isCleared = true
                    bombsCleared++
                }

                if (bombsCleared >= difficultyLevel.numberOfBombs) {
                    break
                }
                
            }
        }

    }, [difficultyLevel])



    const handleBombedCell = useCallback((grid: Grid) => {

        const newGrid = [...grid]

        openAllBombs(newGrid)

        setGrid(newGrid)
        setGameState("Lose")

    }, [openAllBombs])



    const handleFlagMode = useCallback((cell: ICell, grid: Grid) => {

        const newGrid = [...grid]
        const x = cell.coordinates[0];
        const y = cell.coordinates[1];
        newGrid[x][y].isFlaged = !cell.isFlaged;

        setGrid(newGrid);

    }, [])



    const handleSweepMode = useCallback((cell: ICell) => {

        if (!cell.isBombed && cell.bombsAround === 0) {
                handleEmptyCell(cell, grid)
            } else if (!cell.isBombed && cell.bombsAround > 0) {
                handleNumberedCell(cell, grid)
            } else if (cell.isBombed) 
            { handleBombedCell(grid) }

    }, [grid, handleEmptyCell, handleNumberedCell])



    const handleClickCell = useCallback((cell: ICell) => {

        if (gameState==="")
        { if(flagMode) {
           handleFlagMode(cell, grid) 
        } else {
            handleSweepMode(cell)
        } }

    }, [grid, flagMode, handleEmptyCell, handleNumberedCell])



    const initGame = useCallback(() => {

        setNumberOpenCells(0);
        setGameState("");
        setGrid(generateGridWithBombs());

    }, [generateGridWithBombs])



    useEffect(() => {

        initGame();

    }, [difficultyLevel])



    useEffect(() => {

        if (numberOpenCells === (difficultyLevel.boardSize * difficultyLevel.boardSize - difficultyLevel.numberOfBombs)) {
            setGameState("Win")
        }
        
    }, [difficultyLevel, numberOpenCells])
    

    return {grid, gameState, flagMode, setFlagMode, setDifficultyLevel, handleClickCell, initGame};
}
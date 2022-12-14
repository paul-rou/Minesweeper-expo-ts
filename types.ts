export interface ICell {
    id: number,
    isCleared: boolean,
    isBombed: boolean,
    isFlaged: boolean,
    coordinates: Coordinates,
    bombsAround: number
};

export interface ILevel {
    numberOfBombs: number,
    boardSize: number
}

export interface IGrid {
    grid: Grid,
    handleClickCell: (cell: ICell) => void
}

export interface IRow {
    row: Row,
    handleClickCell: (cell: ICell) => void
}

export interface ICellProps {
    cell: ICell,
    handleClickCell: (cell: ICell) => void,
}

export interface IPopUp {
    gameState: String,
    initGame: () => void
  }

export interface IFlagButton {
    flagMode: boolean,
    setFlagMode: () => void
}

export interface ILevelButtonBar {
    setDifficultyLevel: (difficultyLevel: ILevel) => void
}
  

export type Grid = ICell[][];
export type Row = ICell[];
export type Coordinates = [number, number];
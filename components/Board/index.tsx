import React from 'react';
import { View, ScrollView } from 'react-native';
import styles from './styles';
import Cell from '../../components/Cell'
import {IGrid, Row, ICell} from '../../types';

const Board: React.FC<IGrid> = ({grid, handleClickCell}) => {
  return (
    <ScrollView horizontal={true} contentContainerStyle={styles.boardScroll}>
      <View>
        {grid.map((row: Row, rowId: number) => 
        <View style={styles.rowContainer} key={rowId}>
            {row.map((cell: ICell) => <Cell cell={cell} handleClickCell={handleClickCell} key={cell.id}/>)}
        </View>)}
      </View>
    </ScrollView>
  );
};


export default Board;
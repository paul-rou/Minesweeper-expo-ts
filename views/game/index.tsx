import React from 'react';
import { SafeAreaView, View } from 'react-native';
import styles from './styles';
import Board from '../../components/Board';
import WinOrLosePopUp from '../../components/WinOrLosePopUp';
import FlagButton from '../../components/FlagButton';
import LevelButtonBar from '../../components/LevelButtonBar';
import useBoard from '../../hooks/useBoard'
import {ILevel} from '../../types';



const Game = () => {

  const {grid, gameState, flagMode, setFlagMode, setDifficultyLevel, handleClickCell, initGame} = useBoard()

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Board grid={grid} handleClickCell={handleClickCell}/>
      </View>
      <FlagButton flagMode={flagMode} setFlagMode={() => setFlagMode(!flagMode)}/>
      <LevelButtonBar setDifficultyLevel={(difficultyLevel: ILevel) => {setDifficultyLevel(difficultyLevel)}} />
      {gameState!="" ? <WinOrLosePopUp gameState={gameState} initGame={() => {initGame()}} /> : null}
    </SafeAreaView>
  );
};





export default Game;
import React, { useState } from "react";
import { Text, Pressable, View } from "react-native";
import { ILevelButtonBar } from "../../types";
import styles from "./styles";
import * as Constants from '../../constants';


const LevelButtonBar: React.FC<ILevelButtonBar> = ({setDifficultyLevel}) => {

    const [levelButtonPressed, setLevelButtonPressed] = useState("intermediary")

    return (
        <View style={styles.levelButtonWrapper}>
            <View style={styles.levelButtonContainer}>
                <Pressable
                        style={levelButtonPressed=="beginner" ? styles.levelOn : styles.levelOff}
                        onPress={() => {setDifficultyLevel(Constants.BEGINNER_LEVEL); setLevelButtonPressed("beginner")}}
                        >
                        <Text style={styles.levelText}>Beginner</Text>
                    
                </Pressable>
                <Pressable
                        style={levelButtonPressed=="intermediary" ? styles.levelOn : styles.levelOff}
                        onPress={() => {setDifficultyLevel(Constants.INTERMEDIATE_LEVEL); setLevelButtonPressed("intermediary")}}
                        >
                        <Text style={styles.levelText}>Intermediary</Text>
                    
                </Pressable>
                <Pressable
                    style={levelButtonPressed=="expert" ? styles.levelOn : styles.levelOff}
                    onPress={() => {setDifficultyLevel(Constants.EXPERT_LEVEL); setLevelButtonPressed("expert")}}
                    >
                    <Text style={styles.levelText}>Expert</Text>
                
                </Pressable>
            </View>
        </View>
    )
    
    
}

export default LevelButtonBar;
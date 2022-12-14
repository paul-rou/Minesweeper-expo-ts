import React from "react";
import { Text, Pressable, View } from "react-native";
import { IFlagButton } from "../../types";
import styles from "./styles";


const FlagButton: React.FC<IFlagButton> = ({flagMode, setFlagMode}) => {

    return (
        <View style={styles.flagButtonWrapper}>
            <View style={styles.flagButtonContainer}>
                <Pressable
                    style={flagMode ? styles.flagModeOn : styles.flagModeOff}
                    onPress={() => {setFlagMode()}}
                    >
                    <Text style={styles.flagText}>🚩: Flag</Text>
                
                </Pressable>
            </View>
        </View>
    )
    
    
}

export default FlagButton;
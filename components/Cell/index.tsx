import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ICellProps } from "../../types";
import styles from "./styles";


const Cell: React.FC<ICellProps> = ({cell, handleClickCell}) => {


    let cellContent: number | string = "";
    let cellFlag: string = "";

    if (cell.isBombed) {
        cellContent = "💣"
    } else if (cell.bombsAround === 0) {
        cellContent = ""
    } else {
        cellContent = cell.bombsAround
    }

    if (cell.isFlaged) {
        cellFlag = "🚩"
    }

    if (cell.isCleared) {
        return (
            <View style={styles.cellWrapper}>
                <Text style={styles.cellContent}>{cellContent}</Text>
            </View>
        )
    } else {
        return (
        <TouchableOpacity onPress={() => {handleClickCell(cell)}}>
            <View style={styles.cellUnCleared}>
                <Text style={styles.cellContent}>{cellFlag}</Text>
            </View>
        </TouchableOpacity>
        )
    }
    
}

export default Cell;
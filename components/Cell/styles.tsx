import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    cellWrapper: {
        backgroundColor: "white",
        justifyContent: 'center',
        borderWidth: 1,
        height: 40,
        width: 40,
        marginRight: -1,
        marginTop: -1
    },
    cellContent: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    cellUnCleared: {
        backgroundColor: 'grey',
        borderWidth: 3,
        height: 40,
        width: 40,
        marginRight: -1,
        marginTop: -1
    }
});

export default styles;
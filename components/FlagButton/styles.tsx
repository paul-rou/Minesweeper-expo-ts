import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    flagButtonWrapper: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    flagButtonContainer: {
        width: 150,
      justifyContent: 'center',
    },
    flagModeOn: {
        backgroundColor: "#a0a0a0",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    flagModeOff: {
      backgroundColor: "#d3d3d3",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    flagText: {
        fontWeight: 'bold',
        fontSize: 20,
        padding: 5,
      textAlign: "center"
    }
  });

  export default styles;
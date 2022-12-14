import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    levelButtonWrapper: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    levelButtonContainer: {
        width: 120,
      justifyContent: "space-around",
      flexDirection: 'column'
    },
    levelOn: {
        backgroundColor: "#a0a0a0",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    levelOff: {
      backgroundColor: "#d3d3d3",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    levelText: {
        fontWeight: 'bold',
        fontSize: 15,
        padding: 5,
      textAlign: "center"
    }
  });

  export default styles;
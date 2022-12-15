import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    popUpContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf:'center',
      position: "absolute"
    },
    popUpBox: {
        flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf:'center',
      padding: 2,
      paddingStart: 10,
      paddingEnd: 10
    },
    popUpTitle: {
        fontSize: 40,
        fontWeight: 'bold',
      marginBottom: 15,
      textAlign: "center"
    },
    popUpText: {
        fontSize: 25,
        padding: 5,
      textAlign: "center"
    },
    popUpButton: {
        backgroundColor: "#BABABA",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    popUpAnimation: {
      backgroundColor: "#dbdbdb",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    }
  });

  export default styles;
import React, {useEffect, useRef} from 'react';
import {Animated, View, Text, Dimensions, Pressable} from 'react-native';
import styles from './styles';
import {IPopUp} from '../../types';


const WinOrLosePopUp: React.FC<IPopUp> = ({gameState, initGame}) => {

    const deviceHeight = Dimensions.get('window').height
    const fadeAnimation = useRef(new Animated.Value(0)).current  
    const scaleAnimation = useRef(new Animated.Value(1)).current
  
    useEffect(() => {
      Animated.sequence([
        Animated.timing(
          fadeAnimation,
          {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
          }
        ),
        Animated.timing(
          scaleAnimation,
          {
            toValue: 1.4,
            duration: 250,
            useNativeDriver: true
          }
        ),
        Animated.timing(
          scaleAnimation,
          {
            toValue: 1,
            duration: 250,
            useNativeDriver: true
          }
        )
      ]).start();
    }, [fadeAnimation])
  
    return (
      <View style={styles.popUpContainer}>
        <Animated.View style={{
          ...styles.popUpAnimation,
          opacity: fadeAnimation, 
          transform: [{
            translateY: fadeAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [deviceHeight/2, 0]  
            }),
          },{scale: scaleAnimation}],        
        }}>
          <View style={styles.popUpBox}>
              <Text style={styles.popUpTitle}>You {gameState}!</Text>
              <Pressable
                style={styles.popUpButton}
                onPress={() => {initGame()}}
              >
                <Text style={styles.popUpText}>Retry</Text>
              </Pressable>
          </View>
        </Animated.View>
      </View>
    )
}


export default WinOrLosePopUp;



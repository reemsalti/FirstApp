import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import AnimatedBubble from './assets/AnimatedBubble';

const colors = ['#AED6F1', '#FADBD8', '#E8DAEF', '#D5F5E3', '#FDEDEC'];
const sizes = [50, 75, 100, 125, 150];

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomDelay = () => Math.random() * 1000;

const WelcomeScreen = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('GetStarted');
  };

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: -10,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 10,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
      ),
    ]).start();
  }, []);

  return (
    <TouchableOpacity style={styles.container} onPress={handleGetStarted}>
      {Array.from({ length: 20 }).map((_, i) => (
        <AnimatedBubble
          key={i}
          color={getRandomElement(colors)}
          size={getRandomElement(sizes)}
          delay={getRandomDelay()}
        />
      ))}
      <Animated.Text style={[styles.title, { opacity, transform: [{ translateY }] }]}>Welcome</Animated.Text>
      <Animated.Text style={[styles.instructions, { opacity }]}>Tap anywhere to get started</Animated.Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AED6F1',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    position: 'absolute',
    color: '#fff',
  },
  instructions: {
    fontSize: 16,
    position: 'absolute',
    bottom: 50,
    color: '#fff',
  },
});

export default WelcomeScreen;

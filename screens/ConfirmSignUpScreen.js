import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

const ConfirmSignUpScreen = ({ navigation, route }) => {
  const { firstName } = route.params; // get firstName from navigation params
  const animationRef = useRef(null);

  const handleContinue = () => {
    animationRef.current.fadeOut(2000).then(endState => navigation.navigate('Dashboard'));
  };

  const AnimatedView = Animatable.createAnimatableComponent(View);

  return (
    <TouchableOpacity style={styles.container} onPress={handleContinue}>
      <AnimatedView ref={animationRef}>
        <Text style={styles.title}>Thanks for creating an account, {firstName}!</Text>
        {/* You can replace this View with your balloon animation */}
        <View style={styles.animationContainer}>
          {/* Balloon Animation */}
        </View>
      </AnimatedView>
      <Text style={styles.subtitle}>Tap anywhere to continue</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    position: 'absolute',  // Set position to absolute
    bottom: 20,  // Position from bottom of the screen
    width: '100%',  // To make sure the text is centered
  },
  animationContainer: {
    height: 200,
    width: 200,
    marginBottom: 50,
  },
});

export default ConfirmSignUpScreen;

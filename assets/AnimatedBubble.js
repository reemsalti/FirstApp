import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, withSequence } from 'react-native-reanimated';

const AnimatedBubble = ({ color, size, delay }) => {
  const translateY = useSharedValue(100);
  const scale = useSharedValue(1);

  useEffect(() => {
    translateY.value = withRepeat(withSequence(
      withTiming(-100, { duration: 3000, delay }),
      withTiming(0, { duration: 3000 }),
    ), -1);

    scale.value = withRepeat(withSequence(
      withTiming(1.05, { duration: 1500, delay }),
      withTiming(0.95, { duration: 1500 }),
      withTiming(1.05, { duration: 1500 }),
      withTiming(0.95, { duration: 1500 }),
    ), -1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <Animated.View
      style={[
        styles.bubble,
        {
          backgroundColor: color,
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        animatedStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  bubble: {
    position: 'absolute',
  },
});

export default AnimatedBubble;

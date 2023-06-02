import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

const AfterCreateAccountScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { firstName } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thanks for creating an account {firstName}!</Text>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        Log In
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
  },
});

export default AfterCreateAccountScreen;

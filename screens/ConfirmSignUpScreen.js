// ConfirmSignUpScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import { Auth } from 'aws-amplify';

const ConfirmSignUpScreen = ({ navigation, route }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const { email } = route.params; // Getting the email from the route params

  const handleConfirmation = async () => {
    try {
      await Auth.confirmSignUp(email, verificationCode);
      navigation.navigate('ThankYou');
    } catch (error) {
      console.error('Confirmation error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify your Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your verification code"
        value={verificationCode}
        onChangeText={setVerificationCode}
      />
      <Button mode="contained" onPress={handleConfirmation}>
        Confirm Account
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  // Your styles here
});

export default ConfirmSignUpScreen;

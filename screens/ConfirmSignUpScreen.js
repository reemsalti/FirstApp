import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { Auth } from 'aws-amplify';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

const ConfirmSignUpScreen = ({ navigation, route }) => {
  const [value, setValue] = useState('');
  const { email } = route.params; // Getting the email from the route params
  const ref = useBlurOnFulfill({ value, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleConfirmation = async () => {
    try {
      await Auth.confirmSignUp(email, value);
      navigation.navigate('ThankYou');
    } catch (error) {
      console.error('Confirmation error:', error);
    }
  };

  const handleResendCode = async () => {
    try {
      await Auth.resendSignUp(email);
      alert('Verification code has been sent again!');
    } catch (error) {
      console.error('Error resending code: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify your Account</Text>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={6}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <Button mode="contained" onPress={handleConfirmation}>
        Confirm Account
      </Button>
      <Button mode="outlined" onPress={handleResendCode}>
        Resend Code
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  // Your styles here
  error: {
    color: 'red',
    marginBottom: 16,
  },
  codeFiledRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});

export default ConfirmSignUpScreen;

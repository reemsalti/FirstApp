import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { createUser as createUserMutation } from './graphql/mutations';
import { signIn } from './cognito';


const CreateAccountScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleCreateAccount = async () => {
    try {
      if (password !== confirmPassword) {
        setPasswordError(true);
        return;
      }
  
      // Create user account using AWS Amplify
      const user = await signIn(email, password);
  
      // Store additional user data in AWS
      await API.graphql(
        graphqlOperation(createUserMutation, {
          input: {
            id: user.userSub,
            email: email,
            // Add additional data fields as needed
          },
        })
      );
  
      // Account creation successful, navigate to the next screen
      navigation.navigate('ThankYou');
    } catch (error) {
      // Handle error in account creation
      console.error('Error creating account:', error);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
      style={styles.input}
      placeholder="Email"
      value={email}
      onChangeText={setEmail}
      autoCapitalize="none" // Set autoCapitalize to 'none'
    />
    
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <Ionicons
          name={showPassword ? 'eye' : 'eye-off'}
          size={24}
          color="gray"
          style={styles.eyeIcon}
          onPress={togglePasswordVisibility}
        />
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.passwordInput, passwordError && styles.errorInput]}
          placeholder="Confirm Password"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Ionicons
          name={showConfirmPassword ? 'eye' : 'eye-off'}
          size={24}
          color="gray"
          style={styles.eyeIcon}
          onPress={toggleConfirmPasswordVisibility}
        />
      </View>
      {passwordError && (
        <Text style={styles.errorText}>Passwords do not match</Text>
      )}
      <Button mode="contained" onPress={handleCreateAccount}>
        Create Account
      </Button>
    </View>
  );
};
const ThankYouScreen = () => {
  // Implement the ThankYouScreen component here
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thank You for Signing Up!</Text>
      <Text style={styles.subtitle}>Please provide additional information:</Text>
      {/* Add your code for collecting user information */}
      <Button mode="contained" onPress={() => {}}>
        Continue
      </Button>
    </View>
  );
};

const UserNeedsScreen = () => {
  // Implement the UserNeedsScreen component here
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Needs</Text>
      <Text style={styles.subtitle}>Select your needs:</Text>
      {/* Add your code for selecting user needs */}
      <Button mode="contained" onPress={() => {}}>
        Next
      </Button>
    </View>
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
    fontWeight: 'bold',
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    width: '100%',
  },
  checkbox: {
    flex: 1,
    marginHorizontal: 4,
  },
  checked: {
    backgroundColor: '#aaf',
  },
});

export default CreateAccountScreen;

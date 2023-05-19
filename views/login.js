import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

function LoginScreen() {
  const handleLogin = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ email, password }),
      });

      console.log('Response:', response); // Add this line

      if (!response.ok) {
        let errorMessage = 'An error occurred during login.';

        try {
          const error = await response.json();
          errorMessage = error.message;
        } catch (e) {
          // Parsing error response as JSON failed, use the default error message
        }

        // Implement your error handling logic here
        alert(errorMessage);
      } else {
        // Redirect to dashboard
        // Replace the navigation code with your actual navigation logic to the dashboard screen
        // For example: navigation.navigate('Dashboard');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formArea}>
        <Text style={styles.appName}>Mamdinho's FitAssistant</Text>
        <TextInput style={styles.input} placeholder="Email Address" id="email" />
        <TextInput style={styles.input} placeholder="Password" id="password" secureTextEntry={true} />
        <TouchableOpacity style={styles.submitBtn} onPress={handleLogin}>
          <Text style={styles.submitBtnText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.formLink} onPress={() => navigation.navigate('CreateAccount')}>
          <Text style={styles.formLinkText}>Don't have an account? Create one</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  formArea: {
    maxWidth: 400,
    marginVertical: '5%',
    padding: '2%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  input: {
    marginBottom: 16,
  },
  submitBtn: {
    backgroundColor: '#0d6efd',
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: '500',
  },
  formLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  formLinkText: {
    color: '#0d6efd',
    fontWeight: '500',
  },
});

export default LoginScreen;

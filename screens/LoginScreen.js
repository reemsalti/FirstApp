import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { Auth } from "aws-amplify";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      await Auth.signIn(email, password);
      navigation.navigate("Dashboard");
    } catch (error) {
      console.error("Error during sign in", error);
      if (
        error.code === "UserNotFoundException" ||
        error.code === "NotAuthorizedException"
      ) {
        setErrorMessage("Incorrect username or password");
      } else if (error.code === "UserNotConfirmedException") {
        // User hasn't confirmed their account
        // Navigate to the ConfirmSignUpScreen
        navigation.navigate("ConfirmSignUp", { email });
      } else {
        setErrorMessage("An error occurred while signing in");
      }
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      {errorMessage !== "" && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
      <Button mode="contained" onPress={handleLogin} style={{backgroundColor: '#add8e6'}}>
        Log In
      </Button>
      <Button
        mode="outlined"
        onPress={handleGoBack}
        style={styles.goBackButton}
      >
        Go Back
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  loginButton: {
    marginBottom: 16, // Add some margin at the bottom
  },
  goBackButton: {
    marginTop: 16, // Add some margin at the top
  },
});

export default LoginScreen;

import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { Button } from "react-native-paper";

const GetStartedScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleContinue = () => {
    if (firstName && lastName) {
      navigation.navigate("CreateAccount", {
        firstName,
        lastName,
      });
    } else {
      alert("Please fill in both first name and last name.");
    }
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Get Started</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <Button
        mode="contained"
        onPress={handleContinue}
        disabled={!(firstName && lastName)}
      >
        Continue
      </Button>
      <Text style={styles.loginText} onPress={handleLogin}>
        Already have an account? Log in
      </Text>
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
  loginText: {
    marginTop: 16,
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default GetStartedScreen;

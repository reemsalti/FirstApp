import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { Button } from "react-native-paper";

const GetStartedScreen = ({ navigation, route }) => {
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
      <Text style={styles.title}>Tell us your name</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={route.params?.name || firstName} // Access the name property safely with optional chaining
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
        style={styles.button}
      >
        Next
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
  button: {
    backgroundColor: "lightblue",
  },
  loginText: {
    marginTop: 16,
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default GetStartedScreen;

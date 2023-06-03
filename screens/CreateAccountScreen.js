import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import Modal from "react-native-modal";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { createUserMutation } from '../graphql/mutations';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import uuid from 'react-native-uuid';

const emailRegex = /^\S+@\S+\.\S+$/;

const CreateAccountScreen = ({ route }) => {
  const { firstName, lastName } = route.params;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userError, setUserError] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const resetFields = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleCreateAccount = async () => {
    try {
      if (!email || !password || !confirmPassword) {
        throw new Error("All fields must be filled out");
      }

      if (password !== confirmPassword) {
        setPasswordError(true);
        return;
      }

      if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
      }
      
      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }
      
      setUserError("");

      const { user } = await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email: email,
        },
      });

      console.log("User from Auth.signUp():", user); // Print out the user object

      if (user) {
        const time_created = new Date().toISOString();
        const id = uuid.v4();

        const newUser = {
          id: id,
          email: email,
          first_name: firstName,
          last_name: lastName,
          time_created: time_created,
        };

        console.log(`newUser: ${newUser}`)

        try {
          const result = await API.graphql(graphqlOperation(createUserMutation, { input: newUser }));
          console.log(result);
        } catch (error) {
          console.log('Error during DynamoDB entry creation:', error);
        }

        resetFields(); // Clear input fields
        navigation.navigate("AfterCreateAccountScreen", { firstName });
      } else {
        console.error("User object is undefined.");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      if (error.code === "UsernameExistsException") {
        setUserError(
          "An account with this email already exists. You can log in or reset your password."
        );
        setModalVisible(true);
        resetFields(); // Clear input fields
      }
      else {
        setUserError(
          "Error Creating your account. Please contact the Admin"
        );
        setModalVisible(true);
        resetFields(); // Clear input fields
      }
    }
  };


  const closeModal = () => {
    setModalVisible(false);
  };

  const navigateToLoginScreen = () => {
    navigation.navigate("Login");
    closeModal();
  };

  const navigateToForgotPasswordScreen = () => {
    navigation.navigate("ForgotPassword");
    closeModal();
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
      <Text style={styles.greeting}>
        Welcome {firstName} {lastName}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
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
          name={showPassword ? "eye" : "eye-off"}
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
          name={showConfirmPassword ? "eye" : "eye-off"}
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
      <Button
        mode="outlined"
        onPress={() => navigation.goBack()}
        style={styles.goBackButton}
      >
        Go Back
      </Button>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.errorText}>{userError}</Text>
          <TouchableOpacity onPress={navigateToLoginScreen}>
            <Text style={styles.linkText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToForgotPasswordScreen}>
            <Text style={styles.linkText}>Forgot Password</Text>
          </TouchableOpacity>
          <Button mode="contained" onPress={closeModal}>
            Close
          </Button>
        </View>
      </Modal>
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
  greeting: {
    fontSize: 18,
    color: "gray",
    marginBottom: 24,
  },
  createAccountButton: {
    marginBottom: 16,
  },
  goBackButton: {
    marginTop: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
  },
  errorInput: {
    borderColor: "red",
    borderWidth: 1,
  },
  errorText: {
    color: "red",
    marginBottom: 16,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
  },
  linkText: {
    textDecorationLine: "underline",
    color: "blue",
    marginBottom: 20,
  },
});

export default CreateAccountScreen;

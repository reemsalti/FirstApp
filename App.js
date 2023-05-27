import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Amplify, { Auth } from "@aws-amplify/core";
import awsconfig from "./FirstApp/aws-exports";
import SecureStorage from "react-native-secure-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import your screens
import WelcomeScreen from "./screens/WelcomeScreen";
import GetStartedScreen from "./screens/GetStartedScreen";
import CreateAccountScreen from "./screens/CreateAccountScreen";
import LoginScreen from "./screens/LoginScreen";
import FitAssistantScreen from "./screens/FitnessAssistantScreen";
import ConfirmSignUpScreen from "./screens/ConfirmSignUpScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import DashboardScreen from "./screens/DashboardScreen";
import CalorieCounterScreen from "./screens/CalorieCounterScreen";
import MealPlanScreen from "./screens/MealPlanScreen";
import TrainingScheduleScreen from "./screens/TrainingScheduleScreen";

import { AuthContext } from "./AuthContext"; // import the context

Amplify.configure(awsconfig);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const DashboardStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const DashboardStackScreen = () => (
  <DashboardStack.Navigator>
    <DashboardStack.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{ headerShown: false }}
    />
    <DashboardStack.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{ headerShown: false }}
    />
    <DashboardStack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <DashboardStack.Screen
      name="CalorieCounterScreen"
      component={CalorieCounterScreen}
      options={{ headerShown: false }}
    />
    <DashboardStack.Screen
      name="MealPlanScreen"
      component={MealPlanScreen}
      options={{ headerShown: false }}
    />
    <DashboardStack.Screen
      name="TrainingScheduleScreen"
      component={TrainingScheduleScreen}
      options={{ headerShown: false }}
    />
  </DashboardStack.Navigator>
);

const ChatStackScreen = () => (
  <ChatStack.Navigator>
    <ChatStack.Screen
      name="Chat"
      component={FitAssistantScreen}
      options={{ headerShown: true }}
    />
  </ChatStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ headerShown: false }}
    />
  </ProfileStack.Navigator>
);

const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Profile") {
          iconName = focused ? "person-circle" : "person-circle-outline";
        } else if (route.name === "Home") {
          iconName = focused ? "home" : "home-outline";
        } else if (route.name === "Chat") {
          iconName = focused
            ? "chatbubble-ellipses"
            : "chatbubble-ellipses-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },

      tabBarActiveTintColor: "tomato",
      tabBarInactiveTintColor: "gray",
    })}
  >
    <Tab.Screen name="Home" component={DashboardStackScreen} />
    <Tab.Screen name="Chat" component={ChatStackScreen} />
    <Tab.Screen name="Profile" component={ProfileStackScreen} />
  </Tab.Navigator>
);

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkForUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUser(user);
      } catch (error) {
        console.error("No authenticated user found", error);
      }
    };
    checkForUser();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("@storage_Key"); // Remove user data from local storage
      setUser(null); // Reset user state
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, handleLogout }}>
      <NavigationContainer>
        {user ? (
          <BottomTabNavigator />
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SettingsScreen"
              component={SettingsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="GetStarted"
              component={GetStartedScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateAccount"
              component={CreateAccountScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ConfirmSignUp"
              component={ConfirmSignUpScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;

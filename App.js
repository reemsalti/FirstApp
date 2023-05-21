import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Amplify from '@aws-amplify/core';
import awsconfig from './FirstApp/aws-exports';
import WelcomeScreen from './screens/WelcomeScreen';
import GetStartedScreen from './screens/GetStartedScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import LoginScreen from './screens/LoginScreen';
import FitAssistantScreen from './views/dashboard'
import ConfirmSignUpScreen from './screens/ConfirmSignUpScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';

Amplify.configure(awsconfig);

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GetStarted"
          component={GetStartedScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccountScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Dashboard"
          component={FitAssistantScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen 
        name="ConfirmSignUpScreen" 
        component={ConfirmSignUpScreen} />
        <Stack.Screen 
        name="ForgotPasswordScreen" 
        component={ForgotPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

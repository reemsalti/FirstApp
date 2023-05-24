import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Amplify from '@aws-amplify/core';
import awsconfig from './FirstApp/aws-exports';
import WelcomeScreen from './screens/WelcomeScreen';
import GetStartedScreen from './screens/GetStartedScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import LoginScreen from './screens/LoginScreen';
import FitAssistantScreen from './screens/FitnessAssistantScreen';
import ConfirmSignUpScreen from './screens/ConfirmSignUpScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import SecureStorage from 'react-native-secure-storage';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import DashboardScreen from './screens/DashboardScreen';
import CalorieCounterScreen from './screens/CalorieCounterScreen';
import MealPlanScreen from './screens/MealPlanScreen';
import TrainingScheduleScreen from './screens/TrainingScheduleScreen';

Amplify.configure(awsconfig);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="CalorieCounterScreen" component={CalorieCounterScreen} options={{ headerShown: false }} /> 
      <HomeStack.Screen name="MealPlanScreen" component={MealPlanScreen} options={{ headerShown: false }} /> 
      <HomeStack.Screen name="TrainingScheduleScreen" component={TrainingScheduleScreen} options={{ headerShown: false }} /> 
    </HomeStack.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          } else if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Chat" component={FitAssistantScreen} options={{headerShown: true}}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
};

const App = () => {
  const [user, setUser] = React.useState("test");  // hardcoded non-null value

  React.useEffect(() => {
    const checkForUser = async () => {
      const jsonValue = await SecureStorage.getItem('@storage_Key');
      const storedUser = jsonValue != null ? JSON.parse(jsonValue) : null;
      if(storedUser) {
        setUser(storedUser);
      }
    };
    checkForUser();
  }, []);

  return (
    <NavigationContainer>
      { user ? (
        <BottomTabNavigator />
      ) : (
        <Stack.Navigator>
          <Stack.Screen 
            name="DashboardScreen"
            component={DashboardScreen}
            options={{ headerShown: true }} 
          />
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GetStarted"
            component={GetStartedScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="CreateAccountScreen"
            component={CreateAccountScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen 
            name="ConfirmSignUpScreen" 
            component={ConfirmSignUpScreen} 
          />
          <Stack.Screen 
            name="ForgotPasswordScreen" 
            component={ForgotPasswordScreen} 
          />
          <Stack.Screen 
            name="SettingsScreen"
            component={SettingsScreen}
            options={{ headerShown: true }} 
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import FitnessAssistantScreen from './FitnessAssistantScreen';
import ProfileScreen from "./ProfileScreen";

function CalorieCounter({ navigation }) {
  // Placeholder data
  const caloriesConsumed = 1200;
  const calorieGoal = 2000;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("CalorieCounterScreen")}
    >
      <Text style={styles.cardTitle}>Calorie Counter</Text>
      <Text>Calories consumed: {caloriesConsumed}</Text>
      <Text>Calorie goal: {calorieGoal}</Text>
    </TouchableOpacity>
  );
}

function MealPlan({ navigation }) {
  // Placeholder data
  const meals = [
    "Breakfast: Oatmeal",
    "Lunch: Chicken Salad",
    "Dinner: Grilled Salmon",
  ];

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("MealPlanScreen")}
    >
      <Text style={styles.cardTitle}>Meal Plan</Text>
      {meals.map((meal, index) => (
        <Text key={index}>{meal}</Text>
      ))}
    </TouchableOpacity>
  );
}

function TrainingSchedule({ navigation }) {
  // Placeholder data
  const workouts = ["Morning: Cardio", "Evening: Strength Training"];

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("TrainingScheduleScreen")}
    >
      <Text style={styles.cardTitle}>Training Schedule</Text>
      {workouts.map((workout, index) => (
        <Text key={index}>{workout}</Text>
      ))}
    </TouchableOpacity>
  );
}

const Tab = createBottomTabNavigator();

function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Dashboard</Text>
      <CalorieCounter />
      <MealPlan />
      <TrainingSchedule />
    </View>
  );
}

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
    <Tab.Screen name="Home" component={DashboardScreen} />
    <Tab.Screen name="Chat" component={FitnessAssistantScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 10,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default BottomTabNavigator;

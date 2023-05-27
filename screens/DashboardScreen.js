import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

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

function DashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Dashboard</Text>
      <CalorieCounter navigation={navigation} />
      <MealPlan navigation={navigation} />
      <TrainingSchedule navigation={navigation} />
    </View>
  );
}

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

export default DashboardScreen;

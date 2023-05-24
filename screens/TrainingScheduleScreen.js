import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';

// sample data
const sampleWorkouts = {
  'Monday': 'Cardio and Abs',
  'Tuesday': 'Legs and Back',
  'Wednesday': 'Rest day',
  'Thursday': 'Upper body and Cardio',
  'Friday': 'Full body workout',
  'Saturday': 'Rest day',
  'Sunday': 'Light Cardio and Yoga'
};

function TrainingScheduleScreen() {
  // Set the initial workout plans to be the sample workouts
  const [workoutPlans, setWorkoutPlans] = useState(sampleWorkouts);
  
  const date = new Date();
  const currentDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
  
  const currentWorkout = workoutPlans[currentDay];

  // This function simulates a workout plan change by the user.
  const changeWorkoutPlan = () => {
    // Here you'd typically update the workout plans in your backend server
    // or local storage, and then reflect the change in the state.
    setWorkoutPlans({
      ...workoutPlans,
      [currentDay]: 'New workout plan'
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.currentDayContainer}>
        <Text style={styles.dayText}>{currentDay}</Text>
        <Text style={styles.workoutText}>{currentWorkout}</Text>
        <Button title="Change Workout Plan" onPress={changeWorkoutPlan} />
      </View>

      <View style={styles.weeklyWorkoutContainer}>
        {Object.entries(workoutPlans).map(([day, workout], index) => (
          // Exclude the current day's workout from the rest of the week's workouts
          day !== currentDay && (
            <View key={index} style={styles.workoutContainer}>
              <Text style={styles.dayText}>{day}</Text>
              <Text style={styles.workoutText}>{workout}</Text>
            </View>
          )
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  currentDayContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    alignItems: 'center',
  },
  weeklyWorkoutContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  workoutContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fafafa',
    borderRadius: 10,
  },
  dayText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  workoutText: {
    fontSize: 16,
  },
});

export default TrainingScheduleScreen;

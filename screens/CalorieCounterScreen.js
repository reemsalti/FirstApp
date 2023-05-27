import React, { useState } from "react";
import { View } from "react-native";
import {
  TextInput,
  RadioButton,
  Text,
  Button,
  Provider as PaperProvider,
  DefaultTheme,
} from "react-native-paper";

import AWS from "aws-sdk";

AWS.config.update({
  region: "us-east-2", // Set your region
  credentials: {
    // Set your credentials
    accessKeyId: "AKIA3GIGGHDLAA6FXKX2",
    secretAccessKey: "UpCE/swDNuZLNXZRkbl/hSu8ZoDYuPOjD5oXDE3R",
  },
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "blue", // Change this to your desired color
  },
};

const CalorieCounterScreen = () => {
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [activityStatus, setActivityStatus] = useState("");
  // Replace with actual user ID and attempt number
  const userId = "test@example.com";
  const attempt = 1;
  const handleSubmit = () => {
    const params = {
      TableName: "users_calorie_tracker",
      Item: {
        user_id: userId,
        attempt: attempt,
        weight: weight,
        age: age,
        body_fat: bodyFat,
        gender: gender,
        height: height,
        activity_status: activityStatus,
      },
    };

    dynamodb.put(params, function (err, data) {
      if (err) {
        console.error(
          "Unable to add item. Error JSON:",
          JSON.stringify(err, null, 2)
        );
      } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
      }
    });
  };

  return (
    <PaperProvider theme={theme}>
      <View>
        <TextInput
          label="Weight in lbs"
          value={weight}
          onChangeText={(value) => setWeight(value)}
          mode="outlined"
        />

        <TextInput
          label="Age"
          value={age}
          onChangeText={(value) => setAge(value)}
          mode="outlined"
        />

        <TextInput
          label="Estimated Body Fat"
          value={bodyFat}
          onChangeText={(value) => setBodyFat(value)}
          mode="outlined"
        />

        <Text>Gender</Text>
        <RadioButton.Group
          onValueChange={(newGender) => setGender(newGender)}
          value={gender}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <RadioButton.Item label="Male" value="male" />
            <RadioButton.Item label="Female" value="female" />
          </View>
        </RadioButton.Group>

        <TextInput
          label="Height in cm"
          value={height}
          onChangeText={(value) => setHeight(value)}
          mode="outlined"
        />

        <Text>Activity Status</Text>
        <RadioButton.Group
          onValueChange={(newStatus) => setActivityStatus(newStatus)}
          value={activityStatus}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <RadioButton.Item label="Very Active" value="veryActive" />
            <RadioButton.Item label="Active" value="active" />
            <RadioButton.Item label="Not Active" value="notActive" />
          </View>
        </RadioButton.Group>

        <Button mode="contained" onPress={handleSubmit}>
          Submit
        </Button>
      </View>
    </PaperProvider>
  );
};

export default CalorieCounterScreen;

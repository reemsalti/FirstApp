import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

function CreateAccountScreen() {
  const showAlert = (message) => {
    // Implement your alert logic here
  };

  const closeAlert = () => {
    // Implement your alert close logic here
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const interest = document.getElementById('interest').value;
    const password = document.getElementById('password').value;
    let gender = "male";
    if (!document.getElementById("female").checked) {
      gender = "female";
    }
    const dob = document.getElementById('dob').value;

    try {
      const response = await fetch('/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          firstName,
          lastName,
          email,
          phone,
          interest,
          password,
          gender,
          dob,
        }),
      });

      if (response.ok) {
        // Redirect to dashboard
        // Replace the navigation code with your actual navigation logic to the dashboard screen
        // For example: navigation.navigate('Dashboard');
      } else {
        const error = await response.json(); // Extract the error message from the response
        showAlert(error.message || "Incorrect information. Please try again.");
      }

    } catch (error) {
      console.error("Error:", error);
      showAlert(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formArea}>
        <Text style={styles.appName}>Mamdinho's FitAssistant</Text>
        <View style={styles.formInner}>
          <TextInput style={styles.input} placeholder="First Name" id="firstName" />
          <TextInput style={styles.input} placeholder="Last Name" id="lastName" />
          <TextInput style={styles.input} placeholder="Phone Number" id="phone" />
          <TextInput style={styles.input} placeholder="Email" id="email" />
          <TextInput style={styles.input} placeholder="Password" id="password" secureTextEntry={true} />
          <View style={styles.input}>
            <Text style={styles.formLabel}>Interest</Text>
            <View style={styles.selectWrapper}>
              <Picker
                style={styles.select}
                selectedValue={interest}
                onValueChange={(itemValue) => setInterest(itemValue)}
              >
                <Picker.Item label="All" value="All" />
                <Picker.Item label="Custom diet plans" value="Custom diet plans" />
                <Picker.Item label="Custom Workout Plans" value="Custom Workout Plans" />
                <Picker.Item label="Mental Coach" value="Mental Coach" />
              </Picker>
            </View>
          </View>
          <View style={styles.input}>
            <Text style={styles.formLabel}>Gender</Text>
            <View style={styles.radioGroup}>
              <View style={styles.radioButton}>
                <RadioButton
                  value="male"
                  status={gender === "male" ? "checked" : "unchecked"}
                  onPress={() => setGender("male")}
                />
                <Text style={styles.radioButtonLabel}>Male</Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton
                  value="female"
                  status={gender === "female" ? "checked" : "unchecked"}
                  onPress={() => setGender("female")}
                />
                <Text style={styles.radioButtonLabel}>Female</Text>
              </View>
            </View>
          </View>
          <TextInput style={styles.input} placeholder="Date of Birth" id="dob" />
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitBtnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  formArea: {
    maxWidth: 400,
    marginVertical: '5%',
    padding: '2%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  formInner: {
    marginVertical: '2%',
  },
  input: {
    marginBottom: 16,
  },
  formLabel: {
    fontWeight: '500',
  },
  selectWrapper: {
    backgroundColor: '#f3f3f3',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  select: {
    height: 40,
    color: '#000',
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  radioButtonLabel: {
    marginLeft: 4,
  },
  submitBtn: {
    backgroundColor: '#0d6efd',
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: '500',
  },
});

export default CreateAccountScreen;

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {

  const handleSettings = () => {
    navigation.navigate('SettingsScreen');
  };

  const handleLogout = () => {
    // Perform logout logic here
    // For example, clear user data or authentication token
    // Then navigate to the Login Screen
    navigation.navigate('WelcomeScreen');
  };

  return (
    <View>
      <Text>Profile Screen</Text>

      {/* Settings Icon */}
      <TouchableOpacity onPress={handleSettings}>
        <Ionicons name="settings-outline" size={24} />
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ProfileScreen;

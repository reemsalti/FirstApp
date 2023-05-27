import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../AuthContext";

const ProfileScreen = ({ navigation }) => {
  const { handleLogout } = useContext(AuthContext); // Get handleLogout from context

  const handleSettings = () => {
    navigation.navigate("SettingsScreen");
  };

  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>

      {/* Settings Icon */}
      <TouchableOpacity onPress={handleSettings}>
        <Ionicons name="settings-outline" size={24} />
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => handleLogout && handleLogout()}>
  <Text>Logout</Text>
</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  logoutButton: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "red",
  },
});

export default ProfileScreen;

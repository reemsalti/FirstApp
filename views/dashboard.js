import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

function FitAssistantScreen() {
  const signOut = () => {
    // Redirect to login page
    // Replace the navigation code with your actual navigation logic to the login screen
    // For example: navigation.navigate('Login');
  };

  const toggleSideMenu = () => {
    // Implement your side menu toggle logic here
    // You can use state or a navigation library to handle the side menu state
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleSideMenu}>
          <Image style={styles.menuIcon} source={require('../assets/menu.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.sideMenu}>
        <TouchableOpacity>
          <Text>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Chat History</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={signOut}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentsWrapper}>
        <Text style={styles.title}>Fitness Assistant</Text>
        {/* CHAT SECTION STARTS HERE */}
        <View style={styles.conversation}>
          <View style={styles.chatContainer}>
            {/* BOT/USER DIALOGUE HERE */}
          </View>
          <View style={styles.typingIndicator} />
          <View style={styles.userInputForm}>
            <TextInput style={styles.userInput} />
            <TouchableOpacity style={styles.submitBtn}>
              <Image style={styles.btnIcon} source={require('../assets/send.png')} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.sncBtn}>
            <Text>NEW CHAT</Text>
          </TouchableOpacity>
        </View>
        {/* ****************************************************************** */}
        {/* CHAT HISTORY SECTION */}
        <View style={styles.chatHistoryWrapper}>
          <Text style={styles.chP}>Chat History</Text>
          {/* <View style={styles.chatHistory} id="chat-history"> */}
          {/* Messages will be displayed here */}
          {/* </View> */}
          <View style={styles.conversationList}>
            {/* Old conversations will be listed here */}
          </View>
        </View>
        {/* ****************************************************************** */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    body: {
      minHeight: '100%',
      padding: 16,
    },
    page: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    title: {
      color: '#000000',
      fontFamily: 'Homenaje',
      padding: 16,
    },
    hamburgerMenu: {
      width: 40,
      height: 40,
      position: 'absolute',
      top: 15,
      right: 15,
      justifyContent: 'space-around',
      alignItems: 'center',
      zIndex: 2,
    },
    line: {
      width: '100%',
      height: 3,
      backgroundColor: 'black',
    },
    sideMenu: {
      width: 0,
      height: '100%',
      position: 'absolute',
      top: 0,
      right: 0,
      backgroundColor: '#f1f1f1',
      overflow: 'hidden',
      zIndex: 1,
      fontFamily: 'Montserrat',
    },
    menuItem: {
      padding: 10,
    },
    contentsWrapper: {
      flex: 1,
      padding: 10,
    },
    conversation: {
      flex: 1,
      marginBottom: 20,
    },
    chatContainer: {
      width: '100%',
      minHeight: 300,
      maxHeight: 400,
      borderRadius: 4,
      backgroundColor: 'rgba(168, 168, 168, 0.173)',
    },
    hidden: {
      display: 'none',
    },
    typingIndicator: {
      height: 20,
      // Styles for the typing indicator
    },
    chatForm: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    userInput: {
      flex: 1,
      // Styles for the user input text input
    },
    submitBtn: {
      padding: 10,
      // Styles for the submit button
    },
    btnIcon: {
      width: 24,
      height: 24,
    },
    sncBtn: {
      width: '100%',
      justifyContent: 'center',
      borderRadius: 5,
      padding: 10,
      backgroundColor: 'rgb(150, 150, 150)',
      color: 'white',
      fontFamily: 'Montserrat',
      marginTop: 20,
    },
    chatHistoryWrapper: {
      borderRadius: 5,
      marginVertical: 16,
      backgroundColor: 'rgba(168, 168, 168, 0.173)',
      minHeight: 200,
    },
    chP: {
      padding: 10,
      fontFamily: 'Arial, Helvetica, sans-serif',
    },
    conversationList: {
      flex: 1,
      display: 'contents',
    },
})

export default FitAssistantScreen;

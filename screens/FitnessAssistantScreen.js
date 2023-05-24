import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';

function FitAssistantScreen() {
  const [currentMessage, setCurrentMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const scrollViewRef = useRef();

  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [conversation]);

  const sendMessageToAPI = async (message) => {
    setIsLoading(true);

    // Here, you make your API call and handle the response
    // Let's simulate this with a setTimeout function
    setTimeout(() => {
      // Simulated bot response
      const botResponse = `You said "${message}"`;

      // Add the bot's response to the conversation
      setConversation(prevConversation => [...prevConversation, { sender: 'bot', message: botResponse }]);

      setIsLoading(false);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (currentMessage) {
      // Add user's message to the conversation
      setConversation(prevConversation => [...prevConversation, { sender: 'user', message: currentMessage }]);

      sendMessageToAPI(currentMessage);
      setCurrentMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentsWrapper}>
        <Text style={styles.title}>Fitness Assistant</Text>

        <View style={styles.conversation}>
          <ScrollView ref={scrollViewRef}>
            {conversation.map((messageObj, index) => (
              <View key={index} style={messageObj.sender === 'user' ? styles.userMessage : styles.botMessage}>
                <Text>{messageObj.message}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.userInputForm}>
            <TextInput 
              style={styles.userInput} 
              onChangeText={setCurrentMessage} 
              value={currentMessage}
              placeholder="Type your message here"
            />
            <TouchableOpacity style={styles.submitBtn} onPress={handleSendMessage} disabled={isLoading}>
              <Image style={styles.btnIcon} source={require('../assets/send.png')} />
            </TouchableOpacity>
          </View>
  
          <TouchableOpacity style={styles.sncBtn}>
            <Text style={styles.sncBtnText}>NEW CHAT</Text>
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
  },
  contentsWrapper: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  conversation: {
    flex: 1,
    marginBottom: 20,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0084FF',
    borderRadius: 20,
    marginBottom: 10,
    padding: 10,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E1E1E1',
    borderRadius: 20,
    marginBottom: 10,
    padding: 10,
  },
  userInputForm: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: 8,
    marginBottom: 10,
  },
  userInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  submitBtn: {
    padding: 10,
  },
  btnIcon: {
    width: 30,
    height: 30,
  },
  sncBtn: {
    backgroundColor: '#808080',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sncBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default FitAssistantScreen;

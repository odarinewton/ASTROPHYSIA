import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const Chattychatty = () => {
  // State to hold chat messages
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello! How are you?', sender: 'User' },
    { id: '2', text: 'I am doing well! What about you?', sender: 'Other' },
  ]);

  // State to hold the input value
  const [inputText, setInputText] = useState('');

  // Function to handle sending a message
  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Math.random().toString(),
        text: inputText,
        sender: 'User', // Adjust as necessary
      };
      setMessages([...messages, newMessage]); // Add new message to the state
      setInputText(''); // Clear the input field
    }
  };

  // Render a single message
  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === 'User' ? styles.userMessage : styles.otherMessage,
      ]}
    >
      <Text style={styles.senderTag}>{item.sender}</Text>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.chatContainer}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.chatSpace}
      />

      {/* Input area for entering a new message */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message"
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    backgroundColor: '#2C003E', // Already in hex
  },
  chatSpace: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: '75%',
  },
  userMessage: {
    backgroundColor: '#008000', // Green
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#FFFFFF', // White
    alignSelf: 'flex-start',
  },
  senderTag: {
    fontWeight: 'bold',
    color:'#9C099E',
    marginBottom: 5,
  },
  messageText: {
    fontSize: 23,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#808080', // Grey
    borderTopWidth: 2,
    borderRadius: 15,
    borderColor: '#E5E5E5', // Already in hex
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E5E5', // Already in hex
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 23,
    height: 40,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#25D366', // Already in hex
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  sendButtonText: {
    color: '#FFFFFF', // Already in hex
    fontWeight: 'bold',
    fontSize: 16,
  },
});


export default Chattychatty;

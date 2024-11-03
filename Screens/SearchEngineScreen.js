import React from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

// Import the logo
const logo = require('../assets/AI_astrophysialogo.png');

const ChatMessage = ({ message, sender }) => (
  <View style={[styles.messageContainer, sender === 'ai' ? styles.aiMessage : styles.userMessage]}>
    <Text style={styles.messageText}>{message}</Text>
  </View>
);

const SearchEngineScreen = () => {
  const [query, setQuery] = React.useState("");
  const [messages, setMessages] = React.useState([]);

  const handleSearch = () => {
    if (query.trim()) {
      const newMessage = { id: messages.length.toString(), text: query, sender: 'user' };
      const aiResponse = { id: (messages.length + 1).toString(), text: `AI coming soon, for now just keep the question: ${query}`, sender: 'ai' };
      setMessages([...messages, newMessage, aiResponse]);
      setQuery("");
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>AI Astrophysia</Text>
      <Text style={styles.subtitle}>
        Explore the universe, computing, science, and engineering with a personal artificial scientist -- experimental
      </Text>
      <TouchableOpacity style={styles.clearButton} onPress={clearMessages}>
        <Text style={styles.clearButtonText}>Clear Responses</Text>
      </TouchableOpacity>

      <FlatList
        data={messages}
        renderItem={({ item }) => <ChatMessage message={item.text} sender={item.sender} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your query here..."
          placeholderTextColor="#ccc"
          onChangeText={setQuery}
          value={query}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.headerTitle}>AWAITING REGULATORY APPROVAL FOR DEPLOYMENT</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#001F3F', // Dark background for a futuristic feel
  },
  logo: {
    width: '100%', // Full width of the screen
    height: 150, // Adjust height as needed
    marginBottom: 20, // Space between logo and title
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  clearButton: {
    backgroundColor: '#F75842',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  clearButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  chatContainer: {
    paddingBottom: 100,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: '75%', // Limit width for messages
  },
  userMessage: {
    backgroundColor: '#0A2F4E', // User message color
    alignSelf: 'flex-start', // Align to the left
  },
  aiMessage: {
    backgroundColor: '#F9A602', // AI message color
    alignSelf: 'flex-end', // Align to the right
  },
  messageText: {
    color: '#ffffff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#0A2F4E',
    borderRadius: 5,
    padding: 10,
    color: '#ffffff',
    marginRight: 10,
  },
  button: {
    backgroundColor: '#F75842',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SearchEngineScreen;

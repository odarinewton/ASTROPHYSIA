import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const SupportUsScreen = () => {
  const handleLearnMore = () => {
    // to Replace with the URL to redirect to
    Linking.openURL('https://www.example.com');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Support Us</Text>
      <Text style={styles.infoText}>
        Your support helps us continue our mission of furthering student projects and financing us to keep the platform maintained.
      </Text>
      <Text style={styles.accountInfo}>
        Account Number: <Text style={styles.highlight}>[ACCOUNT NUMBER COMING SOON]</Text>
      </Text>
      <Text style={styles.infoText}>
        If you would like to contribute, please consider making a donation. Every little bit helps!
      </Text>
      <Text style={styles.thankYouText}>Thank you for your support!</Text>
      <TouchableOpacity style={styles.button} onPress={handleLearnMore}>
        <Text style={styles.buttonText}>Learn More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#001F3F', // Dark background for a futuristic feel
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F9A602', // Highlighted color for the title
    textAlign: 'center',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 15,
    textAlign: 'center',
  },
  accountInfo: {
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#F75842', // Highlighted text color
  },
  thankYouText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic', // Italic for a nice touch
  },
  button: {
    backgroundColor: '#F75842',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SupportUsScreen;


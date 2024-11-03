
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, Linking, Image } from 'react-native';

import Chattychatty from './chattychatty';

export default function ChatScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  // Data for different platforms and their groups
  const platformGroups = {
    whatsapp: [
      { name: 'UNNASSA Group', link: 'https://chat.whatsapp.com/unnassa' },
      { name: 'Radasafi Group', link: 'https://chat.whatsapp.com/radasafi' },
      { name: 'Mars Society Group', link: 'https://chat.whatsapp.com/marssociety' },
    ],
    instagram: [{ name: 'UNNASSA', link: 'https://instagram.com/unnassa' }],
    x: [
      { name: 'Astronights Group', link: 'https://x.com/astronights' },
      { name: 'UNNASSA Group', link: 'https://x.com/unnassa' },
    ],
    linkedin: [
      { name: 'UNNASSA', link: 'https://linkedin.com/unnassa' },
      { name: 'Astronight', link: 'https://linkedin.com/astronight' },
      { name: 'NASA', link: 'https://linkedin.com/nasa' },
      { name: 'DarkSky Africa', link: 'https://linkedin.com/darkskyafrica' },
      { name: 'Mars Society Kenya', link: 'https://linkedin.com/marssocietykenya' },
    ],
    facebook: [{ name: 'UNNASSA', link: 'https://facebook.com/unnassa' }],
  };

  // Function to handle logo click and show groups for that platform
  const openPlatformGroups = (platform) => {
    setSelectedPlatform(platform);
    setModalVisible(true);
  };

  // Function to handle group click and open the link
  const openGroupLink = (link) => {
    Linking.openURL(link);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Chat and Interact</Text>

      {/* Clickable tabs for social platforms */}
      <View style={styles.platformTabs}>
        <TouchableOpacity onPress={() => openPlatformGroups('whatsapp')}>
          <Image source={require('../assets/whatsapp.png')} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openPlatformGroups('x')}>
          <Image source={require('../assets/X.png')} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openPlatformGroups('instagram')}>
          <Image source={require('../assets/instagram.png')} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openPlatformGroups('linkedin')}>
          <Image source={require('../assets/linkedin.png')} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openPlatformGroups('facebook')}>
          <Image source={require('../assets/facebook.png')} style={styles.logo} />
        </TouchableOpacity>
      </View>

      {/* Modal for showing platform groups */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedPlatform ? selectedPlatform.toUpperCase() + ' Groups' : ''}
            </Text>
            <FlatList
              data={platformGroups[selectedPlatform]}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => openGroupLink(item.link)}>
                  <Text style={styles.groupItem}>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Chat space: remove or debug SendBird components */}
      <View style={styles.chatSpace}>
         <Chattychatty/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0A1931' },
  sectionTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 20, textAlign: 'center' },
  platformTabs: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  logo: { width: 50, height: 50 },
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', padding: 20, marginHorizontal: 20, borderRadius: 10, alignItems: 'center' },
  modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  groupItem: { fontSize: 18, color: '#1E90FF', marginVertical: 10 },
  closeButton: { backgroundColor: '#8B4513', padding: 10, borderRadius: 8, marginTop: 20 },
  closeButtonText: { color: '#fff', fontWeight: 'bold' },
  chatSpace: { flex: 1, backgroundColor: '#2C003E', padding: 10, borderRadius: 8, marginTop: 20 },
});

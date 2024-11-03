import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, FlatList, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import { MaterialIcons } from '@expo/vector-icons'; // For button icons

export default function SocialMediaScreen() {
  const [media, setMedia] = useState([]);
  const [backendMedia, setBackendMedia] = useState([]);

  // Fetch media (reels and stories) from backend
  useEffect(() => {
    requestPermissions();
    fetchBackendMedia();
  }, []);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissions required', 'Sorry, we need camera roll permissions to make this work!');
    }
  };

  // Fetch media (reels and stories) from the backend
  const fetchBackendMedia = async () => {
    try {
      const response = await fetch('https://astrophysia.com/api/get-media');
      const data = await response.json();
      setBackendMedia(data.media);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch media from the backend');
    }
  };

  // Function to pick media from device
  const pickMedia = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setMedia([...media, result.uri]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to pick media');
    }
  };

  // Function to share media across platforms
  const shareToSocial = async (uri) => {
    try {
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert('Error', 'Sharing is not available on this device');
        return;
      }

      await Sharing.shareAsync(uri, {
        dialogTitle: 'Share to Social Media',
        mimeType: 'image/*', 
      });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to share media');
    }
  };

  // Function to link and post content to backend for social media integration
  const linkToSocialPlatforms = async () => {
    try {
      const response = await fetch('https://newsapi.org/v2/top-headlines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ media }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Content successfully linked to social media platforms.');
      } else {
        Alert.alert('Error', 'Failed to link content to platforms.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to post content to social media platforms');
    }
  };

  // View to display media picked from device
  const renderMediaItem = ({ item }) => (
    <View style={styles.mediaItem}>
      <Image source={{ uri: item }} style={styles.mediaImage} />
      <Button title="Share" onPress={() => shareToSocial(item)} />
    </View>
  );

  // View to display backend reels and stories
  const renderBackendMediaItem = ({ item }) => (
    <View style={styles.mediaItem}>
      <Image source={{ uri: item.uri }} style={styles.mediaImage} />
      <Text style={styles.mediaCaption}>{item.caption}</Text>
    </View>
  );

  return (
      <View style={styles.container}>
        <View style={styles.topButtonsContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={pickMedia}>
            <MaterialIcons name="add-photo-alternate" size={30} color="white" />
            <Text style={styles.iconButtonText}>Pick Media</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={linkToSocialPlatforms}>
            <MaterialIcons name="link" size={30} color="white" />
            <Text style={styles.iconButtonText}>LINK ME TO OUR SOCIAL MEDIA PLATFORMS</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Social Media Integration</Text>

        {/* Scrollable reels and stories from backend */}
        <Text style={styles.subTitle}>ASTROMEDIA</Text>
        
        {/* Directly using FlatList with horizontal scrolling */}
        <FlatList
          data={backendMedia}
          renderItem={renderBackendMediaItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true} // Enabling horizontal scrolling
          showsHorizontalScrollIndicator={true} // Optional: Hide scroll indicator
        />

        {media.length > 0 ? (
          <FlatList
            data={media}
            renderItem={renderMediaItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.mediaList}
            scrollEnabled={false} // Disable scrolling if necessary
          />
        ) : (
          <Text style={styles.noMediaText}>No media selected yet.</Text>
        )}
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F3D', // Deep blue background
    padding: 20,
    alignItems: 'center',
  },
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  iconButton: {
    backgroundColor: '#8B4513', // Brown color for buttons
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
    textAlign: 'center',
    textShadowColor: '#4A4A4A',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  subTitle: {
    fontSize: 20,
    color: '#FFF',
    marginBottom: 10,
  },
  mediaList: {
    width: '100%',
  },
  mediaItem: {
    marginVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 5,
  },
  mediaImage: {
    width: 280,
    height: 280,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  mediaCaption: {
    color: '#FFF',
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
  noMediaText: {
    fontSize: 18,
    color: '#CCC',
    marginVertical: 20,
  },
});

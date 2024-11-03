import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Image 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';


export default function OpportunitiesScreen() {
  const [opportunities, setOpportunities] = useState([
    {
      id: 1,
      description: 'Summer Internship at NASA',
      link: 'https://nasa.gov/internships',
      userDetails: 'Alice Johnson - alice@example.com',
      image: 'https://dummyimage.com/150x100/000/fff&text=NASA',
      verified: true
    },
    {
      id: 2,
      description: 'Scholarship for Astrophysics Students',
      link: 'https://scholarships.com/astrophysics',
      userDetails: 'Bob Smith - bob@example.com',
      image: 'https://dummyimage.com/150x100/000/fff&text=Scholarship',
      verified: false
    },
    {
      id: 3,
      description: 'Space Exploration Conference 2024',
      link: 'https://spaceconference2024.com',
      userDetails: 'Charlie Brown - charlie@example.com',
      image: 'https://dummyimage.com/150x100/000/fff&text=Conference',
      verified: true
    },

    {
        id: 4,
        description: 'Space Exploration Conference 2024',
        link: 'https://spaceconference2024.com',
        userDetails: 'Charlie Brown - charlie@example.com',
        image: 'https://dummyimage.com/150x100/000/fff&text=DEBATES.COM',
        verified: true
      }
  ]);

  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [userDetails, setUserDetails] = useState('');
  const [image, setImage] = useState(null);

  // Function to post a new opportunity
  const postOpportunity = () => {
    if (description && link && userDetails) {
      const newOpportunity = {
        id: opportunities.length + 1,
        description,
        link,
        userDetails,
        image,
        verified: true // Set this based on your verification logic
      };
      setOpportunities([...opportunities, newOpportunity]);
      setDescription('');
      setLink('');
      setUserDetails('');
      setImage(null);
    } else {
      alert('Please provide description, link, and user details!');
    }
  };

  // Function to pick an image
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Opportunities Hub</Text>
      <Text>Share internship opportunities, scholarships, events, etc.</Text>

      {/* Input for opportunity description */}
      <TextInput
        style={styles.input}
        placeholder="Brief description of the opportunity"
        value={description}
        onChangeText={setDescription}
      />
      {/* Input for opportunity link */}
      <TextInput
        style={styles.input}
        placeholder="Opportunity link"
        value={link}
        onChangeText={setLink}
      />
      {/* Input for user details */}
      <TextInput
        style={styles.input}
        placeholder="Your Name - Your Email"
        value={userDetails}
        onChangeText={setUserDetails}
      />
      {/* Button to pick an image */}
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.buttonText}>{image ? 'Change Image' : 'Pick an Image'}</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}

      {/* Button to post the opportunity */}
      <TouchableOpacity style={styles.postButton} onPress={postOpportunity}>
        <Text style={styles.buttonText}>Post Opportunity</Text>
      </TouchableOpacity>

      {/* List of posted opportunities */}
      <FlatList
        data={opportunities}
        renderItem={({ item }) => (
          <View style={styles.opportunityItem}>
            <Image source={{ uri: item.image }} style={styles.opportunityImage} />
            <Text style={styles.opportunityDescription}>{item.description}</Text>
            <Text style={styles.userDetails}>{item.userDetails}</Text>
            <Text style={styles.verifiedTag}>{item.verified ? '✅ Verified' : '❌ Not Verified'}</Text>
            <TouchableOpacity onPress={() => alert(`Opening link: ${item.link}`)}>
              <Text style={styles.opportunityLink}>{item.link}</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0A1931', // Dark blue background
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  imagePicker: {
    backgroundColor: '#8B4513', // Brown button
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  postButton: {
    backgroundColor: '#8B4513', // Brown button
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  opportunityItem: {
    backgroundColor: '#102542', // Slightly lighter dark blue
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  opportunityImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  opportunityDescription: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  userDetails: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  verifiedTag: {
    color: 'orange',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  opportunityLink: {
    color: '#1E90FF', // Bright link color
    fontSize: 14,
  },
});
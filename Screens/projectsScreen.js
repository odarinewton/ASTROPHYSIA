import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Animated } from 'react-native';

export default function ProjectsScreen() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const demoProject = {
    id: 0,
    title: "Demo Project: Astrophysics Research",
    manager: "Prof. John Doe",
    members: "Dr. Esla, Mr Grey, Ms. Aluta",
    description: "A demo project focused on deep space exploration and astrophysical phenomena. This project is open to students who are interested in learning about astronomy and physics.",
    needsMembers: true,
    articles: [
      { title: "Dark Matter and Galaxy Formation", journal: "Astrophysics Journal" },
      { title: "Black Holes: A New Perspective", journal: "Space Science Review" }
    ]
  };

  const fetchProjects = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await fetch('https://astrophysia.com/api/get-projects');
      const data = await response.json();
      setProjects([...data.projects, demoProject]);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setProjects([demoProject]);
      Alert.alert('Error', 'Failed to load projects. Displaying demo project.');
    } finally {
      setIsLoading(false);
    }
  };

  const joinProject = async (projectId) => {
    try {
      const response = await fetch(`https://astrophysia.com/api/join-project/${projectId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        Alert.alert('Success', 'You have successfully joined the project!');
      } else {
        Alert.alert('Error', 'Failed to join the project.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to join project.');
    }
  };

  const renderProjectItem = ({ item }) => (
    <Animated.View style={styles.projectItem}>
      <Text style={styles.projectTitle}>{item.title}</Text>
      <Text style={styles.managerProjectInfo}>Managed by: {item.manager}</Text>
      <Text style={styles.managerProjectInfo}>Members: {item.members}</Text>
      <Text style={styles.projectInfo}>Description: {item.description}</Text>
      {item.needsMembers && (
        <Text style={styles.additionalMembersText}>This project is looking for additional members!</Text>
      )}
      {item.articles && (
        <View>
          <Text style={styles.articlesTitle}>Published Articles:</Text>
          {item.articles.map((article, index) => (
            <Text key={index} style={styles.article}>{article.title} - {article.journal}</Text>
          ))}
        </View>
      )}
      <TouchableOpacity style={styles.joinButton} onPress={() => joinProject(item.id)}>
        <Text style={styles.buttonText}>Join Project</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Projects</Text>
      {isLoading ? (
        <Text style={styles.loadingText}>Loading projects...</Text>
      ) : isError ? (
        <FlatList
          data={[demoProject]}
          renderItem={renderProjectItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <FlatList
          data={projects.length > 0 ? projects : [demoProject]}
          renderItem={renderProjectItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
        />

      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#001F3F', // Dark futuristic blue
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: '#F9A602',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  projectItem: {
    backgroundColor: '#0A2F4E', // Deep blue for project items
    padding: 20,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: '#ffffff',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  projectTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  additionalMembersText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F9A602', // Highlight with futuristic yellow
    marginBottom: 5,
  },
  articlesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
  },
  article: {
    fontSize: 14,
    color: '#00A4CC',
    marginBottom: 5,
  },
  joinButton: {
    backgroundColor: '#F75842',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingText: {
    fontSize: 24,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 50,
  },
  projectInfo: {
    color: "#ffffff",
    fontSize: 18,
    marginBottom: 10,
  },
  managerProjectInfo: {
    color: "lightgreen",
    fontSize: 20,
    marginBottom: 5,
  },
});

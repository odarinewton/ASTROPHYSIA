import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotesScreen = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("1st Year"); // Default selected year

  useEffect(() => {
    loadNotes();
  }, [selectedYear]); // Re-load notes when selectedYear changes

  const loadNotes = async () => {
    try {
      const onlineNotes = await fetchNotesFromServer();
      setNotes(onlineNotes);
      setFilteredNotes(onlineNotes.filter(note => note.year === selectedYear));
    } catch (error) {
      const offlineNotes = await loadOfflineNotes();
      setNotes(offlineNotes);
      if (Array.isArray(offlineNotes)) {
        setFilteredNotes(offlineNotes.filter(note => note.year === selectedYear));
      } else {
        Alert.alert('Error', 'No offline notes found.');
      }
      Alert.alert('Error', 'Failed to load online notes. Loaded offline notes instead.');
    }
  };

  const fetchNotesFromServer = async () => {
    const response = await fetch('https://example.com/api/notes'); 
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.notes;
  };

  const loadOfflineNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem("notes");
      return storedNotes ? JSON.parse(storedNotes) : [];
    } catch (error) {
      console.error("Failed to load offline notes:", error);
      return [];
    }
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setFilteredNotes(notes.filter(note => note.year === year)); // Filter based on selected year
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.year.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredNotes(filtered.filter(note => note.year === selectedYear));
    } else {
      setFilteredNotes(notes.filter(note => note.year === selectedYear));
    }
  };

  const saveNoteOffline = async (note) => {
    try {
      const storedNotes = await AsyncStorage.getItem("notes");
      const notes = storedNotes ? JSON.parse(storedNotes) : [];
      notes.push(note);
      await AsyncStorage.setItem("notes", JSON.stringify(notes));
      Alert.alert('Success', 'Note saved offline!');
    } catch (error) {
      console.error("Failed to save note offline:", error);
      Alert.alert('Error', 'Failed to save note offline.');
    }
  };

  const NoteCard = ({ note }) => (
    <View style={styles.noteCard}>
      <Text style={styles.noteTitle}>{note.title}</Text>
      <Text style={styles.noteYear}>{note.year}</Text>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => saveNoteOffline(note)}
      >
        <Text style={styles.saveButtonText}>Save Offline</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Study Notes Repository</Text>
      <View style={styles.tabContainer}>
        {['1st Year', '2nd Year', '3rd Year', '4th Year'].map(year => (
          <TouchableOpacity
            key={year} // Use year as key since it is unique
            style={[styles.tabButton, selectedYear === year && styles.activeTab]}
            onPress={() => handleYearChange(year)}
          >
            <Text style={styles.tabText}>{year}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search notes..."
        placeholderTextColor="#ccc"
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <FlatList
        data={filteredNotes}
        renderItem={({ item }) => <NoteCard note={item} />}
        keyExtractor={(item) => item.id} // Ensure unique keys for notes
        contentContainerStyle={styles.notesContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#001F3F', // Dark background for a futuristic look
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tabButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#0A2F4E',
  },
  activeTab: {
    backgroundColor: '#F75842', // Highlight active tab
  },
  tabText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  searchInput: {
    backgroundColor: '#0A2F4E',
    borderRadius: 10,
    padding: 10,
    color: '#ffffff',
    marginBottom: 20,
  },
  notesContainer: {
    paddingBottom: 100,
  },
  noteCard: {
    backgroundColor: '#0A2F4E', // Card background color
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#ffffff',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  noteYear: {
    fontSize: 16,
    color: '#F9A602', // Highlight year
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#F75842',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default NotesScreen;

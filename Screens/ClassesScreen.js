import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput } from 'react-native';

function ClassesScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [newReminder, setNewReminder] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dummy data for classes, past papers, and lecturers
  const classesData = [
    { 
      year: '1st Year Degree', 
      subjects: [
        { name: 'Math 101', lecturers: [{ name: 'Dr. John Doe', email: 'john.doe@example.com' }] },
        { name: 'Physics 101', lecturers: [{ name: 'Prof. Jane Smith', email: 'jane.smith@example.com' }] },
        { name: 'Chemistry 101', lecturers: [{ name: 'Dr. Alice Johnson', email: 'alice.j@example.com' }] },
      ]
    },
    { 
      year: '2nd Year Degree', 
      subjects: [
        { name: 'Math 201', lecturers: [{ name: 'Dr. Bob Brown', email: 'bob.brown@example.com' }] },
        { name: 'Physics 201', lecturers: [{ name: 'Dr. Mary Green', email: 'mary.green@example.com' }] },
        { name: 'Chemistry 201', lecturers: [{ name: 'Dr. Lisa White', email: 'lisa.white@example.com' }] },
      ]
    },
    { 
      year: '3rd Year Degree', 
      subjects: [
        { name: 'Math 301', lecturers: [{ name: 'Prof. Tom Blue', email: 'tom.blue@example.com' }] },
        { name: 'Physics 301', lecturers: [{ name: 'Dr. Sarah Black', email: 'sarah.black@example.com' }] },
        { name: 'Chemistry 301', lecturers: [{ name: 'Dr. Emma Grey', email: 'emma.grey@example.com' }] },
      ]
    },
    { 
      year: '4th Year Degree', 
      subjects: [
        { name: 'Math 401', lecturers: [{ name: 'Prof. Richard Yellow', email: 'richard.yellow@example.com' }] },
        { name: 'Physics 401', lecturers: [{ name: 'Dr. Nancy Orange', email: 'nancy.orange@example.com' }] },
        { name: 'Chemistry 401', lecturers: [{ name: 'Dr. Karen Pink', email: 'karen.pink@example.com' }] },
      ]
    },
    { 
      year: 'Masters', 
      subjects: [
        { name: 'Advanced Math', lecturers: [{ name: 'Dr. Paul Red', email: 'paul.red@example.com' }] },
        { name: 'Quantum Physics', lecturers: [{ name: 'Prof. Nancy Gold', email: 'nancy.gold@example.com' }] },
      ]
    },
    { 
      year: 'PhD', 
      subjects: [
        { name: 'Research Methods', lecturers: [{ name: 'Dr. Leo Silver', email: 'leo.silver@example.com' }] },
        { name: 'Thesis Preparation', lecturers: [{ name: 'Prof. Kate Bronze', email: 'kate.bronze@example.com' }] },
      ]
    },
  ];

  const filteredClasses = classesData.map(classData => ({
    ...classData,
    subjects: classData.subjects.filter(subject => 
      subject.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(classData => classData.subjects.length > 0);

  const setReminder = () => {
    // Logic to handle reminders (e.g., save to state or send notification)
    console.log('Reminder set:', newReminder);
    setNewReminder('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Classes and Past Papers</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search for classes..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredClasses}
        keyExtractor={(item) => item.year}
        renderItem={({ item }) => (
          <View style={styles.classItem}>
            <Text style={styles.classTitle}>{item.year}</Text>
            {item.subjects.map((subject, index) => (
              <View key={index} style={styles.subjectContainer}>
                <Text style={styles.subjectText}>{subject.name}</Text>
                <Text style={styles.lecturerTitle}>Lecturers:</Text>
                {subject.lecturers.map((lecturer, idx) => (
                  <Text key={idx} style={styles.lecturerText}>
                    {lecturer.name} ({lecturer.email})
                  </Text>
                ))}
              </View>
            ))}
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.reminderButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.reminderButtonText}>set reminder note to what you want to read next</Text>
      </TouchableOpacity>

      {/* Modal for setting reminders */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Set a Reminder</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter reminder details"
              value={newReminder}
              onChangeText={setNewReminder}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={setReminder}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2C003E', // Very dark purple-blue
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  classItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#3B0044', // Slightly lighter for contrast
    borderRadius: 8,
  },
  classTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700', // Gold color for the title
  },
  subjectContainer: {
    marginVertical: 5,
  },
  subjectText: {
    fontSize: 18,
    color: '#fff',
  },
  lecturerTitle: {
    fontWeight: 'bold',
    color: '#FFD700',
  },
  lecturerText: {
    color: '#fff',
  },
  reminderButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  reminderButtonText: {
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '100%',
    marginBottom: 10,
    padding: 10,
  },
  submitButton: {
    backgroundColor: '#742DDD',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#8B4513',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ClassesScreen;

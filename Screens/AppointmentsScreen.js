import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  Alert, 
  TextInput 
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function AppointmentsScreen() {
  const [reminder, setReminder] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [manualProfessorEmail, setManualProfessorEmail] = useState('');
  const [manualInput, setManualInput] = useState(false);
  const [submissions, setSubmissions] = useState([]); // State to store submissions

  // Dummy list of professors with their emails and images
  const professors = [
    { id: 1, name: 'Dr. Jane Smith', email: 'jane.smith@university.edu', image: 'https://dummyimage.com/100x100/000/fff&text=JS' },
    { id: 2, name: 'Prof. John Doe', email: 'john.doe@university.edu', image: 'https://dummyimage.com/100x100/000/fff&text=JD' },
    { id: 3, name: 'Dr. Emma Taylor', email: 'emma.taylor@university.edu', image: 'https://dummyimage.com/100x100/000/fff&text=ET' },
    { id: 4, name: 'Dr. Semma Daylor', email: 'emma.taylor@university.edu', image: 'https://dummyimage.com/100x100/000/fff&text=SD' },
  ];

  // Function to handle booking telescope for viewing
  const bookTelescope = () => {
    const telescopeBooking = `Telescope booked for home streaming or in-person viewing`;
    setSubmissions([...submissions, { type: 'Telescope', detail: telescopeBooking }]);
    Alert.alert('Telescope Booked', telescopeBooking);
  };

  // Function to handle appointment booking with professor
  const bookAppointment = (professorEmail, professorName) => {
    if (!userEmail) {
      Alert.alert('Error', 'Please enter your email to book the appointment.');
      return;
    }

    const appointmentDetails = `Appointment with ${professorName} (${professorEmail}) requested by ${userEmail}`;
    setSubmissions([...submissions, { type: 'Appointment', detail: appointmentDetails }]);
    Alert.alert('Appointment Requested', appointmentDetails);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Appointments and Requests</Text>

      {/* Display Submitted Appointments, Telescope Bookings, etc. */}
      {submissions.length > 0 && (
        <View style={styles.submissionsContainer}>
          <Text style={styles.submissionTitle}>Submitted Requests:</Text>
          {submissions.map((submission, index) => (
            <Text key={index} style={styles.submissionText}>
              {submission.detail}
            </Text>
          ))}
        </View>
      )}


      {/* Book Appointments with Professors */}
      {!manualInput ? (
        <>
          <Text style={styles.subTitle}>Book Appointments with Professors</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={userEmail}
            onChangeText={setUserEmail}
            keyboardType="email-address"
          />
          <FlatList
            data={professors}
            renderItem={({ item }) => (
              <View style={styles.professorItem}>
                <Image source={{ uri: item.image }} style={styles.professorImage} />
                <View style={styles.professorDetails}>
                  <Text style={styles.professorName}>{item.name}</Text>
                  <Text>{item.email}</Text>
                  <TouchableOpacity
                    style={styles.bookButton}
                    onPress={() => bookAppointment(item.email, item.name)}
                  >
                    <Text style={styles.buttonText}>Book Appointment</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      ) : (
        <>
          <Text style={styles.subTitle}>Manual Appointment Booking</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={userEmail}
            onChangeText={setUserEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter professor's email"
            value={manualProfessorEmail}
            onChangeText={setManualProfessorEmail}
            keyboardType="email-address"
          />
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => bookAppointment(manualProfessorEmail, 'Manual Professor')}
          >
            <Text style={styles.buttonText}>Book Appointment Manually</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setManualInput(!manualInput)}
      >
        <Text style={styles.buttonText}>
          {manualInput ? 'Switch to Professor List' : 'Manual Input'}
        </Text>
      </TouchableOpacity>

      {/* Book Telescope for Viewing */}
      <TouchableOpacity style={styles.telescopeButton} onPress={bookTelescope}>
        <Text style={styles.buttonText}>Book Telescope for Viewing</Text>
      </TouchableOpacity>

      {/* Set Reminders for Events */}
      <TouchableOpacity style={styles.reminderButton} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.buttonText}>Set Reminder for Astronights and other events</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setReminder(selectedDate);
              Alert.alert('Reminder Set', `Reminder set for ${selectedDate.toLocaleString()}`);
            }
          }}
        />
      )}

      {reminder && <Text>Reminder set for: {reminder.toLocaleString()}</Text>}
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
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  submissionsContainer: {
    backgroundColor: '#102542', // Slightly lighter dark blue
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
  },
  submissionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFA500', // Orange text for title
    marginBottom: 5,
  },
  submissionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFA500', // Bold orange text for submitted appointments
    marginBottom: 5,
  },
  professorItem: {
    flexDirection: 'row',
    backgroundColor: '#102542', // Slightly lighter dark blue
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  professorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  professorDetails: {
    marginLeft: 15,
    flex: 1,
  },
  professorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  bookButton: {
    backgroundColor: '#8B4513', // Brown button
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  telescopeButton: {
    backgroundColor: '#6A0DAD', // Purple button for telescope
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  reminderButton: {
    backgroundColor: '#8B4513', // Brown button for reminder
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  toggleButton: {
    backgroundColor: '#6A0DAD', // Purple button for switching input modes
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
  },
});

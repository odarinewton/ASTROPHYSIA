import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';

export default function VotingScreen() {
  const [surveys, setSurveys] = useState([]);
  const [userRequest, setUserRequest] = useState('');
  const [surveyingemail, setsurveyingemail] = useState('')
  const [userPermission, setUserPermission] = useState(false);
  const [studentOpinion, setStudentOpinion] = useState('');
  const [inHouseVote, setInHouseVote] = useState(null);
  const [candidateName, setCandidateName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchActiveSurveys();
  }, []);

  // Fetch currently active surveys from the backend
  const fetchActiveSurveys = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://astrophysia.com/api/get-active-surveys');
      const data = await response.json();
      setSurveys(data.surveys);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch active surveys');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to request permission to host a survey
  const requestSurveyPermission = async () => {
    if (!userRequest) {
      Alert.alert('Input required', 'Please provide a reason or description for your survey.');
      return;
    }

    try {
      const response = await fetch('https://astrophysia.com/api/request-survey-permission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request: userRequest }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Survey permission requested. You will be notified upon approval.');
        setUserRequest('');
      } else {
        Alert.alert('Error', 'Failed to request permission.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Permission request failed');
    }
  };

  // Function to submit student opinion
  const submitOpinion = async () => {
    if (!studentOpinion) {
      Alert.alert('Input required', 'Please express your opinion before submitting.');
      return;
    }

    try {
      const response = await fetch('https://astrophysia.com/api/submit-opinion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ opinion: studentOpinion }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Your opinion has been submitted.');
        setStudentOpinion('');
      } else {
        Alert.alert('Error', 'Failed to submit your opinion.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Opinion submission failed');
    }
  };

  // Function for in-house voting (number selection 1 to 10)
  const inHouseVoting = async () => {
    if (!inHouseVote || !candidateName) {
      Alert.alert('Input required', 'Please select a vote number and provide a candidate name.');
      return;
    }

    try {
      const response = await fetch('https://astrophysia.com/api/in-house-vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidate: candidateName, vote: inHouseVote }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Your vote has been recorded.');
        setInHouseVote(null);
        setCandidateName('');
      } else {
        Alert.alert('Error', 'Failed to record your vote.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'In-house voting failed');
    }
  };

  // Function to render individual surveys
  const renderSurveyItem = ({ item }) => (
    <View style={styles.surveyItem}>
      <Text style={styles.surveyTitle}>{item.title}</Text>
      <Text>{item.description}</Text>

      {/* Voting options for the survey */}
      {item.type === 'leaderElection' ? (
        <View>
          <Text style={styles.subTitle}>Leader Election:</Text>
          <Button title="Vote for Leader A" color="#8B4513" onPress={() => voteForLeader(item.id, 'A')} />
          <Button title="Vote for Leader B" color="#8B4513" onPress={() => voteForLeader(item.id, 'B')} />
        </View>
      ) : (
        <View>
          <Text style={styles.subTitle}>Survey Options:</Text>
          {item.options.map((option, index) => (
            <Button key={index} title={option} color="#8B4513" onPress={() => voteForLeader(item.id, option)} />
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Lets do some Voting and Surveys</Text>

      {/* Host a poll or survey */}
      <Text style={styles.subTitle}>Request to Host a Survey:</Text>
      <TextInput
        style={styles.input}
        placeholder="Why do you want to host a survey?"
        value={userRequest}
        onChangeText={setUserRequest}
      />
      <TextInput
      style={styles.input}
      placeholder="ENTER YOUR EMAIL HERE/ CONTACT INFORMATION IF YOU WANT TO HOST A SURVEY"
      value={surveyingemail}
      onChangeText={setsurveyingemail}/>

      <TouchableOpacity style={styles.button} onPress={requestSurveyPermission}>
        <Text style={styles.buttonText}>Request Permission</Text>
      </TouchableOpacity>

      {/* Display active surveys */}
      <Text style={styles.subTitle}>Active Surveys:</Text>
      {isLoading ? (
        <Text>Loading surveys...</Text>
      ) : (
        <FlatList
          data={surveys}
          renderItem={renderSurveyItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      {/* Submit opinion */}
      <Text style={styles.subTitle}>Submit Your Opinion:</Text>
      <TextInput
        style={styles.input}
        placeholder="Express your opinion here..."
        value={studentOpinion}
        onChangeText={setStudentOpinion}
      />
      <TouchableOpacity style={styles.button} onPress={submitOpinion}>
        <Text style={styles.buttonText}>Submit Opinion</Text>
      </TouchableOpacity>

      {/* In-house voting for more serious votes */}
      <Text style={styles.subTitle}>In-House Voting (Election):</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Candidate Name"
        value={candidateName}
        onChangeText={setCandidateName}
      />
      <View style={styles.numberRow}>
        {[...Array(10).keys()].map((num) => (
          <TouchableOpacity
            key={num + 1}
            style={[
              styles.voteNumberButton,
              inHouseVote === num + 1 && styles.selectedVoteNumber,
            ]}
            onPress={() => setInHouseVote(num + 1)}
          >
            <Text style={styles.voteNumberText}>{num + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.specialVoteButton} onPress={inHouseVoting}>
        <Text style={styles.buttonText}>VOTE</Text>
      </TouchableOpacity>
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
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#8B4513', // Brown color for buttons
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  specialVoteButton: {
    backgroundColor: '#6A0DAD', // Purple color for special VOTE button
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  numberRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  voteNumberButton: {
    width: '18%',
    backgroundColor: '#8B4513', // Brown color for numbers
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },
  selectedVoteNumber: {
    backgroundColor: '#6A0DAD', // Purple for selected vote number
  },
  voteNumberText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  surveyItem: {
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#102542', // Slightly lighter dark blue for surveys
    borderRadius: 10,
  },
  surveyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
});
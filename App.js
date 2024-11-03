import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  View,
  ImageBackground,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
} from "react-native";
import {
  Header,
  Icon,
  Avatar,
  SearchBar,
  Card,
  CheckBox,
  Button,
} from "react-native-elements";
import Slider from "@react-native-community/slider";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import FeedScreen from "./Screens/FeedScreen.js";
import SocialMediaScreen from "./Screens/SocialMediaScreen";
import VotingScreen from "./Screens/VotingScreen.js";
import ProjectsScreen from "./Screens/projectsScreen.js";
import AppointmentsScreen from "./Screens/AppointmentsScreen.js";
import OpportunitiesScreen from "./Screens/OpportunitiesScreen.js";
import ChatScreen from "./Screens/ChatScreen.js";
import ClassesScreen from "./Screens/ClassesScreen.js";
import NotesScreen from "./Screens/NotesScreen.js";
import SearchEngineScreen from "./Screens/SearchEngineScreen.js";
import SupportUsScreen from "./Screens/SupportUsScreen.js";
const logo = require('./assets/AI_astrophysialogo.png');

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("./assets/background.png")}
        style={styles.backgroundImage}
      >
        <LinearGradient colors={["#1e3c72", "brown"]} style={styles.header}>
          <Header
            centerComponent={
              <Text style={styles.headerTitle}>Welcome to Astrophysia</Text>
            }
            backgroundColor="transparent"
          />
          <TouchableOpacity
            style={styles.iconSupport}
            onPress={() => navigation.navigate("SupportUs")}
          >
            <MaterialIcons name="favorite" size={50} color="brown" />
            <Text style={styles.iconText}>Support Us</Text>
          </TouchableOpacity>
        </LinearGradient>

        <SafeAreaView>
          <TouchableOpacity
            style={styles.iconAI}
            onPress={() => navigation.navigate("SearchEngine")}
          >
            <Image source={logo} style={styles.logo} resizeMode="contain" />
            <Text style={styles.AIiconText}>AI Astrophysia </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconGoLive}
            onPress={() => navigation.navigate("GoLive")}
          >
            <MaterialIcons name="live-tv" size={50} color="#FF6347" />
            <Text style={styles.iconText}>MEET</Text>
          </TouchableOpacity>
            <FeedScreen/>
          <TouchableOpacity
            style={styles.iconVote}
            onPress={() => navigation.navigate("Voting")}
          >
            <MaterialIcons name="how-to-vote" size={50} color="#FFA500" />
            <Text style={styles.iconText}>Vote</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconNotes}
            onPress={() => navigation.navigate("Notes")}
          >
            <MaterialIcons name="note" size={50} color="#FF6347" />
            <Text style={styles.iconText}>Notes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconOpportunities}
            onPress={() => navigation.navigate("Opportunities")}
          >
            <MaterialIcons name="work" size={50} color="#FFD700" />
            <Text style={styles.iconText}>Opportunities</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconChat}
            onPress={() => navigation.navigate("Chat")}
          >
            <MaterialIcons name="chat" size={50} color="#00FF7F" />
            <Text style={styles.iconText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconProjects}
            onPress={() => navigation.navigate("Projects")}
          >
            <MaterialIcons name="group-work" size={50} color="#8A2BE2" />
            <Text style={styles.iconText}>Projects</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconSocialMedia}
            onPress={() => navigation.navigate("SocialMedia")}
          >
            <MaterialIcons name="share" size={50} color="#FF4500" />
            <Text style={styles.iconText}>Social Media</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconClasses}
            onPress={() => navigation.navigate("Classes")}
          >
            <MaterialIcons name="class" size={50} color="#4682B4" />
            <Text style={styles.iconText}>Classes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconAppointments}
            onPress={() => navigation.navigate("Appointments")}
          >
            <MaterialIcons name="event" size={50} color="#FF1493" />
            <Text style={styles.iconText}>Appointments</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaView>
  );
}

function GoLiveScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Go Live (coming SOON)</Text>
      <Text>Stream live sessions (e.g., guest lectures, discussions)</Text>
      <Text>Notify followers when someone goes live</Text>
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="SearchEngine" component={SearchEngineScreen} />
        <Stack.Screen name="GoLive" component={GoLiveScreen} />
        <Stack.Screen name="SupportUs" component={SupportUsScreen} />
        <Stack.Screen name="Opportunities" component={OpportunitiesScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Projects" component={ProjectsScreen} />
        <Stack.Screen name="Voting" component={VotingScreen} />
        <Stack.Screen name="Notes" component={NotesScreen} />
        <Stack.Screen name="Appointments" component={AppointmentsScreen} />
        <Stack.Screen name="SocialMedia" component={SocialMediaScreen} />
        <Stack.Screen name="Classes" component={ClassesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logo: {
    right:'25%',
    width: '60%', 
    height: 90, 
    marginTop: 35,
  },
  feed: {
    top: 25,
    height: 1,
  },
  heroSection: {
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#001f3f",
    borderRadius: 15,
  },
  title: {
    fontSize: 54,
    fontWeight: "bold",
    color: "#00c6ff",
    marginBottom: 10,
    textAlign: "center",
  },
  notesContainer: {
    flexGrow: 1,
  },
  noteCard: {
    backgroundColor: "#1c1c1c",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },

  saveButton: {
    alignSelf: "flex-end",
    backgroundColor: "#00c6ff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  searchInput: {
    width: "100%",
    padding: 10,
    borderColor: "#00c6ff",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#1c1c1c",
    color: "#ffffff",
    marginBottom: 20,
  },
  noteYear: {
    fontSize: 14,
    color: "#cccccc",
    marginBottom: 10,
  },
  saveButtonText: {
    color: "#0a0a0a",
  },

  clearButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: "#f00",
    borderRadius: 5,
  },
  clearButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  backgroundImage: {
    flex: 1,
    //resizeMode: 'cover',
    // justifyContent: 'center',
  },
  homeContainer: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    alignItems: "center",
  },
  welcomeMessage: {
    fontSize: 58,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    textShadowColor: "orange",
    textShadowOffset: { width: 5, height: 7 },
    textShadowRadius: 20,
  },
  subTitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: 20,
    textShadowColor: "#FFD700",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  iconContainer: {
    alignItems: "center",
    backgroundColor: "black",
    padding: 15,
    borderRadius: 8,
    width: 100,
    height: 100,
  },
  iconText: {
    color: "yellow",
    marginTop: 5,
    fontSize: 13,
    fontWeight: "bold",
  },
  SSSiconText: {
    color: "white",
    marginTop: 50,
    //fontSize: 3,
    fontWeight: "bold",
  },

  recentNotes: {
    fontSize: 20,
    color: "#FFF",
    marginTop: 20,
  },
  trendingStories: {
    fontSize: 20,
    color: "#FFF",
    marginTop: 20,
  },
  iconAI: {
    position: "absolute",
    top: 5,
    left: 5,
    width: 485,
    height: 75,
    backgroundColor: "teal",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "purple", // Change this to your desired edge color
    borderWidth: 5,
    borderRadius: 20,
  },
  iconGoLive: {
    position: "absolute",
    top: 5,
    left: 495,
    width: 100,
    height: 75,
    backgroundColor: "teal",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "purple", // Change this to your desired edge color
    borderWidth: 5,
  },
  iconSupport: {
    position: "absolute",
    top: 50,
    left: 520,
    width: 60,
    height: 100,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  iconVote: {
    position: "absolute",
    top: 970,
    left: 20,
    width: 79,
    height: 85,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "brown", //"#39FF14", // Change this to your desired edge color
    borderWidth: 3,
  },
  iconNotes: {
    position: "absolute",
    top: 1056,
    left: 20,
    width: 70,
    height: 84,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "brown", // Change this to your desired edge color
    borderWidth: 3,
  },
  iconOpportunities: {
    position: "absolute",
    top: 970,
    right: 20,
    width: 153,
    height: 85,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "brown", // Change this to your desired edge color
    borderWidth: 5,
  },
  iconChat: {
    position: "absolute",
    top: 990,
    left: 170,
    width: 128,
    height: 150,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "brown", // Change this to your desired edge color
    borderWidth: 7,
  },
  iconProjects: {
    position: "absolute",
    top: 990,
    left: 300,
    width: 126,
    height: 150,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "brown", // Change this to your desired edge color
    borderWidth: 7,
  },
  iconSocialMedia: {
    position: "absolute",
    top: 1057,
    right: 20,
    width: 153,
    height: 83,
    backgroundColor: "black", //"#8C92AC",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "brown", // Change this to your desired edge color
    borderWidth: 5,
  },
  iconClasses: {
    position: "absolute",
    top: 970,
    left: 100,
    width: 69,
    height: 83,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderRadius: 5,
    borderColor: "brown", // Change this to your desired edge color
    borderWidth: 3,
  },
  iconAppointments: {
    position: "absolute",
    top: 1055,
    left: 91,
    width: 78,
    height: 85,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "brown", // Change this to your desired edge color
    borderWidth: 3,
  },
  //
  AIiconText: {
    color: 'white',//"#00c6ff",
    fontSize: 25,
    fontWeight: "bold",
    bottom:'90%',
  },
  sectionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },

  container: {
    flex: 1,
    backgroundColor: "#001f3f",
    justifyContent: "center",
    paddingTop: 50,
    alignItems: "center",
  },
  subtitle: {
    fontSize: 26,
    color: "#0FF",
    textAlign: "center",
    marginBottom: 20,
  },
  chatContainer: {
    flexGrow: 1,
    width: "100%",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderColor: "#00c6ff",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#1c1c1c",
    color: "#ffffff",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#00c6ff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
  messageBox: {
    backgroundColor: "#1c1c1c",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  messageText: {
    color: "#ffffff",
  },
  headerTitle: {
    color: "orange", // Bright neon green for a futuristic feel
    fontSize: 42,
  },
});

export default App;

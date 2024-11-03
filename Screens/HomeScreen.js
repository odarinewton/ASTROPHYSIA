import React from "react";
import {
  View,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { Header } from "react-native-elements";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window"); // Gets screen dimensions for responsive layout

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require("./assets/background.png")} style={styles.backgroundImage}>
        {/* Added LinearGradient to enhance header styling */}
        <LinearGradient colors={["#1e3c72", "brown"]} style={styles.header}>
          <Header
            centerComponent={<Text style={styles.headerTitle}>Welcome to Astrophysia</Text>}
            backgroundColor="transparent"
          />
          <TouchableOpacity
            style={styles.iconSupport}
            onPress={() => navigation.navigate("SupportUs")}
          >
            <MaterialIcons name="favorite" size={30} color="brown" />
            <Text style={styles.iconText}>Support Us</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* ScrollView to make content scrollable, useful when font size increases */}
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {/* Icon Section for "AI Astrophysia" */}
          <TouchableOpacity
            style={styles.iconAI}
            onPress={() => navigation.navigate("SearchEngine")}
          >
            <Image source={require('./assets/AI_astrophysialogo.png')} style={styles.logo} resizeMode="contain" />
            <Text style={styles.AIiconText}>AI Astrophysia</Text>
          </TouchableOpacity>

          {/* Icon Section for "GoLive" */}
          <TouchableOpacity style={styles.iconGoLive} onPress={() => navigation.navigate("GoLive")}>
            <MaterialIcons name="live-tv" size={30} color="#FF6347" />
            <Text style={styles.iconText}>MEET</Text>
          </TouchableOpacity>

          {/* Additional icons can be added here following the same pattern */}

        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001f3f",
  },
  backgroundImage: {
    flex: 1,
    width: width, // Full screen width to cover all devices
    height: height,
  },
  header: {
    paddingVertical: 20,
  },
  headerTitle: {
    color: "orange",
    fontSize: 32, // Reduced font size for broader compatibility
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 20,
  },
  iconAI: {
    alignItems: "center",
    backgroundColor: "teal",
    width: width * 0.9, // Responsive width based on screen size
    padding: 10,
    borderRadius: 15,
    marginVertical: 10,
  },
  iconGoLive: {
    alignItems: "center",
    backgroundColor: "teal",
    width: width * 0.9,
    padding: 10,
    borderRadius: 15,
    marginVertical: 10,
  },
  logo: {
    width: width * 0.5, // Logo size adjusted for responsiveness
    height: height * 0.1,
  },
  iconText: {
    color: "yellow",
    fontSize: 13,
    fontWeight: "bold",
  },
  AIiconText: {
    color: "white",
    fontSize: 20, // Reduced font size slightly for broader compatibility
    fontWeight: "bold",
  },
  iconSupport: {
    position: "absolute",
    right: 15,
    top: 10,
    alignItems: "center",
  },
});

export default HomeScreen;

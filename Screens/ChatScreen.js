// // import React from 'react';
// // import { View, Pressable, Text, StyleSheet } from 'react-native';
// // import { useNavigation, useRoute } from '@react-navigation/native';
// // import { createNativeStackNavigator } from '@react-navigation/native-stack';
// // import { NavigationContainer } from '@react-navigation/native';

// // // Sendbird imports
// import {
//   SendbirdUIKitContainer,
//   // useSendbirdChat,
//   // useConnection,
//   // createGroupChannelListFragment,
//   // createGroupChannelCreateFragment,
//   // createGroupChannelFragment,
// } from '@sendbird/uikit-react-native';
// // import { useGroupChannel } from '@sendbird/uikit-chat-hooks';

// // // Expo services
// // import * as ExpoClipboard from 'expo-clipboard';
// // import * as ExpoDocumentPicker from 'expo-document-picker';
// // import * as ExpoFS from 'expo-file-system';
// // import * as ExpoImagePicker from 'expo-image-picker';
// // import * as ExpoMediaLibrary from 'expo-media-library';
// // import * as ExpoNotifications from 'expo-notifications';
// // import * as ExpoAV from 'expo-av';
// // import * as ExpoVideoThumbnail from 'expo-video-thumbnails';
// // import * as ExpoImageManipulator from 'expo-image-manipulator';

// // // Sendbird platform services setup
// // import {
// //   createExpoClipboardService,
// //   createExpoFileService,
// //   createExpoMediaService,
// //   createExpoNotificationService,
// //   createExpoPlayerService,
// //   createExpoRecorderService
// // } from "@sendbird/uikit-react-native";

// // // MMKV storage
// // import { MMKV } from 'react-native-mmkv';

// // // Set up platform services for Sendbird UIKit
// // const platformServices = {
// //   clipboard: createExpoClipboardService(ExpoClipboard),
// //   notification: createExpoNotificationService(ExpoNotifications),
// //   file: createExpoFileService({
// //     fsModule: ExpoFS,
// //     imagePickerModule: ExpoImagePicker,
// //     mediaLibraryModule: ExpoMediaLibrary,
// //     documentPickerModule: ExpoDocumentPicker,
// //   }),
// //   media: createExpoMediaService({
// //     avModule: ExpoAV,
// //     thumbnailModule: ExpoVideoThumbnail,
// //     imageManipulatorModule: ExpoImageManipulator,
// //     fsModule: ExpoFS,
// //   }),
// //   player: createExpoPlayerService({ avModule: ExpoAV }),
// //   recorder: createExpoRecorderService({ avModule: ExpoAV }),
// // };

// // const mmkv = new MMKV();

// // // Chat Screens
// // const GroupChannelListFragment = createGroupChannelListFragment();
// // const GroupChannelCreateFragment = createGroupChannelCreateFragment();
// // const GroupChannelFragment = createGroupChannelFragment();

// // // Group Channel List Screen
// // const GroupChannelListScreen = () => {
// //   const navigation = useNavigation();

// //   return (
// //     <GroupChannelListFragment
// //       onPressCreateChannel={(channelType) => {
// //         navigation.navigate('GroupChannelCreate', { channelType });
// //       }}
// //       onPressChannel={(channel) => {
// //         navigation.navigate('GroupChannel', { channelUrl: channel.url });
// //       }}
// //     />
// //   );
// // };

// // // Group Channel Create Screen
// // const GroupChannelCreateScreen = () => {
// //   const navigation = useNavigation();

// //   return (
// //     <GroupChannelCreateFragment
// //       onCreateChannel={async (channel) => {
// //         navigation.replace('GroupChannel', { channelUrl: channel.url });
// //       }}
// //       onPressHeaderLeft={() => {
// //         navigation.goBack();
// //       }}
// //     />
// //   );
// // };

// // // Group Channel Screen
// // const GroupChannelScreen = () => {
// //   const navigation = useNavigation();
// //   const { params } = useRoute();
// //   const { sdk } = useSendbirdChat();
// //   const { channel } = useGroupChannel(sdk, params.channelUrl);
// //   if (!channel) return null;

// //   return (
// //     <GroupChannelFragment
// //       channel={channel}
// //       onChannelDeleted={() => {
// //         navigation.navigate('GroupChannelList');
// //       }}
// //       onPressHeaderLeft={() => {
// //         navigation.goBack();
// //       }}
// //       onPressHeaderRight={() => {
// //         navigation.navigate('GroupChannelSettings', { channelUrl: params.channelUrl });
// //       }}
// //     />
// //   );
// // };

// // // Sign-in Screen
// // const SignInScreen = () => {
// //   const { connect } = useConnection();

// //   return (
// //     <View style={styles.signInContainer}>
// //       <Pressable
// //         style={styles.signInButton}
// //         onPress={() => connect('USER_ID', { nickname: 'NICKNAME' })}
// //       >
// //         <Text style={styles.signInText}>{'Sign in'}</Text>
// //       </Pressable>
// //     </View>
// //   );
// // };

// // // Navigation Setup
// // const RootStack = createNativeStackNavigator();
// // const Navigation = () => {
// //   const { currentUser } = useSendbirdChat();
  
// //   return (
// //     <NavigationContainer>
// //       <RootStack.Navigator screenOptions={{ headerShown: false }}>
// //         {!currentUser ? (
// //           <RootStack.Screen name={'SignIn'} component={SignInScreen} />
// //         ) : (
// //           <>
// //             <RootStack.Screen name={'GroupChannelList'} component={GroupChannelListScreen} />
// //             <RootStack.Screen name={'GroupChannelCreate'} component={GroupChannelCreateScreen} />
// //             <RootStack.Screen name={'GroupChannel'} component={GroupChannelScreen} />
// //           </>
// //         )}
// //       </RootStack.Navigator>
// //     </NavigationContainer>
// //   );
// // };

// // // Main Chat Screen (with SendBird setup)
// // export default function ChatScreen() {
// //   return (
// //     <SendbirdUIKitContainer
// //       appId={'YOUR_APP_ID'}  // Replace with your SendBird app ID
// //       chatOptions={{ localCacheStorage: mmkv }}
// //       platformServices={platformServices}
// //     >
// //       <Navigation />
// //     </SendbirdUIKitContainer>
// //   );
// // }

// // // Styles
// // const styles = StyleSheet.create({
// //   signInContainer: {
// //     flex: 1,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   signInButton: {
// //     width: 120,
// //     height: 30,
// //     backgroundColor: '#742DDD',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   signInText: {
// //     color: '#fff',
// //   },
// // });


// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, Linking, Image } from 'react-native';
// import { SendBirdProvider, useSendbirdChat } from '@sendbird/uikit-react-native'; // SendBird chat imports
// import { ChannelList, Channel } from '@sendbird/uikit-react-native'; // Chat components
// import {
//   SendbirdUIKitContainer,
//   // useSendbirdChat,
//   // useConnection,
//   // createGroupChannelListFragment,
//   // createGroupChannelCreateFragment,
//   // createGroupChannelFragment,
// } from '@sendbird/uikit-react-native';

// export default function ChatScreen() {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedPlatform, setSelectedPlatform] = useState(null);

//   // Data for different platforms and their groups
//   const platformGroups = {
//     whatsapp: [
//       { name: 'UNNASSA Group', link: 'https://chat.whatsapp.com/unnassa' },
//       { name: 'Radasafi Group', link: 'https://chat.whatsapp.com/radasafi' },
//       { name: 'Mars Society Group', link: 'https://chat.whatsapp.com/marssociety' },
//     ],
//     instagram: [
//       { name: 'UNNASSA', link: 'https://instagram.com/unnassa' },
//     ],
//     x: [
//       { name: 'Astronights Group', link: 'https://x.com/astronights' },
//       { name: 'UNNASSA Group', link: 'https://x.com/unnassa' },
//     ],
//     linkedin: [
//       { name: 'UNNASSA', link: 'https://linkedin.com/unnassa' },
//       { name: 'Astronight', link: 'https://linkedin.com/astronight' },
//       { name: 'NASA', link: 'https://linkedin.com/nasa' },
//       { name: 'DarkSky Africa', link: 'https://linkedin.com/darkskyafrica' },
//       { name: 'Mars Society Kenya', link: 'https://linkedin.com/marssocietykenya' },
//     ],
//     facebook: [
//       { name: 'UNNASSA', link: 'https://facebook.com/unnassa' },
//     ],
//   };

//   // Function to handle logo click and show groups for that platform
//   const openPlatformGroups = (platform) => {
//     setSelectedPlatform(platform);
//     setModalVisible(true);
//   };

//   // Function to handle group click and open the link
//   const openGroupLink = (link) => {
//     Linking.openURL(link);
//     setModalVisible(false);
//   };

//   return (
//     <SendbirdUIKitContainer appId="F9F3C46D-1348-4EBF-8D7F-F3369893B319" userId="sendbird_desk_agent_id_12123da4-b908-47b0-b39c-4620fad1a2c3">
//       <View style={styles.container}>
//         <Text style={styles.sectionTitle}>Chat and Interact</Text>

//         {/* Clickable tabs for social platforms */}
//         <View style={styles.platformTabs}>
//           <TouchableOpacity onPress={() => openPlatformGroups('whatsapp')}>
//             <Image source={require('/home/newtonodari/ASTROPHYSIA/assets/favicon.png')} style={styles.logo} />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => openPlatformGroups('x')}>
//             <Image source={require('/home/newtonodari/ASTROPHYSIA/assets/favicon.png')} style={styles.logo} />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => openPlatformGroups('instagram')}>
//             <Image source={require('/home/newtonodari/ASTROPHYSIA/assets/favicon.png')} style={styles.logo} />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => openPlatformGroups('linkedin')}>
//             <Image source={require('/home/newtonodari/ASTROPHYSIA/assets/favicon.png')} style={styles.logo} />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => openPlatformGroups('facebook')}>
//             <Image source={require('/home/newtonodari/ASTROPHYSIA/assets/favicon.png')} style={styles.logo} />
//           </TouchableOpacity>
//         </View>

//         {/* Modal for showing platform groups */}
//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <View style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//               <Text style={styles.modalTitle}>
//                 {selectedPlatform ? selectedPlatform.toUpperCase() + ' Groups' : ''}
//               </Text>
//               <FlatList
//                 data={platformGroups[selectedPlatform]}
//                 renderItem={({ item }) => (
//                   <TouchableOpacity onPress={() => openGroupLink(item.link)}>
//                     <Text style={styles.groupItem}>{item.name}</Text>
//                   </TouchableOpacity>
//                 )}
//                 keyExtractor={(item, index) => index.toString()}
//               />
//               <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
//                 <Text style={styles.closeButtonText}>Close</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>

//         {/* Chat space using Sendbird */}
//         <View style={styles.chatSpace}>
//           <ChannelList />
//           <Channel />
//         </View>
//       </View>
//     </SendbirdUIKitContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#0A1931', // Dark blue background
//   },
//   sectionTitle: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   platformTabs: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 20,
//   },
//   logo: {
//     width: 50,
//     height: 50,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     padding: 20,
//     marginHorizontal: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   groupItem: {
//     fontSize: 18,
//     color: '#1E90FF', // Bright link color
//     marginVertical: 10,
//   },
//   closeButton: {
//     backgroundColor: '#8B4513',
//     padding: 10,
//     borderRadius: 8,
//     marginTop: 20,
//   },
//   closeButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   chatSpace: {
//     flex: 1,
//     backgroundColor: '#7B2CBF', // Purple background for chat space
//     padding: 10,
//     borderRadius: 8,
//     marginTop: 20,
//   },
// });
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

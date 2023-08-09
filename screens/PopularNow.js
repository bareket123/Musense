import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Button, ScrollView, SafeAreaView, FlatList} from 'react-native';
import { Audio } from 'expo-av';
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";

const PopularNow = () => {
    const [currentUrl,setCurrentUrl]=useState("");
    const [playing,setPlaying]=useState();

    const [sound, setSound] = useState();
    const [songsArray, setSongsArray] = useState([]); // Initialize songsArray as a state

    async function playSound(index) {
        const song = songsArray[index];
        if (!song) {
            return; // Handle invalid index
        }

        const { sound } = await Audio.Sound.createAsync({ uri: song.url });
        setSound(sound);
        await sound.playAsync();
    }

    async function pauseSound(index) {
        const song = songsArray[index];
        if (sound) {
            await sound.pauseAsync();
        }
    }
    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound]);

    // Assume you fetch songs and update the songsArray here
    useEffect(() => {
        // Fetch songs from API and update the songsArray state
        const fetchedSongs = []; // Fetch songs from API
        setSongsArray(fetchedSongs);
    }, []);
    // const [sound, setSound] = useState();
    // const songsArray=[];
    //
    //
    // let urlAudio='';
    //
    // async function playSound() {
    //
    //     const { sound } = await Audio.Sound.createAsync(
    //         { uri: urlAudio }
    //     );
    //     setSound(sound);
    //
    //     await sound.playAsync(); // Play the audio
    // }
    //
    // React.useEffect(() => {
    //     return sound
    //         ? () => {
    //             sound.unloadAsync(); // Unload the sound when the component is unmounted
    //         }
    //         : undefined;
    // }, [sound]);
    //
    //
    useEffect(() => {
        fetchSingleUrl();
        fetchPlaylist();
    }, []);

    function getSong(response) {
        let tempArray=[]
        response.tracks.map((song,index) => {
            const currentSong = {
                songIndex:index,
                title: song.title,
                artist: song.subtitle,
                url: song.hub.actions[1].uri,
                coverImage: song.images.background
            };

            tempArray.push(currentSong);
        });

       setSongsArray(tempArray)

    }

   function printArray(){
       songsArray.map((s) => {
           console.log(s);
       });
   }
    const fetchSingleUrl =async()=>{
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '29f3773d28msh4005745bd43a895p1a71acjsnc5350d1468dc',
                'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
            }
        };

        fetch('https://shazam.p.rapidapi.com/songs/get-details?key=40333609&locale=en-US', options)
            .then(response => response.json())
            //.then(response => urlAudio=response.hub.actions[1].uri)
            .catch(err => console.error(err));
    }

    const fetchPlaylist=async ()=>{
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '29f3773d28msh4005745bd43a895p1a71acjsnc5350d1468dc',
                'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
            }
        };

        fetch('https://shazam.p.rapidapi.com/charts/track?locale=en-US&pageSize=20&startFrom=0', options)
            .then(response => response.json())
            .then(response => getSong(response))
            .catch(err => console.error(err));
    }
    const togglePlaying = () => {
            console.log('Toggle playing function called');
            setPlaying(!playing);


    };

    const renderSong = ({ item }) => (
        <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: 'orange' }}>{item.title}</Text>
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={togglePlaying}>
              <AntDesign onPress={() => {pauseSound(item.songIndex).then(r => {console.log(playing)}) }} name={"pausecircle"} size={60} color="white" />
              <AntDesign onPress={()=>{playSound(item.songIndex).then(r =>{console.log(playing)})}} name="play" size={60} color="white" />

            </TouchableOpacity>
        </View>
    );


    return (
        // <ScrollView style={styles.container}>
        //     <SafeAreaView style={styles.SafeAreaView} >
        <View style={styles.container}>
            <View>
                <FlatList
                    keyExtractor={(item)=>item.songIndex}
                    data={songsArray}
                    renderItem={renderSong}

                />

                {/*<FlatList*/}
                {/*    data={songsArray}*/}
                {/*    renderItem={renderSong}*/}
                {/*    keyExtractor={(item) => item.songIndex}*/}

                {/*/>*/}
            </View>

                {/*{songsArray.map((song, index) => (*/}
                {/*    */}
                {/*     <TouchableOpacity*/}
                {/*        onPress={() => togglePlaying}*/}
                {/*        style={{*/}
                {/*            width: 80,*/}
                {/*            height: 80,*/}
                {/*            borderRadius: 40,*/}
                {/*            // backgroundColor: 'khaki',*/}
                {/*            justifyContent: 'center',*/}
                {/*            alignItems: 'center',*/}
                {/*            marginRight: 20,*/}
                {/*            marginLeft: 20,*/}
                {/*        }}>*/}

                {/*          <Text> song name:{song.title}</Text>*/}
                {/*        {*/}
                {/*            playing?*/}


                {/*                <AntDesign onPress={()=>{togglePlaying(),playSound(index)}}  name="play" size={60} color="white"   />*/}

                {/*                :*/}
                {/*                <AntDesign onPress={()=>{togglePlaying(),pauseSound(index)}} name="pausecircle" size={60} color="white" />*/}


                {/*        }*/}

                {/*    </TouchableOpacity>*/}
                {/*    <Button*/}
                {/*        key={index}*/}
                {/*        title={`Play ${song.title}`}*/}
                {/*        onPress={() => playSound(index)}*/}
                {/*    />*/}
                {/*))}*/}


            {/*{*/}
            {/*    songsArray.map((song, index) => (*/}
            {/*    <Button*/}
            {/*        key={index}*/}
            {/*        title={`Play ${song.title}`}*/}
            {/*        onPress={() => playSound(index)}*/}
            {/*    />*/}
            {/*))}*/}
            {/*/!* ... other components *!/*/}
            {/*<TouchableOpacity style={styles.playButton} onPress={playSound}>*/}
            {/*    <Text style={styles.playButtonText}>Play Song </Text>*/}
            {/*    <Button title={"print"} onPress={printArray}/>*/}
            {/*</TouchableOpacity>*/}
        </View>
        //     </SafeAreaView>
        // </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'blue'
    },
    playButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 8,
        marginTop: 20,
    },
    playButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

    SafeAreaView:{
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default PopularNow;



// import React, {useEffect, useState} from 'react';
// import {
//     View,
//     Text,
//     ScrollView,
//     FlatList,
//     StyleSheet,
//     ImageBackground,
//     TouchableOpacity,
//     SafeAreaView, Image
// } from 'react-native';
//
// import {Entypo, MaterialCommunityIcons} from "@expo/vector-icons";
// import image from '../images/greenGuitar.jpg';
// import axios from "axios";
// import { RadioButton,TextInput ,Button} from 'react-native-paper';
// import { Linking } from 'react-native';
// import { Audio } from 'expo-av';
// export default function PopularNow ({ navigation }) {
//
//     // const [songs, setSongs] = useState([
//     //     { id: '1', title: 'Song 1' },
//     //     { id: '2', title: 'Song 2' },
//     //     { id: '3', title: 'Song 3' },
//     //     { id: '4', title: 'Song 4' },
//     // ]);
//     const [playlist,setPlaylist]=useState([]);
//
//     const handlePress = (id) => {
//         console.log(`Song with id ${id} was pressed`);
//     };
//     useEffect(() => {
//         fetchPlaylistRadio();
//     }, []);
//
//     function saveUr(response){
//     console.log("from function\n"+response)
//     }
//
//     const fetchPlaylistRadio =async()=>{
//         const options = {
//             method: 'GET',
//             headers: {
//                 'X-RapidAPI-Key': '29f3773d28msh4005745bd43a895p1a71acjsnc5350d1468dc',
//                 'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
//             }
//         };
//
//         fetch('https://shazam.p.rapidapi.com/songs/get-details?key=40333609&locale=en-US', options)
//             .then(response => response.json())
//             .then(response => console.log(response.share.href))
//             .catch(err => console.error(err));
//     }
//     function clicked(){
//
//             const shazamTrackUrl = 'https://www.shazam.com/track/40333609/river-flows-in-you';
//
//             // Open the URL in the user's default web browser
//             Linking.openURL(shazamTrackUrl)
//                 .catch(error => {
//                     console.error('Error opening URL: ', error);
//                 });
//     }
//     //     const options = {
//     //         method: 'GET',
//     //         headers: {
//     //             'X-RapidAPI-Key': '29f3773d28msh4005745bd43a895p1a71acjsnc5350d1468dc',
//     //             'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
//     //         }
//     //     };
//     //
//     //     fetch('https://spotify23.p.rapidapi.com/seed_to_playlist/?uri=spotify%3Aartist%3A2w9zwq3AktTeYYMuhMjju8', options)
//     //         .then(response => response.json())
//     //         .then(data => {
//     //             console.log('Parsed Response:', data);
//     //             // Call your function to extract and save the URI
//     //             const extractedUri = saveUriFromResponse(data);
//     //            setPlaylist(extractedUri);
//     //            console.log(extractedUri)
//     //             // Use extractedUri in your application
//     //         })
//     //         .catch(err => console.error(err));
//     //
//     //
//     // }
//
//
//
//     const renderSong = ({ item }) => (
//         <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center', left: '20%'}}>
//             <MaterialCommunityIcons name="play-box" size={24} color="black"/>
//
//             <Text style={{ fontSize: 16, color:'green' }}>{item.title}</Text>
//             <TouchableOpacity style={styles.Button} onPress={() => handlePress(item.id)}>
//                 <Text style={styles.buttonText}>Play</Text>
//             </TouchableOpacity>
//         </View>
//     );
//
//     const renderArrayItems=()=> {
//         return playlist.map((item, index) => (
//             <Text key={index}>{item}</Text>
//         ));
//     }
//
//     const openSpotifyPlaylist = async (playlistUri) => {
//         try {
//             const url = `spotify:playlist:${playlistUri.split(':')[2]}`;
//             const supported = await Linking.canOpenURL(url);
//
//             if (supported) {
//                 await Linking.openURL(url);
//             } else {
//                 console.error('Cannot open Spotify app.');
//             }
//         } catch (error) {
//             console.error('Error opening Spotify app:', error);
//         }
//     };
//
//         const handleOpenPlaylist = () => {
//         const playlistUri = 'spotify:playlist:37i9dQZF1E4zUNZhVINYCS'; // Replace with your playlist URI
//             openSpotifyPlaylist(playlistUri);
//         };
//
//
//     return (
//        <View style={styles.viewStyle}>
//            <Button onPress={clicked} >nav</Button>
//        </View>
//
//
//
//
//     );
// };
// function saveUriFromResponse(response) {
//     if (response && response.mediaItems && response.mediaItems.length > 0) {
//         const uri = response.mediaItems[0].uri;
//         console.log('URI:', uri);
//         return uri;
//     } else {
//         console.error('No media items found in the response.');
//         return null;
//     }
// }
// const styles = StyleSheet.create({
//     viewStyle:{
//         justifyContent: 'center',
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     background: {
//         width: '100%',
//         height: '100%',
//         resizeMode: 'cover',
//     },
//     buttonExit: {
//         backgroundColor: 'green',
//         borderRadius: 50,
//         padding: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginBottom: 20,
//         width: 200,
//         shadowColor: 'black',
//         position: 'absolute',
//         left: '30%',
//         marginLeft: -50,
//     },
//     Button: {
//         backgroundColor: 'green',
//         borderRadius: 10,
//         padding: 10,
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginBottom: 20,
//         width: 200,
//         shadowColor: 'black',
//         position: 'absolute',
//         left: '70%',
//         marginLeft: -100,
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 21,
//         fontWeight: 'bold',
//     },
//     headerText: {
//         justifyContent: 'center',
//         fontSize: 23,
//         fontWeight: 'bold',
//         marginBottom: 50,
//         color:'green',
//         shadowColor:'white'
//     },
//
// });

import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Button, ScrollView, SafeAreaView, FlatList} from 'react-native';
import { Audio } from 'expo-av';
import {AntDesign} from "@expo/vector-icons";
import { useSelector, useDispatch } from 'react-redux';
import {setPlayedRecently, setPlaylist} from "../redux/actions"; // Import useSelector and useDispatch from react-redux
// import { addToPlayedRecently } from '../actions/actions'; // Import your action creator




const PopularNow = () => {

    // const {playList ,playedRecently} = useSelector(state => state.reducer)

    // const {setMyPlaylist}=useContext(GlobalStateContext);
    // const [playedRecently,setPlayedRecently]=useState([])
    // const playedRecently = useSelector((state) => state.cardData); // Access the playedRecently state from redux
    const dispatch = useDispatch(); // Get the dispatch function
    const [sound, setSound] = useState();
    const [songsArray, setSongsArray] = useState([]); // Initialize songsArray as a state

    async function playSound(index) {
        const song = songsArray[index];
        dispatch(setPlayedRecently(song)); // Dispatch the action to add the song to playedRecently state in redux
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
                coverImage: song.images.background,
                isFavorite: false // Initialize as not favorite//////////////////////////////////

            };

            tempArray.push(currentSong);
        });

       setSongsArray(tempArray)

    }


    // const fetchSingleUrl =async()=>{
    //     const options = {
    //         method: 'GET',
    //         headers: {
    //             'X-RapidAPI-Key': '29f3773d28msh4005745bd43a895p1a71acjsnc5350d1468dc',
    //             'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    //         }
    //     };
    //
    //     fetch('https://shazam.p.rapidapi.com/songs/get-details?key=40333609&locale=en-US', options)
    //         .then(response => response.json())
    //         //.then(response => urlAudio=response.hub.actions[1].uri)
    //         .catch(err => console.error(err));
    // }

    const fetchPlaylist=async ()=>{
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '77f4e88fbcmsh34c35cf21256c6ap1326abjsn36b18c917e58',
                'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
            }
        };

        fetch('https://shazam.p.rapidapi.com/charts/track?locale=en-US&pageSize=20&startFrom=0', options)
            .then(response => response.json())
            .then(response => getSong(response))
            .catch(err => console.error(err));
    }

    /////////////////////
    function toggleFavorite(index) {
        const updatedArray = songsArray.map((song, i) => {
            if (i === index) {
                return { ...song, isFavorite: !song.isFavorite };
            }
            return song;
        });
        setSongsArray(updatedArray);
    }

    function addLovedSongs(index) {
        const song = songsArray[index];
        dispatch(setPlaylist(song))
    }

    const renderSong = ({ item }) => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
            <View>
                <Text style={{ fontSize: 15, color: 'black' }}>{item.title}</Text>
            </View>
            <TouchableOpacity style={{ flexDirection: 'row' }}>
                <AntDesign onPress={() => pauseSound(item.songIndex).then(r => {})} name={"pausecircle"} size={30} color="black" />
                <AntDesign onPress={() => playSound(item.songIndex).then(r => {})} name="play" size={30} color="black" />
                <AntDesign onPress={() => {
                    toggleFavorite(item.songIndex);
                    addLovedSongs(item.songIndex);
                }} name="heart" size={30} color={item.isFavorite ? 'red' : 'green'} />
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
                {/*{*/}
                {/*    playedRecently.length>0&&*/}
                {/*    playedRecently.map((song)=>{*/}
                {/*        console.log(song.title+"*****\n")*/}
                {/*    })*/}
                {/*}*/}
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
        backgroundColor:'pink'
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


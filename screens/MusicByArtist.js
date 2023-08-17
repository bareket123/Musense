import React, {useEffect, useState} from 'react';
import {
    View,
    TextInput,
    Text,
    ScrollView,
    FlatList,
    StyleSheet,
    ImageBackground,
    Button,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import {AntDesign, FontAwesome, Fontisto} from "@expo/vector-icons";
import { Audio } from 'expo-av';
import { useSelector, useDispatch } from 'react-redux'; // Import useSelector and useDispatch from react-redux
import { addToPlayedRecently } from '../actions/actions';
import {useContext} from "react";
import {setPlayedRecently, setPlaylist} from "../redux/actions"; // Import useSelector and useDispatch from react-redux




export default function MusicByArtist ({ navigation }) {

    const [currentArray,setCurrentArray]=useState([]);
    const [searchText, setSearchText] = useState('');
    const [playSong, setPlaySong] = useState();
    const [showSongs, setShowSongs] = useState(false);
    const dispatch = useDispatch();

    const handleSearch = (text) => {
        setSearchText(text);
    };


    async function playSound(index) {
        const song = currentArray[index];
        dispatch(addToPlayedRecently(song));
        if (!song) {
            return; // Handle invalid index
        }

        const { sound } = await Audio.Sound.createAsync({ uri: song.url });
        setPlaySong(sound);
        await sound.playAsync();
    }

    async function pauseSound(index) {
        const song = currentArray[index];
        if (playSong) {
            await playSong.pauseAsync();
        }
    }
    useEffect(() => {
        return () => {
            if (playSong) {
                playSong.unloadAsync();
            }
        };
    }, [playSong]);


    function getAllSongByName(response) {
        let tempArray=[]
        response.map((song,index) => {
            const currentSong = {
                songIndex:index,
                title: song.track.title,
                artist: song.track.subtitle,
                url: song.track.hub.actions[1].uri,
                coverImage:song.track.images.background,
                isFavorite: false // Initialize as not favorite//////////////////////////////////

            };

            tempArray.push(currentSong);
        });

        setCurrentArray(tempArray)

        //console.log(currentArray)
        currentArray.map((song,index) =>{
            console.log(song)
        })

    }



    const search= ()=> {
        let currentSongsArray=[];
        // if (searchText!==''){
        console.log("this is the text "+searchText)

        const songs = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '77f4e88fbcmsh34c35cf21256c6ap1326abjsn36b18c917e58',
                'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
            }
        };

        fetch('https://shazam.p.rapidapi.com/search?term='+searchText+'&locale=en-US&offset=0&limit=5', songs)
            .then(response => response.json())
            .then(response => getAllSongByName(response.tracks.hits))
            .catch(err => console.error("There is error in fetching data: "+err));

        setShowSongs(true);

        // console.log(currentSongsArray.length)
        //
        // currentSongsArray.map((c)=>{
        //     console.log(c.track.title)
        //
        // })
        // }else {
        //         return;
        //     }



        setSearchText('');

        // setCurrentArray([]);
    }



    /////////////////////
    function toggleFavorite(index) {
        const updatedArray = currentArray.map((song, i) => {
            if (i === index) {
                return { ...song, isFavorite: !song.isFavorite };
            }
            return song;
        });
        setCurrentArray(updatedArray);
    }


    function addLovedSongs(index) {
        const song = currentArray[index];
        dispatch(setPlaylist(song))
    }

    const renderSong = ({ item }) => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10,backgroundColor:'pink' }}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, color: 'black' }}>{item.title}</Text>
                <Text style={{ fontSize: 15, color: 'green' }}>{item.artist}</Text>


            </View>
            <TouchableOpacity style={{ flexDirection: 'row' }}>
                <AntDesign onPress={() => pauseSound(item.songIndex).then(r => {})} name={"pausecircle"} size={30} color="black" />
                <AntDesign onPress={() => playSound(item.songIndex).then(r => {})} name="play" size={30} color="black" />
                <AntDesign onPress={() => {
                    toggleFavorite(item.songIndex);
                    addLovedSongs(item.songIndex);
                }} name="heart" disabled={item.isFavorite} size={30} color={item.isFavorite ? 'red' : 'green'} />

            </TouchableOpacity>
        </View>
    );

    return (
        <View>
            <View style={styles.searchStyle} >

                <TextInput
                    placeholder="Search song or artist..."
                    onChangeText={handleSearch}
                    value={searchText}
                />
                <Fontisto name="search" onPress={search} size={20} color="black" />
            </View>
            {
                showSongs&&
                <FlatList
                    keyExtractor={(item)=>item.songIndex}
                    data={currentArray}
                    renderItem={renderSong}

                />
            }


        </View>
        // <View style={styles.viewStyle}>
        //     <TextInput
        //         placeholder="Search"
        //         value={searchSong}
        //         mode={"outlined"}
        //         onChangeText={setSearchSong}
        //         style={styles.textInput}
        //
        //     />
        //
        // </View>
        // <ImageBackground source={image} style={styles.background} >
        //     <TouchableOpacity style={styles.buttonExit} onPress={() => navigation.navigate("Home")}>
        //         <Text style={styles.buttonText}>Go back to Home</Text>
        //     </TouchableOpacity>
        //     <Text>{"\n"}</Text>
        //     <Text style={styles.headerText} >Music By Artist:</Text>
        //     <FlatList
        //         data={songs}
        //         renderItem={renderSong}
        //         keyExtractor={(item) => item.id}
        //     />
        // </ImageBackground>

    );
};


const styles = StyleSheet.create({
    viewStyle:{
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    background: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    buttonExit: {
        backgroundColor: 'blue',
        borderRadius: 50,
        padding: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        width: 200,
        shadowColor: 'black',
        position: 'absolute',
        left: '30%',
        marginLeft: -50,
    },
    Button: {
        backgroundColor: 'blue',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        width: 200,
        shadowColor: 'black',
        position: 'absolute',
        left: '70%',
        marginLeft: -100,
    },
    buttonText: {
        color: 'white',
        fontSize: 21,
        fontWeight: 'bold',
    },
    headerText: {
        justifyContent: 'center',
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 50,
        color:'blue',
        shadowColor:'white'
    },
    textInput:{
        justifyContent: 'center',
        padding: 10,
        paddingLeft: 60,
        width: 300,
        backgroundColor:'antiquewhite'
    },
    container: {
        flex: 1,
        backgroundColor:'pink',
        flexDirection:'row'

    },
    searchStyle: {
        flexDirection:'row',
        justifyContent: 'space-between',
        height: 40,

        borderColor: 'black',
        borderWidth: 5,
        borderRadius: 20, // Make it circular by setting borderRadius to half of the height
        paddingHorizontal: 10,
    },

});


import {setPlayedRecently} from "../redux/actions";
import {Audio} from "expo-av";
import React, {useEffect, useState} from "react";
import {Button, FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {AntDesign, Feather, Ionicons} from "@expo/vector-icons";
import {useSelector,useDispatch} from "react-redux";
import Slider from '@react-native-community/slider';
import {useFocusEffect} from "@react-navigation/native";
import axios from "axios";

export default function Player ({ songList,page,toggleFavorite }) {
    const dispatch = useDispatch();
    const [sound, setSound] = useState(null);
    const [currentlyPlaying,setCurrentlyPlaying]=useState({});
    const [pressedPlaying, setPressedPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5); // Initial volume
    const {token} = useSelector(state => state.reducer);

    useFocusEffect(
        React.useCallback(() => {
            setCurrentlyPlaying(undefined);
        }, [])
    );


    async function playSound(song) {
        setPressedPlaying(true);
        setCurrentlyPlaying(song);
        dispatch(setPlayedRecently(song)); // Dispatch the action to add the song to playedRecently state in redux
        if (!song) {
            return; // Handle invalid index
        }
        try {
            const {sound} = await Audio.Sound.createAsync({uri: song.url});
            setSound(sound);

            await sound.playAsync();
        }catch (error){
            console.log("error in loading song "+error )
        }

    }

    async function pauseSound() {
        setPressedPlaying(false);
        if (sound) {
            try {
                await sound.pauseAsync();
                setSound(null);
            }catch (error){
                console.log("error pausing song "+ error)
            }

        }
    }

    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound]);

    const handleVolumeChange = async (newVolume) => {
        if (sound!==null){
            try {
                await sound.setVolumeAsync(newVolume);
                setVolume(newVolume)
            }catch (error){
                console.log("error in the volume "+error)
            }

        }
    };


    const playMusic=(song)=>{
        if (pressedPlaying){
            pauseSound()
        }else {
            playSound(song)
        }

    }
    const replaceSong=(action)=> {
        const currentIndex = songList.findIndex(song=>song.url ===currentlyPlaying.url);

        let newIndex;

        sound&&
        pauseSound().then(r => {});


        if (action==='next'){
            newIndex = (currentIndex+1) % songList.length;

        }else {
            newIndex = (currentIndex -1) % songList.length;
        }

        setCurrentlyPlaying(songList[newIndex]);
    }


    const pressSong=(song)=>{
        setCurrentlyPlaying(song);
        pauseSound().then(r => {});

    }


    function addLovedSongs(song) {
        if (!song.isFavorite){
            sendPlaylistToServer(song).then(r => {
            })
        }

    }

    const renderSong = ({ item }) => (
        <View>
            <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center', left: '20%'}}>
                <TouchableOpacity style={{flex:1}}  onPress={()=>{pressSong(item)}}>
                    <Text>{item.title}</Text>
                    <Text>{item.artist}</Text>
                </TouchableOpacity>
                {
                    page==='list'?
                        <AntDesign onPress={() => {
                            toggleFavorite(item.songIndex);
                            addLovedSongs(item);
                        }} name="heart"  size={30} color={item.isFavorite ? 'red' : 'green'}/>
                        :
                        <TouchableOpacity style={{ marginLeft: 50 }} onPress={() =>deleteSong(item)}>
                            <AntDesign name="delete" size={24} color="black" />
                        </TouchableOpacity>

                }

            </View>
            <View style={{ alignItems:'center' }} >

            </View>

        </View>
    )
    const deleteSong=async (song) => {
        const response = await axios.create({baseURL: 'http://10.0.0.1:8989'}).post('/delete-song?songId=' + song.id);
        if (response.data.success){
            alert("delete")
        }else {
            alert(response.data.errorCode)
        }
    }
    const sendPlaylistToServer = async (song) => {
        if (token !== null) {
            await axios.post('http://10.0.0.1:8989/add-song', null, {
                params: {
                    token:token,
                    title: song.title,
                    artist: song.artist,
                    url: song.url,
                    coverImage: song.coverImage
                }
            }).then((res) => {
                if (res.data.success) {
                    console.log("updated successfully")

                } else {
                    alert("something went wrong")
                }


            });

        }
    }

    return(
        <View>
            {
                (currentlyPlaying!==undefined  ) &&

                <View style={{alignItems:'center'}}>
                    <View style={{position:'absolute',top:0,right:0}}>
                        <TouchableOpacity onPress={()=>{setCurrentlyPlaying(undefined),sound&&pauseSound()}} style={{justifyContent:'flex-start',alignItems: 'flex-start'}}>
                            <Text style={{fontSize:20}}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <Text>currently playing</Text>
                    <Image source={{uri:currentlyPlaying.coverImage}} style={{width:200,height:200}}/>
                    <View style={{flexDirection:'row'}}>
                        <AntDesign name="stepforward" size={30} color="black"  onPress={()=>{replaceSong('next')}} />
                        <AntDesign onPress={() => playMusic(currentlyPlaying)} name={pressedPlaying?"pausecircle":"play"} size={30} color="black"/>
                        <AntDesign name="stepbackward" size={30} color="black" onPress={()=>{replaceSong('previous')}} />


                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Ionicons name="md-volume-high" size={24} color="black" style={{left:5}} />
                        <Slider
                            style={{  width: 200, marginLeft: 5,marginTop:5  }}
                            value={volume}
                            minimumValue={0}
                            maximumValue={1}
                            step={0.05}
                            onValueChange={handleVolumeChange}
                            minimumTrackTintColor={'black'}
                            maximumTrackTintColor={'grey'}
                            thumbTintColor={"black"}
                        />



                    </View>



                </View>
            }
            <FlatList
                data={songList}
                renderItem={renderSong}
                keyExtractor={(item, index) => index.toString()}

            />
        </View>
    )

}

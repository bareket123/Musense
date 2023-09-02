import {Image, Text, TouchableOpacity, View, TouchableHighlight} from "react-native";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import { playAudio, pauseAudio,setVolume,getVolume} from "./playAudio";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";



const CurrentPlaying= ({ currentSong, setSong, allSongs })=>{
    const [pressedPlaying, setPressedPlaying] = useState(false);
    const dispatch = useDispatch();
    // const [fontsLoaded] = useFonts({
    //     'Anton-R': require('../assets/Fonts/Anton-Regular.ttf')
    // });
    // useEffect(()=>{
    //     if (fontsLoaded) {
    //         SplashScreen.hideAsync();
    //     }
    //     async function prepare() {
    //         await SplashScreen.preventAutoHideAsync();
    //     }
    //     prepare();
    // },[])

    async function playSound(song) {
        setPressedPlaying(true);
        setSong(song)
        await playAudio(song, dispatch); // Dispatch the action to add the song to playedRecently state in redux

    }
    async function pauseSound() {
        setPressedPlaying(false);
        await pauseAudio();
    }

    const handleVolumeChange = async (newVolume) => {
      await setVolume(newVolume)
    }

    const playMusic=(song)=>{
        console.log("this is the song :"+song+"\n")
        if (pressedPlaying){
            pauseSound()
        }else {
            playSound(song)
        }

    }
    const replaceSong=(action)=> {
        const currentIndex = allSongs.findIndex(song=>song.url ===currentSong.url);

        let newIndex;

        // sound&&
        pauseSound().then(r => {});

        if (action==='next'){
            newIndex = (currentIndex+1) % allSongs.length;

        }else {
            newIndex = (currentIndex -1) % allSongs.length;
        }

        setSong(allSongs[newIndex]);
    }


    return (
            <View style={{alignItems:'center'}}>
                <View style={{position:'absolute',top:0,right:0}}>
                    <TouchableOpacity onPress={()=>{setSong(undefined),pauseAudio()}} style={{justifyContent:'flex-start',alignItems: 'flex-start'}}>
                        <Text style={{fontSize:20,color:'white'}}>X</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{color:'white'}}>currently playing...</Text>
                <Image source={{uri:currentSong.coverImage}} style={{width:300,height:300,marginBottom:20}}/>
                <View style={{flexDirection:'row'}}>
                    <TouchableHighlight
                        underlayColor="rgba(255, 255, 255, 0.2)" // White glow on black background
                        onPress={() => replaceSong('next')}
                        style={{ overflow: 'hidden', marginHorizontal: 5,right:40 }}
                    >
                        <AntDesign name="forward" color="white" style={{ fontSize: 40 }} />
                    </TouchableHighlight>

                    <TouchableHighlight
                        underlayColor="rgba(255, 255, 255, 0.2)" // White glow on black background
                        onPress={() =>{playMusic(currentSong)} }
                        style={{ overflow: 'hidden', marginHorizontal: 5 }}
                    >
                        <AntDesign name={pressedPlaying ? 'pausecircle' : 'play'} style={{ fontSize: 50 }} color="white" />
                    </TouchableHighlight>

                    <TouchableHighlight
                        underlayColor="rgba(255, 255, 255, 0.2)" // White glow on black background
                        onPress={() => replaceSong('previous')}
                        style={{ overflow: 'hidden', marginHorizontal: 5, left:40 }}
                    >
                        <AntDesign name="banckward" color="white" style={{ fontSize: 40 }} />
                    </TouchableHighlight>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Ionicons name="md-volume-high" size={24} color="black" style={{left:5}} />
                    <Slider
                        style={{  width: 200, marginLeft: 5,marginTop:5  }}
                        value={getVolume()}
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

        );


}
export default CurrentPlaying;

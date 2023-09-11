import {Image, Text, TouchableOpacity, View, TouchableHighlight, Dimensions, ImageBackground,StyleSheet} from "react-native";
import {AntDesign, FontAwesome, Ionicons} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { playAudio, pauseAudio,setVolume,getVolume,reloadSong} from "./playAudio";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Animated, Easing } from 'react-native';
import  currentPlayingStyle from '../styles/currentPlayingStyle';
import {LOCAL_SERVER_URL, setIsSongPlaying} from '../redux/actions'
import globalStyles from "../styles/globalStyles";
import axios from "axios";
import ErrorAlert from "./ErrorAlert";
import {Slider} from "@rneui/themed";
// import {Slider} from "@rneui/themed";


const spinValue = new Animated.Value(0);
const CurrentPlaying= ({ currentSong, setSong, allSongs })=>{
    const {token} = useSelector(state => state.reducer);
    const [previousVolume, setPreviousVolume] = useState(0.5);
    const [pressedPlaying, setPressedPlaying] = useState(false);
    const [mute, setMute] = useState(false);
    const [spinAnimation, setSpinAnimation] = useState(null);
    const [messageCode,setMessageCode]=useState(0);

    const dispatch = useDispatch();

    const sendPlayedRecentlyToServer = async (song) => {
        setMessageCode(0)
        if (token !== null) {
            try {
                const encodedTitle = encodeURIComponent(song.title);
                const encodedArtist = encodeURIComponent(song.artist);
                const encodedUrl = encodeURIComponent(song.url);
                const encodedCoverImage = encodeURIComponent(song.coverImage);
                const encodedIsPlayed = encodeURIComponent(true);

                const url = `${LOCAL_SERVER_URL}/add-song?token=${token}&title=${encodedTitle}&artist=${encodedArtist}&url=${encodedUrl}&coverImage=${encodedCoverImage}&isPlayed=${encodedIsPlayed}`;
                const response = await axios.post(url);

                if (response.data.success) {
                    console.log("Updated successfully");
                } else {
                    setMessageCode(response.data.errorCode);
                }
            } catch (error) {
                console.error("Error while sending request:", error.message);
            }
        }
    };



    const [fontsLoaded] = useFonts({
        'RammettoOne': require('../assets/Fonts/RammettoOne-Regular.ttf'),
       'Amatic': require('../assets/Fonts/AmaticSC-Bold.ttf'),
        'Arch':require('../assets/Fonts/ArchitectsDaughter-Regular.ttf'),
    });

    useEffect(()=>{
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    },[fontsLoaded])

    async function playSound(song) {
        setPressedPlaying(true);
        setSong(song)
        await sendPlayedRecentlyToServer(song)
        startSpin();
        await playAudio(song, dispatch); // Dispatch the action to add the song to playedRecently state in redux

    }
    async function pauseSound() {
        setPressedPlaying(false);
        stopSpin();
        await pauseAudio();
    }

    const handleVolumeChange = async (newVolume) => {
        if (!mute) {
            await setVolume(newVolume);
        }
    };

    const toggleMute = () => {
        if (mute) {
            setMute(false);
            handleVolumeChange(previousVolume);
        } else {
            setPreviousVolume(getVolume());
            setMute(true);
            handleVolumeChange(0); // Mute by setting volume to 0
        }
    };

    const playMusic= (song) => {

        if (pressedPlaying) {
            pauseSound()
        } else {
            playSound(song)
        }

    }
    const replaceSong=(action)=> {
        const currentIndex = allSongs.findIndex(song=>song.url ===currentSong.url);
        let newIndex;
        pauseSound().then(r => {});

        if (action==='next'){
            newIndex = (currentIndex+1) % allSongs.length;

        }else {
            newIndex = (currentIndex -1) % allSongs.length;
        }

        setSong(allSongs[newIndex]);
    }

    const startSpin = () => {
        try {
            if (spinAnimation) {
                spinAnimation.stop();
            }

            // Create a new spinning animation
            const animation = Animated.loop(
                Animated.timing(spinValue, {
                    toValue: 1,
                    duration: 5000, // Adjust the duration as needed
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            );

            setSpinAnimation(animation);

            // Start the animation
            animation.start();


        }catch (error){
            console.log("error in spinning "+ error)
        }

    };

    const stopSpin = () => {
        try {
            if (spinAnimation) {
                spinAnimation.stop();
            }
        }catch (error){
            console.log("error in stop spinning "+ error)
        }

    };
const closePlaying = () => {
    setSong(undefined);
    dispatch(setIsSongPlaying(false));
        pauseAudio();
}

    return (

      <ImageBackground source={{uri:currentSong.coverImage}} >
          {
              fontsLoaded &&
              <Text style={currentPlayingStyle.overlayText}>currently playing...</Text>

          }
          <View style={currentPlayingStyle.overlayContainer}/>
          <View style={currentPlayingStyle.closeButton}>
              <TouchableOpacity onPress={closePlaying}>
                  <Text style={currentPlayingStyle.closeButtonText} >X</Text>
              </TouchableOpacity>
          </View>

          <Animated.Image source={{ uri: currentSong.coverImage }} style={[
                      currentPlayingStyle.overlayImage,
                      {
                          transform: [{ rotate: spinValue.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: ['0deg', '360deg'],
                              }) }],
                      },
                  ]} />

                          <View style={currentPlayingStyle.middleContainer}>
                              {
                                  fontsLoaded&&
                                  <View style={currentPlayingStyle.middleContainer}>
                                      <Text style={currentPlayingStyle.songTitle} numberOfLines={1}>{currentSong.title}</Text>
                                      <Text style={currentPlayingStyle.songArtist}>{currentSong.artist}</Text>
                                  </View>
                              }

                      </View>
          <View style={currentPlayingStyle.volumeControls}>
              <Ionicons name={mute ? "volume-mute" : "md-volume-high"} size={24} color="white" style={currentPlayingStyle.volumeIcon} onPress={toggleMute} />

              {/*<Slider*/}
              {/*    style={currentPlayingStyle.volumeSlider}*/}
              {/*    value={getVolume()}*/}
              {/*    minimumValue={0}*/}
              {/*    maximumValue={1}*/}
              {/*    step={0.05}*/}
              {/*    onValueChange={handleVolumeChange}*/}
              {/*    minimumTrackTintColor={'black'}*/}
              {/*    maximumTrackTintColor={'white'}*/}
              {/*    thumbStyle={{ height: 20, width: 20, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}*/}
              {/*    trackStyle={{ height: 5, backgroundColor: 'transparent' }}*/}

              {/*/>*/}


          </View>

                  <View style={currentPlayingStyle.controlButtons}>
                      <TouchableHighlight>
                          <Ionicons name="refresh-outline"  color="white"  style={currentPlayingStyle.controlIcon} onPress={reloadSong} />
                      </TouchableHighlight>
                      <TouchableHighlight
                          underlayColor="rgba(255, 255, 255, 0.5)" // White glow on black background
                          onPress={() => replaceSong('next')}
                          style={currentPlayingStyle.controlButton}
                      >
                          <AntDesign name="forward" color="white" style={currentPlayingStyle.controlIcon} />
                      </TouchableHighlight>

                      <TouchableHighlight
                          underlayColor="rgba(255, 255, 255, 0.5)" // White glow on black background
                          onPress={() =>{playMusic(currentSong)} }
                          style={currentPlayingStyle.controlButton }
                      >
                          <AntDesign name={pressedPlaying ? 'pausecircleo' : 'playcircleo'} size={50} style={{marginLeft:5,marginRight:5}} color="white" />
                      </TouchableHighlight>

                      <TouchableHighlight
                          underlayColor="rgba(255, 255, 255, 0.2)" // White glow on black background
                          onPress={() => replaceSong('previous')}
                          style={currentPlayingStyle.controlButton}
                      >
                          <AntDesign name="banckward" color="white" style={currentPlayingStyle.controlIcon} />
                      </TouchableHighlight>

                  </View>
             {
              (messageCode !== 0) &&
              <ErrorAlert message={messageCode} />
            }
      </ImageBackground>



    );

}

export default CurrentPlaying;

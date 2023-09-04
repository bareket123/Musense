import {Image, Text, TouchableOpacity, View, TouchableHighlight, Dimensions, ImageBackground,StyleSheet} from "react-native";
import {AntDesign, FontAwesome, Ionicons} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import { playAudio, pauseAudio,setVolume,getVolume,reloadSong} from "./playAudio";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Animated, Easing } from 'react-native';
import { Slider,Icon } from '@rneui/themed';




const spinValue = new Animated.Value(0);
const CurrentPlaying= ({ currentSong, setSong, allSongs })=>{
    const [previousVolume, setPreviousVolume] = useState(0.5);
    const [pressedPlaying, setPressedPlaying] = useState(false);
    const [mute, setMute] = useState(false);
    const [spinAnimation, setSpinAnimation] = useState(null);
    const dispatch = useDispatch();



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

    const playMusic=(song)=>{
        startSpin();
        if (pressedPlaying){
            pauseSound()
        }else {
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
            const animation = Animated.loop(
                Animated.timing(spinValue, {
                    toValue: 1,
                    duration: 5000, // Adjust the duration as needed
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            );

            animation.start();

            // Store the animation object in state or a ref for later use
            setSpinAnimation(animation);
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


    return (

      <ImageBackground source={{uri:currentSong.coverImage}} style={{width: '100%', height: '100%' }} resizeMode={'cover'}>
          {
              fontsLoaded &&
              <Text style={styles.overlayText}>currently playing...</Text>

          }
          <View style={styles.overlayContainer}/>
          <View style={styles.closeButton}>
              <TouchableOpacity onPress={() => { setSong(undefined), pauseAudio() }}>
                  <Text style={{ fontSize: 20, color: 'white',fontWeight:'bold' }} >X</Text>
              </TouchableOpacity>
          </View>

          <Animated.Image source={{ uri: currentSong.coverImage }} style={[
                      styles.overlayImage,
                      {
                          transform: [{ rotate: spinValue.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: ['0deg', '360deg'],
                              }) }],
                      },
                  ]} />

                          <View style={styles.middleContainer}>
                              {
                                  fontsLoaded&&
                                  <View style={styles.middleContainer}>
                                      <Text style={{fontSize:30,fontFamily:'Arch'}} numberOfLines={1}>{currentSong.title}</Text>
                                      <Text style={{fontSize:20,fontFamily:'Arch'}}>{currentSong.artist}</Text>
                                  </View>
                              }

                      </View>
          <View style={styles.volumeControls}>
              <Ionicons name={mute ? "volume-mute" : "md-volume-high"} size={24} color="white" style={styles.volumeIcon} onPress={toggleMute} />

              <Slider
                  style={styles.volumeSlider}
                  value={getVolume()}
                  minimumValue={0}
                  maximumValue={1}
                  step={0.05}
                  onValueChange={handleVolumeChange}
                  minimumTrackTintColor={'black'}
                  maximumTrackTintColor={'white'}
                  thumbStyle={{ height: 20, width: 20, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                  trackStyle={{ height: 5, backgroundColor: 'transparent' }}

              />


          </View>

                  <View style={styles.controlButtons}>
                      <TouchableHighlight>
                          <Ionicons name="refresh-outline"  color="white"  style={styles.controlIcon} onPress={reloadSong} />
                      </TouchableHighlight>
                      <TouchableHighlight
                          underlayColor="rgba(255, 255, 255, 0.5)" // White glow on black background
                          onPress={() => replaceSong('next')}
                          style={styles.controlButton}
                      >
                          <AntDesign name="forward" color="white" style={styles.controlIcon} />
                      </TouchableHighlight>

                      <TouchableHighlight
                          underlayColor="rgba(255, 255, 255, 0.2)" // White glow on black background
                          onPress={() =>{playMusic(currentSong)} }
                          style={styles.controlButton}
                      >
                          <AntDesign name={pressedPlaying ? 'pausecircleo' : 'playcircleo'} size={50} style={{marginLeft:5,marginRight:5}} color="white" />
                      </TouchableHighlight>

                      <TouchableHighlight
                          underlayColor="rgba(255, 255, 255, 0.2)" // White glow on black background
                          onPress={() => replaceSong('previous')}
                          style={styles.controlButton}
                      >
                          <AntDesign name="banckward" color="white" style={styles.controlIcon} />
                      </TouchableHighlight>

                  </View>

      </ImageBackground>



    );


}


const styles = StyleSheet.create({
    overlayContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        blur: 5,
    },
    closeButton: {
        position: 'absolute',
        top: 16, // Adjust the top position as needed
        right: 16,

    },
    overlayText: {
        color: 'white',
        fontFamily: 'RammettoOne',
        alignSelf:'center',
        fontSize:20,
    },
    overlayImage: {
        width: 300,
        height: 300,
        borderRadius: 200,
        borderColor: 'rgba(128, 128, 128, 0.5)',
        borderWidth:10,
         alignSelf: 'center',

    },
    controlButtons: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent:'center',
        right:20,
    },
    controlButton: {
        overflow: 'hidden',
        marginHorizontal: 5,
    },
    controlIcon: {
        fontSize: 40,
        marginLeft:5,
        marginRight:5,
    },
    volumeControls: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom:5,
    },
    volumeIcon: {
        marginLeft: 5,
    },
    volumeSlider: {
        width: 300,
        height:20,
        marginLeft: 5,
        marginTop: 5,
    },
    middleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10,
    },
});

export default CurrentPlaying;

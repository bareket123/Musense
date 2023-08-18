import {setPlayedRecently} from "../redux/actions";
import {Audio} from "expo-av";
import React, {useEffect, useState} from "react";
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {AntDesign, Feather} from "@expo/vector-icons";
import {useSelector,useDispatch} from "react-redux";
import Slider from '@react-native-community/slider';

export default function Player ({ songList }) {
    const [sound, setSound] = useState();

    const [currentlyPlaying,setCurrentlyPlaying]=useState({});
    const [pressedPlaying, setPressedPlaying] = useState(false);
    const dispatch = useDispatch();


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

    const playMusic=(song)=>{
        if (pressedPlaying){
          pauseSound()
        }else {
           playSound(song)
        }

    }
    const getNextSong=(action)=> {
        const currentIndex = currentlyPlaying.id;
        let nextIndex;
        pauseSound().then(r => {});
        if (currentIndex === -1) {
            return null;
        }
        if (action==='next'){
             nextIndex = (currentIndex + 1) % songList.length;
        }else {
             nextIndex = (currentIndex -1) % songList.length;
        }
        console.log(songList[nextIndex])

        setCurrentlyPlaying(songList[nextIndex]);
    }
    const pressSong=(song)=>{
        setCurrentlyPlaying(song);
        pauseSound();

    }

    const renderSong = ({ item }) => (
        <View>
            <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center', left: '20%'}}>
                <TouchableOpacity  onPress={()=>{pressSong(item)}}>
                    <Text >{item.title}</Text>
                    <Text>{item.artist}</Text>
                </TouchableOpacity>

            </View>
            <View style={{ alignItems:'center' }} >
                {/*<Image source={{uri:item.coverImage}} style={{width:100,height:100,marginBottom:20}}/>*/}
                {/*<AntDesign onPress={() => playMusic(item)} name={pressedPlaying?"pausecircle":"play"} size={30} color="black"/>*/}
            </View>

        </View>
    )

    return(
        <View>
            {
                (currentlyPlaying!==undefined )&&
                <View style={{alignItems:'center'}}>
                    <Text>currently playing</Text>
                  <Image source={{uri:currentlyPlaying.coverImage}} style={{width:200,height:200}}/>
                    <View style={{flexDirection:'row'}}>
                   <AntDesign name="stepforward" size={30} color="black"  onPress={()=>{getNextSong('next')}} />
                   <AntDesign onPress={() => playMusic(currentlyPlaying)} name={pressedPlaying?"pausecircle":"play"} size={30} color="black"/>
                   <AntDesign name="stepbackward" size={30} color="black" onPress={()=>{getNextSong('previous')}} />

                    </View>



                </View>
            }
            <FlatList
                data={songList}
                renderItem={renderSong}
                keyExtractor={(item)=>{item.url}}/>
        </View>
    )

}

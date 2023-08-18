// import React, { useState, useEffect } from 'react';
// import {View, Text, FlatList, StyleSheet, TouchableOpacity, Button} from 'react-native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { useSelector } from 'react-redux';
// import { Audio } from 'expo-av';
//
// export default function MyPlaylist({ navigation }) {
//     const [sound, setSound] = useState(null);
//     const { playList, playedRecently } = useSelector(state => state.reducer);
//
//     const playSound = async (song) => {
//         if (!song) {
//             return;
//         }
//
//         try {
//             if (sound) {
//                 await sound.unloadAsync();
//             }
//
//             const { sound: newSound } = await Audio.Sound.createAsync({ uri: song.url });
//             setSound(newSound);
//             await newSound.playAsync();
//         } catch (error) {
//             console.error('Error playing sound:', error);
//         }
//     };
//
//     const pauseSound = () => {
//         if (sound) {
//             sound.pauseAsync().catch(error => {
//                 console.error('Error pausing sound:', error);
//             });
//         }
//     };
//
//     useEffect(() => {
//         return () => {
//             if (sound) {
//                 sound.unloadAsync().catch(error => {
//                     console.error('Error unloading sound:', error);
//                 });
//             }
//         };
//     }, [sound]);
//
//     const renderSong = ({ item }) => (
//         <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center', left: '20%' , backgroundColor:'pink'}}>
//             <MaterialCommunityIcons name="play-box" size={24} color="black" />
//             <Text style={{ fontSize: 16, color: 'purple' }}>{item.title}</Text>
//             <TouchableOpacity style={{ marginLeft: 50 }} onPress={() => playSound(item)}>
//                 <Text>Play</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={{ marginLeft: 50 }} onPress={() => pauseSound()}>
//                 <Text>Pause</Text>
//             </TouchableOpacity>
//
//         </View>
//     );
//
//     return (
//         <View>
//             <Text>My Playlist:</Text>
//             <FlatList
//                 data={playList}
//                 renderItem={renderSong}
//                 keyExtractor={(item) => item.songIndex}
//             />
//         </View>
//     );
// }
//
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 10,
//         backgroundColor:'pink',
//     },
//     text: {
//         fontSize: 16,
//         lineHeight: 24,
//     },
// });







import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Audio } from 'expo-av';
import { setPlaylist } from '../redux/actions';

export default function MyPlaylist({ navigation }) {
    const [sound, setSound] = useState(null);
    const { playList, playedRecently } = useSelector(state => state.reducer);
    const dispatch = useDispatch();

    const [songs, setSongs] = useState(playList.map(song => ({ ...song, isFavorite: false })));

    const playSound = async (song) => {
        if (!song) {
            return;
        }

        try {
            if (sound) {
                await sound.unloadAsync();
            }

            const { sound: newSound } = await Audio.Sound.createAsync({ uri: song.url });
            setSound(newSound);
            await newSound.playAsync();
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    };

    const pauseSound = () => {
        if (sound) {
            sound.pauseAsync().catch(error => {
                console.error('Error pausing sound:', error);
            });
        }
    };

    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync().catch(error => {
                    console.error('Error unloading sound:', error);
                });
            }
        };
    }, [sound]);

    function toggleFavorite(index) {
        const updatedSongs = songs.map((song, i) => {
            if (i === index) {
                return { ...song, isFavorite: !song.isFavorite };
            }
            return song;
        });
        setSongs(updatedSongs);
    }

    function removeSong(index) {
        const updatedSongs = songs.filter((_, i) => i !== index);
        setSongs(updatedSongs);
    }

    const renderSong = ({ item, index }) => (
        <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center', left: '20%', backgroundColor: 'pink' }}>
            <MaterialCommunityIcons name="play-box" size={24} color="black" />
            <Text style={{ fontSize: 16, color: 'purple' }}>{item.title}</Text>
            <TouchableOpacity style={{ marginLeft: 50 }} onPress={() => playSound(item)}>
                <Text>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 50 }} onPress={() => pauseSound()}>
                <Text>Pause</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    toggleFavorite(index);
                    removeSong(index);
                }}
            >
                <MaterialCommunityIcons
                    // name="heart"
                    // size={30}
                    // color={item.isFavorite ? 'green' : 'red'}
                    name="delete"
                    size={30}
                    color="black"
                />
            </TouchableOpacity>
        </View>
    );

    return (
        <View>
            <Text>My Playlist:</Text>
            <FlatList
                data={songs}
                renderItem={renderSong}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'pink',
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
    },
});





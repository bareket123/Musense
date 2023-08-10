import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity, Button} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { addToPlayedRecently } from '../actions/actions';
import { Audio } from 'expo-av';

const PlayedRecently = ({ navigation, playedRecently }) => {
    const [sound, setSound] = useState(null);

    const playSound = async (song) => {
        if (!song) {
            return; // Handle invalid song
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

    const renderSong = ({ item }) => (
        <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center', left: '20%' }}>
            <MaterialCommunityIcons name="play-box" size={24} color="black" />
            <Text style={{ fontSize: 16, color: 'purple' }}>{item.title}</Text>
            <TouchableOpacity style={{ marginLeft: 50 }} onPress={() => playSound(item)}>
                <Text>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 50 }} onPress={() => pauseSound()}>
                <Text>Pause</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View>
            <Text>{"\n"}</Text>
            <Text>Played Recently:</Text>
            <FlatList
                data={playedRecently}
                renderItem={renderSong}
                keyExtractor={(item) => item.songIndex}
            />
        </View>
    );
};

const mapStateToProps = (state) => ({
    playedRecently: state.cardData,
});

export default connect(mapStateToProps)(PlayedRecently);

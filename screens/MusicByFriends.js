import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, ImageBackground,Button,TouchableOpacity} from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import image from '../images/tiktok.jpg';

export default function MusicByFriends ({ navigation }) {
    const [songs, setSongs] = useState([
        { id: '1', title: 'Song 1' },
        { id: '2', title: 'Song 2' },
        { id: '3', title: 'Song 3' },
        { id: '4', title: 'Song 4' },
    ]);

    const handlePress = (id) => {
        console.log(`Song with id ${id} was pressed`);
    };

    const renderSong = ({ item }) => (
        <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center', left: '20%'}}>
            <MaterialCommunityIcons name="play-box" size={24} color="black"/>

            <Text style={{ fontSize: 16, color:'orange' }}>{item.title}</Text>
            <TouchableOpacity style={styles.Button} onPress={() => handlePress(item.id)}>
                <Text style={styles.buttonText}>Play</Text>
            </TouchableOpacity>
        </View>
    );

    return (
            <ImageBackground source={image} style={styles.background} >
                <TouchableOpacity style={styles.buttonExit} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>Go back to Home</Text>
                </TouchableOpacity>
                <Text>{"\n"}</Text>
                <Text style={styles.headerText} >Music By Friends:</Text>
                <FlatList
                    data={songs}
                    renderItem={renderSong}
                    keyExtractor={(item) => item.id}
                />
            </ImageBackground>

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
        backgroundColor: 'orange',
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
        backgroundColor: 'orange',
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
        color:'orange',
        shadowColor:'white'
    },

});

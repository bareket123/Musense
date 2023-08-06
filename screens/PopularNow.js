import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    ScrollView,
    FlatList,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    SafeAreaView, Image
} from 'react-native';
import {Entypo, MaterialCommunityIcons} from "@expo/vector-icons";
import image from '../images/greenGuitar.jpg';
import axios from "axios";
import { RadioButton,TextInput ,Button} from 'react-native-paper';


export default function PopularNow ({ navigation }) {

    const [songs, setSongs] = useState([
        { id: '1', title: 'Song 1' },
        { id: '2', title: 'Song 2' },
        { id: '3', title: 'Song 3' },
        { id: '4', title: 'Song 4' },
    ]);
    const playlist=useState([]);

    const handlePress = (id) => {
        console.log(`Song with id ${id} was pressed`);
    };


    useEffect(()=>{
       fetchPlaylist().then(r => {});
    },[]);

    const fetchPlaylist=async () => {




    }




    const renderSong = ({ item }) => (
        <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center', left: '20%'}}>
            <MaterialCommunityIcons name="play-box" size={24} color="black"/>

            <Text style={{ fontSize: 16, color:'green' }}>{item.title}</Text>
            <TouchableOpacity style={styles.Button} onPress={() => handlePress(item.id)}>
                <Text style={styles.buttonText}>Play</Text>
            </TouchableOpacity>
        </View>
    );

    const renderArrayItems=()=> {
        return playlist.map((item, index) => (
            <Text key={index}>{item}</Text>
        ));
    }
    return (
       <View>
           {
               playlist.length!==0?
                   <View style={styles.viewStyle}>
                  {/*<Button onPress={()=>{console.log(playlist)}}>{'array is not empty'}</Button>*/}

               </View>
                   :
                   <Text>{"different"}</Text>
           }
       </View>




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
        backgroundColor: 'green',
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
        backgroundColor: 'green',
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
        color:'green',
        shadowColor:'white'
    },

});

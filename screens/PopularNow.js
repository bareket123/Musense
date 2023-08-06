import React, {useState,useEffect} from 'react';
import {ScrollView, View, Text, Button,TouchableOpacity, StyleSheet,FlatList, Image} from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';


export default function PopularNow ({ navigation }) {
    const [images, setImages] = useState([
    ]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.uri);
        }
    };

    const renderImage=(image)=>{
        <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center', left: '20%'}}>
            <MaterialCommunityIcons name="play-box" size={24} color="black"/>


            <TouchableOpacity style={styles.Button} onPress={() => handlePress(image.getIndex)}>
                <Text style={styles.buttonText}>play</Text>
                {  alert(image.getIndex)}
            </TouchableOpacity>
        </View>
    };

    useEffect(() => {
        fetchPlaylist();
    }, []);

    const fetchPlaylist = async () => {
        try {
            const response = await axios.get('https://spotify23.p.rapidapi.com/playlist/', {
                params: {
                    id: '37i9dQZF1DX4Wsb4d7NKfP'
                },
                headers: {
                    'x-rapidapi-key': 'f7ed7affb4msh7a23d0d54497bbap131941jsna2cddc3200ff',
                    'x-rapidapi-host': 'spotify23.p.rapidapi.com'
                }
            });

            const data = response.data;
            setImages(data.images);
        } catch (error) {
            console.error('Error fetching playlist:', error);
        }
    };


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>choose an Atist:</Text>
            <Button title="Upload Picture" onPress={pickImage} />
            {typeof image === 'string' && (
                <Image
                    source={{ uri: image }}
                    style={{ width: 200, height: 200, marginTop: 20 }}
                />
            )}

            <Button
                title="Go back to Home"
                onPress={() => navigation.navigate("Home")}
            />
            <FlatList
                data={images}
                renderItem={renderImage}
                keyExtractor={(item) => item.getIndex}
            />
        </View>

    );




}







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


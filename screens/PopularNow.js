import React, {useEffect, useState} from 'react';
import {ScrollView, SafeAreaView, TouchableOpacity, Text, StyleSheet, Image,View} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import { Button} from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {LinearGradient} from 'expo-linear-gradient';



const HomeScreen = ({ navigation }) => {
    const [username,setUsername]=useState("");
    const [token,setToken]=useState(null);

    //  useEffect(() => {
    //     const clientId = '5a71da11af7742abb244634ae32e7a96'; // replace with your client ID
    //     const clientSecret = '60773f44df4a4b14ba5227020827bbc5'; // replace with your client secret
    //     const encodedCredentials = NWE3MWRhMTFhZjc3NDJhYmIyNDQ2MzRhZTMyZTdhOTY6NjA3NzNmNDRkZjRhNGIxNGJhNTIyNzAyMDgyN2JiYzU= // encode credentials in base64 format
    //     axios.post('https://accounts.spotify.com/api/token', // endpoint
    //     'grant_type=client_credentials', // request body
    //       { // request headers
    //         headers: {
    //           'Authorization': 'Basic ' + encodedCredentials, // authorization header
    //           'Content-Type': 'application/x-www-form-urlencoded' // content type header
    //         }
    //       }
    //     ).then(response => { // handle success response
    //       alert(response.data); // log the response data
    //     }).catch(error => { // handle error response
    //       console.error(error); // log the error
    //     });
    // }, []);

    const clientId = '5a71da11af7742abb244634ae32e7a96'; // replace with your client ID
    const clientSecret = '60773f44df4a4b14ba5227020827bbc5'; // replace with your client secret
    const authHeader = 'NWE3MWRhMTFhZjc3NDJhYmIyNDQ2MzRhZTMyZTdhOTY6NjA3NzNmNDRkZjRhNGIxNGJhNTIyNzAyMDgyN2JiYzU=' ;

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${authHeader}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials', // Use the appropriate grant type based on your use case
        };

        fetch('https://accounts.spotify.com/api/token', requestOptions)
            .then(response =>
                response.json()

            )
            .then(data => setToken(data.access_token) )
            .catch(error => console.error(error));
    },[]);


    return (
        <ScrollView style={styles.container}>
            <SafeAreaView style={styles.SafeAreaView} >
                {/*<View style={{flexDirection:'row',alignItems: 'center'}}>*/}
                {/*<Text  style={styles.header}>Hello {token!==null? username:"guest"} </Text>*/}
                {/*    /!*<LinearGradient colors={['#9acd32','#3cb371', '#32cd32' ,'#90ee90' ]} style={styles.linearGradient}>*!/*/}
                {/*    /!*    <Button*!/*/}
                {/*    /!*        labelStyle={{color: 'white', fontWeight: 'bold',fontSize:15}}*!/*/}
                {/*    /!*        icon={({ size, color }) => (*!/*/}
                {/*    /!*            <FontAwesome name="user" size={size} color={color} />*!/*/}
                {/*    /!*        )}*!/*/}
                {/*    /!*        onPress={() => navigation.navigate('login')}*!/*/}
                {/*    /!*    >*!/*/}
                {/*    /!*        To Login/SignUp*!/*/}
                {/*    /!*    </Button>*!/*/}

                {/*    /!*</LinearGradient>*!/*/}


                {/*</View>*/}

                <TouchableOpacity onPress={()=>{ navigation.navigate('Popular')}}>
                    <Image source={require('../images/popular.gif')} style={styles.image}  resizeMode="cover"
                    />
                    <Text style={styles.caption}>Popular Music</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{ navigation.navigate('played')}}>
                    <Image source={require('../images/playrecently.gif')} style={styles.image}/>
                    <Text style={styles.caption}>Played Recently</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{ navigation.navigate('artist')}}>
                    <Image source={require('../images/music.png')} style={styles.image}/>
                    <Text style={styles.caption}> Music by Artist</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{ navigation.navigate('friends')}}>
                    <Image source={require('../images/friends.gif')} style={styles.image}/>
                    <Text style={styles.caption}>Played Music by Friends</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{ navigation.navigate('playlist')}}>
                    <Image source={require('../images/playlist2.gif')} style={styles.image}/>
                    <Text style={styles.caption}>my playlist</Text>
                </TouchableOpacity>


            </SafeAreaView>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'black'
    },
    SafeAreaView:{
        justifyContent: 'center',
        alignItems: 'center',
    }
    ,
    TouchableOpacity: {
        backgroundColor: '#2196F3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 300,
    },
    caption: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#fff',
        padding: 5,
        fontSize: 20,
    },
    header:{
        position: 'absolute',

        right:150,
        fontSize: 16,
        fontWeight: 'bold',
        color:'white',
        shadowColor:'green'
    },
    loginButton:{
        left:100,
        backgroundColor:'green',


    },
    linearGradient: {
        left:100,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 60
    },
    buttonText3: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});

export default HomeScreen;




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

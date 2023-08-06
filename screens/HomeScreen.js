
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

//
//     async function getUsername() {
//         try {
//                    if (token !== null) {
//                        console.log("inside the get-username method ")
//                    let response = await axios.get('http://10.0.0.1:8989/get-username-by-token?token=' + token);
//                    if (response.data != null) {
//                        setUsername(response.data);
//                    } else {
//                        console.log("response is null")
//                    }
//                } else {
//                        console.log("the token is null")
//
//                    }
//
//
//            }catch (error){
//                    console.log("error in the Home screen " ,error.message)
//                }
//
//
// }
//     const getToken = async () => {
//         try {
//             const token = await AsyncStorage.getItem('token');
//             setToken(token);
//             console.log("token is: " + token);
//         } catch (error) {
//             console.log("error in the token Home screen ",error.message);
//         }
//     };
//     useEffect(() => {
//         getToken().then(r => {console.log("use effect worked")});
//     });
//
//
//     useEffect(  () => {
//       getUsername().then(r => {console.log("use effect inside home screen")});
//     },[token])

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

export default HomeScreen;

import React, { useState} from 'react';
import {ScrollView, SafeAreaView, TouchableOpacity, Text, StyleSheet, Image,View} from 'react-native';
import { FontAwesome5, MaterialIcons} from '@expo/vector-icons';

import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SearchFriends from "./SearchFriends"; // Make sure this path is correct
import MyFriends from "./MyFriends";


const HomeScreen = ({ navigation }) => {
    const [username,setUsername]=useState("");
    const [token,setToken]=useState(null);
    const homeName="home";
    const loginName="login";
    const popularName="popular";

    const Tab=createBottomTabNavigator();


//
//     async function getUsername() {
//         try {
//                    if (token !== null) {
//                        console.log("inside the get-username method ")
//                    let response = await axios.get('http://192.168.68.116:8989/get-username-by-token?token=' + token);
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
            <SafeAreaView>
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
                <View style={styles.SafeAreaView}>
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
                </View>



                <NavigationContainer independent={true}>
                    <Tab.Navigator

                        screenOptions={{
                            tabBarStyle: [
                                {
                                    display: 'flex',
                                    backgroundColor:'black'
                                },
                                null,
                            ],
                        }}>
                        <Tab.Screen
                            name="Search Friends"
                            component={SearchFriends}
                            options={{
                                tabBarIcon: ({ color, size }) => (
                                    <MaterialIcons
                                        name="person-search"
                                        style={{ left: 0, justifyContent: 'space-around', backgroundColor: 'black' }}
                                        size={size}
                                        color='white'
                                        onPress={() => { navigation.navigate('Search Friends') }}
                                    />

                                ),
                            }}
                        />

                        <Tab.Screen
                            name="My Friends"
                            component={MyFriends}
                            options={{
                                tabBarIcon: ({ color, size,style }) => (
                                    <FontAwesome5 name="user-friends"
                                                  size={24}
                                                  color="white"
                                                  onPress={() => { navigation.navigate('My Friends') }} />   ),

                            }}

                        />
                        {/*<Tab.Screen*/}
                        {/*    name="Search3"*/}
                        {/*    component={Login} // Replace with your component*/}
                        {/*    options={{*/}
                        {/*        tabBarIcon: ({ color, size,style }) => (*/}
                        {/*            <MaterialIcons name="location-searching" style={{justifyContent: 'space-around'}} size={24} color="white" />                        ),*/}
                        {/*    }}*/}
                        {/*/>*/}
                    </Tab.Navigator>
                </NavigationContainer>

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
    },
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



//////////////////////////////////////////////////////////////////////////////////
// import React, { useState } from 'react';
// import { ScrollView, SafeAreaView, TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
// import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import SearchFriends from "./SearchFriends";
// import MyFriends from "./MyFriends";
//
// const HomeScreen = ({ navigation }) => {
//     const [username,setUsername]=useState("");
//     const [token,setToken]=useState(null);
//     const homeName="home";
//     const loginName="login";
//     const popularName="popular";
//
//     const Tab = createBottomTabNavigator();
//
//     return (
//         <SafeAreaView style={styles.container}>
//             {/* Your header content */}
//
//             <View style={styles.SafeAreaView}>
//                 <TouchableOpacity onPress={() => { navigation.navigate('Search Friends') }}>
//                     {/* Your touchable opacity for 'Search Friends' */}
//                 </TouchableOpacity>
//
//                 <TouchableOpacity onPress={() => { navigation.navigate('My Friends') }}>
//                     {/* Your touchable opacity for 'My Friends' */}
//                 </TouchableOpacity>
//             </View>
//
//             <NavigationContainer independent={true}>
//                 <Tab.Navigator
//                     screenOptions={{
//                         tabBarStyle: {
//                             backgroundColor: 'black'
//                         },
//                     }}
//                 >
//                     <Tab.Screen
//                         name="Search Friends"
//                         component={SearchFriends}
//                         options={{
//                             tabBarIcon: ({ color, size }) => (
//                                 <MaterialIcons
//                                     name="person-search"
//                                     size={size}
//                                     color={color}
//                                 />
//                             ),
//                         }}
//                     />
//
//                     <Tab.Screen
//                         name="My Friends"
//                         component={MyFriends}
//                         options={{
//                             tabBarIcon: ({ color, size }) => (
//                                 <FontAwesome5
//                                     name="user-friends"
//                                     size={size}
//                                     color={color}
//                                 />
//                             ),
//                         }}
//                     />
//                 </Tab.Navigator>
//             </NavigationContainer>
//         </SafeAreaView>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'black'
//     },
//     SafeAreaView: {
//         flexDirection: 'row', // Align buttons horizontally
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     // ... your other styles ...
// });
//
// export default HomeScreen;




///////////////////////////////////////////////////////////////
// import React from 'react';
// import { ScrollView, SafeAreaView, TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
// import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//
// import SearchFriends from "./SearchFriends";
// import MyFriends from "./MyFriends";
//
// const HomeScreen = ({ navigation }) => {
//     const Tab = createBottomTabNavigator();
//
//     return (
//         <SafeAreaView style={styles.container}>
//             <ScrollView>
//
//
//                 <View style={styles.gridContainer}>
//                     <TouchableOpacity style={styles.gridItem} onPress={() => { navigation.navigate('Popular') }}>
//                         <Image source={require('../images/popular.gif')} style={styles.image} resizeMode="cover" />
//                         <Text style={styles.caption}>Popular Music</Text>
//                     </TouchableOpacity>
//
//                     <TouchableOpacity style={styles.gridItem} onPress={() => { navigation.navigate('played') }}>
//                         <Image source={require('../images/playrecently.gif')} style={styles.image} resizeMode="cover" />
//                         <Text style={styles.caption}>Played Recently</Text>
//                     </TouchableOpacity>
//
//                     <TouchableOpacity style={styles.gridItem} onPress={() => { navigation.navigate('artist') }}>
//                         <Image source={require('../images/music.png')} style={styles.image} resizeMode="cover" />
//                         <Text style={styles.caption}>Music by Artist</Text>
//                     </TouchableOpacity>
//
//                     <TouchableOpacity style={styles.gridItem} onPress={() => { navigation.navigate('friends') }}>
//                         <Image source={require('../images/friends.gif')} style={styles.image} resizeMode="cover" />
//                         <Text style={styles.caption}>Played Music by Friends</Text>
//                     </TouchableOpacity>
//
//                     <TouchableOpacity style={styles.gridItem} onPress={() => { navigation.navigate('playlist') }}>
//                         <Image source={require('../images/playlist2.gif')} style={styles.image} resizeMode="cover" />
//                         <Text style={styles.caption}>My Playlist</Text>
//                     </TouchableOpacity>
//                 </View>
//             </ScrollView>
//
//             <NavigationContainer independent={true}>
//                 <Tab.Navigator
//                     screenOptions={{
//                         // tabBarStyle: {
//                         //     backgroundColor: 'black',
//                         //     flex:1,
//                         // },
//                     }}
//                 >
//                     <Tab.Screen
//                         name="Search Friends"
//                         component={SearchFriends}
//                         options={{
//                             tabBarIcon: ({ color, size }) => (
//                                 <MaterialIcons
//                                     name="person-search"
//                                     size={size}
//                                     color={color}
//                                 />
//                             ),
//                         }}
//                     />
//
//                     <Tab.Screen
//                         name="My Friends"
//                         component={MyFriends}
//                         options={{
//                             tabBarIcon: ({ color, size }) => (
//                                 <FontAwesome5
//                                     name="user-friends"
//                                     size={size}
//                                     color={color}
//                                 />
//                             ),
//                         }}
//                     />
//                 </Tab.Navigator>
//             </NavigationContainer>
//         </SafeAreaView>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'black'
//     },
//     header: {
//         alignItems: 'center',
//         padding: 20,
//     },
//     headerText: {
//         color: 'white',
//         fontSize: 24,
//         fontWeight: 'bold',
//     },
//     gridContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'center',
//     },
//     gridItem: {
//         width: 150,
//         height: 150,
//         margin: 10,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     image: {
//         width: '100%',
//         height: '100%',
//     },
//     caption: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         color: 'white',
//         padding: 5,
//         fontSize: 16,
//     },
// });
//
// export default HomeScreen;



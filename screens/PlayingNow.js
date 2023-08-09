import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {Button} from "react-native-paper";
import React, {useState} from "react";
import { AntDesign } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';



export default function PlayingNow ({ navigation }) {
//require('../images/beyonce-lemonade.jpg')
    const [playing,setPlaying]=useState(true);
    const togglePlaying = () => {
        setPlaying(!playing);
    };
    return (
        <View
            style={styles.viewStyle}>
            <View style={{ alignItems: 'center' }}>
                <Image
                    source={require('../images/beyonce-lemonade.jpg')}
                    style={styles.imageStyle}
                />
            </View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <TouchableOpacity
                    onPress={() => console.log('Skip Button Pressed')}
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                        // backgroundColor: 'green',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <MaterialCommunityIcons name="skip-next-circle" size={60} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => togglePlaying}
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                        // backgroundColor: 'khaki',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 20,
                        marginLeft: 20,
                    }}>
                    {
                        playing?
                         <AntDesign onPress={()=>{togglePlaying()}}  name="play" size={60} color="white" />
                            :
                         <AntDesign onPress={()=>{togglePlaying()}} name="pausecircle" size={60} color="white" />


                    }
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => console.log('Skip back Button Pressed')}
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                        // backgroundColor: 'green',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <MaterialCommunityIcons name="skip-previous-circle" size={60} color="white" />
                </TouchableOpacity>


            </View>

            {/*<Button mode="contained" style={{  width: 80,*/}
            {/*    height: 80,*/}
            {/*    borderRadius: 40, // Half of width and height to make it circular*/}
            {/*    justifyContent: 'center',*/}
            {/*    alignItems: 'center',}} onPress={() => console.log('Button Pressed')}>*/}
            {/*    Press Me*/}
            {/*</Button>*/}
        </View>
    );







}
const styles = StyleSheet.create({
    viewStyle:{
        width: 700,
        height: 600,
        backgroundColor: 'black',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    imageStyle:{
        width: 50, height: 500, borderRadius: 10
    }

});


import React from 'react';
import {ScrollView,SafeAreaView, TouchableOpacity, Text, StyleSheet,Image } from 'react-native';


const HomeScreen = ({ navigation }) => {
    return (
      <ScrollView style={styles.container}>
        <SafeAreaView >

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Popular')}
            >
                <Text style={styles.buttonText}>Go to Popular</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('played')}
            >
                <Text style={styles.buttonText}>Played Recently</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('artist')}
            >
                <Text style={styles.buttonText}>Played Music by Artist</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('friends')}
            >
                <Text style={styles.buttonText}>Played Music by Friends</Text>
            </TouchableOpacity>
            {/*<TouchableOpacity*/}
            {/*    style={styles.button}*/}
            {/*    onPress={() => navigation.navigate('playlist')}*/}
            {/*>*/}
            {/*    <Text style={styles.buttonText}>My Playlist</Text>*/}
            {/*</TouchableOpacity>*/}
            <TouchableOpacity onPress={()=>{ navigation.navigate('playlist')}}>
                <Image source={require('../images/guitar.png')} style={styles.image}/>
                <Text style={styles.caption}>my playlist</Text>
            </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor:'black'
    },
    button: {
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
        width: 200,
        height: 100,
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
});

export default HomeScreen;

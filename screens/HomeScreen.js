
import React from 'react';
import {ScrollView, SafeAreaView, TouchableOpacity, Text, StyleSheet, Image,Button} from 'react-native';


const HomeScreen = ({ navigation }) => {
    return (
      <ScrollView style={styles.container}>
        <SafeAreaView style={styles.SafeAreaView} >
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
          <Button
              title="Login"
              onPress={() => navigation.navigate('login')}
          />

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
});

export default HomeScreen;

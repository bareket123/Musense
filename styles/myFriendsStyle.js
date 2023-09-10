import { StyleSheet } from 'react-native';

const myFriendsStyle = StyleSheet.create({

    removeText: {
        color: 'white',
        fontWeight: 'bold',
        marginTop:-6,
    },

    removeIcon: {
        height: 20,
        width: 30,
        marginBottom: 5,
        marginTop:-12,
    },

    background: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    textTitle : {
        alignItems:'center'
    },

    textHeader : {
        fontSize: 40,
        color: 'white',
        textShadowColor: 'rgba(248,78,239,0.6)',
        textShadowOffset: { width: 5, height: 2 },
        textShadowRadius: 8
    },

    username: {
        fontWeight: 'bold',
        height: 50,
        width: 50,
        color: "white",
        marginLeft: -80,
        marginTop:-30
    },

    removeUser: {
        height: 100,
        width: 180,
        alignItems: 'center',
        marginLeft: 50
    },

    frame: {
        backgroundColor: 'rgba(19,19,19,0.5)',
        borderRadius: 20,
        margin: 5,
        height:80
    },

    noFriends : {
        fontSize:30,
        color: 'white',
        textShadowColor: 'rgb(255,255,255)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
        alignSelf:'center',
        marginTop:30,
    },

    image : {
        width: 60,
        height: 60,
        borderRadius: 30 ,
        marginRight:100,
        marginTop:10
    },

    customButton: {
        backgroundColor: 'black',
        borderColor: 'white',
        borderWidth: 5,
        borderRadius: 20,
        paddingHorizontal: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:570,
        width: 300,
        transform: [{ translateX: -50 }, { translateY: 0 }],
    },

    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

});

export default myFriendsStyle;

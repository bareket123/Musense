import { StyleSheet } from 'react-native';

const myPlaylistStyle = StyleSheet.create({

    background: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    button:{
        flexDirection:'row',
        justifyContent: 'space-between',
        height: 50,
        borderColor: 'black',
        borderWidth: 5,
        borderRadius: 20,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.77)',
        color: 'black',
    },

    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },

    textHeader : {
        fontSize:42,
        color: 'white',
        textShadowColor: 'rgb(227,223,224)',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 4,
        marginTop:20,
    },

    textTitle : {
        alignItems:'center'
    },

    noPlaylist : {
        fontSize:40,
        color: 'white',
        textShadowColor: 'rgb(255,255,255)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
        alignSelf:'center',
        marginTop:60
    },

    customButton: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 5,
        borderRadius: 20,
        paddingHorizontal: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:550,
        // width: 300,
        // transform: [{ translateX: -50 }, { translateY: -5 }],

    },

});

export default myPlaylistStyle;

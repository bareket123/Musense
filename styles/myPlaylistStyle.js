import { StyleSheet } from 'react-native';

const myPlaylistStyle = StyleSheet.create({

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
        alignItems:'center',

    },

    noPlaylist : {
        fontSize:30,
        color: 'white',
        textShadowColor: 'rgb(255,255,255)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
        alignSelf:'center',
        marginTop:10
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
        marginTop:0,
    },

});
export default myPlaylistStyle;

import { StyleSheet } from 'react-native';

const musicByArtistStyle = StyleSheet.create({

    background: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    searchStyle: {
        flexDirection:'row',
        justifyContent: 'space-between',
        height: 40,
        borderColor: 'black',
        borderWidth: 5,
        borderRadius: 20,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(255,253,253,0.77)',
    },

    textTitle : {
        alignItems:'center'
    },

    textHeader : {
        fontSize:30,
        color: 'white',
        textShadowColor: 'rgba(53,205,236,0.9)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4
    },
});

export default musicByArtistStyle;

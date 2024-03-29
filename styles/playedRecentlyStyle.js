import { StyleSheet } from 'react-native';

const playedRecentlyStyle = StyleSheet.create({

    backgroundView:{
        backgroundColor:'black',
        flex:1
    },

    mainTitle:{
        color:'white',
        fontSize:26,
        alignSelf:'center',
        fontWeight:'bold',
        textShadowColor: 'rgba(255, 255, 255, 0.5)',
        textShadowOffset: { width:2, height: 2 },
        textShadowRadius: 1,
        marginBottom:15,
    },

    searchTextInput:{
        alignSelf: 'center',
        fontSize:20,
        marginRight:60,
        color:'white'
    },

    searchView:{
        flexDirection:'row',
        width:350,
        alignSelf:'center',
        backgroundColor: 'rgba(128, 128, 128, 0.3)',
        borderColor: 'transparent',
        borderWidth: 5,
        borderRadius: 10,
        marginBottom:10,
    },

    clear:{
        marginLeft: 10,
        fontSize:20
    }

});

export default playedRecentlyStyle;

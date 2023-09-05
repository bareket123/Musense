import { StyleSheet } from 'react-native';

const playedRecentlyStyle = StyleSheet.create({
    backgroundView:{
        backgroundColor:'black',
        width:'100%',
        height:'100%'

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
        borderRadius: 10, // Make it circular by setting borderRadius to half of the height
        marginBottom:10,

    },

    searchIcon:{
        alignContent:'center',
        marginLeft:1,
       fontSize:40
    },
    clear:{
        marginLeft: 10,
        fontSize:20
    }

});

export default playedRecentlyStyle;

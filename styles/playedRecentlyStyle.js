import { StyleSheet } from 'react-native';

const playedRecentlyStyle = StyleSheet.create({
    backgroundView:{
        backgroundColor:'black',
    },
    mainTitle:{
        color:'white',
        fontSize:26,
        alignSelf:'center',
        fontWeight:'bold',
        textShadowColor: 'rgba(255, 255, 255, 0.5)',
        textShadowOffset: { width:2, height: 2 },
        textShadowRadius: 1,
        marginBottom:5,
    },
    searchTextInput:{
        alignSelf: 'center',
        paddingLeft: 30,

    },
    searchView:{
        flexDirection:'row',
        height: 40,
        width:250,
        paddingLeft:20,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderColor: 'lightGrey',
        borderWidth: 5,
        borderRadius: 50, // Make it circular by setting borderRadius to half of the height

    }

});

export default playedRecentlyStyle;

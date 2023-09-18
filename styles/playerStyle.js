import { StyleSheet } from 'react-native';

const playerStyle=StyleSheet.create({

    mainView:{
        borderRadius: 20, margin: 5
    },

    secondView:{
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },

    center:{
        flexDirection: 'row',
        alignItems: 'center',
    },

    songImage:{
        width: 60,
        height: 60,
        marginRight: 10,
    },

    songTitle:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
    },

    songArtist:{
        color:'white'
    },

    deleteButton:{
        marginLeft: 50,
    }

})

export default playerStyle;

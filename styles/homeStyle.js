import { StyleSheet } from 'react-native';

const homeStyle = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor:'black'
    },

    SafeAreaView:{
        justifyContent: 'center',
        alignItems: 'center',
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

export default homeStyle;



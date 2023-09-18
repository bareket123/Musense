import { StyleSheet } from 'react-native';

const alertStyle = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    alertView: {
        backgroundColor: 'black',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        borderColor:'white',
        borderStyle:'solid',
        borderWidth:10
    },

    alertText: {
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold',
        color:'white',
        fontSize:25,
        fontStyle:'italic'
    },

    closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'black',
        borderRadius: 5,
    },

    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },

});

export default alertStyle;

import { StyleSheet } from 'react-native';

const questionnaireStyle= StyleSheet.create({

    // scrollContent:{
    //     padding: 50,
    //     flex:1,
    //     alignItems:'center'
    // },
    title: {
        color:'white',
        padding:30,
        fontSize: 24,
        fontWeight:'bold',
        shadowColor:'green'

    },
    cardContainer: {
        borderWidth: 2, // Add border to create a frame-like appearance
        borderColor: 'white',
        borderRadius: 10, // Adjust the value to control the roundness of the edges
        marginBottom:30,
        marginLeft:20,
        marginRight:20,
        marginTop:10,


},
answerInput: {
        width: 200,
        height: 30,
        padding: 10,
        marginTop: 10,
        marginLeft:50,
        marginBottom: 10,
        backgroundColor: '#e8e8e8'
    },
    radioButton: {
        flexDirection: 'row',
        marginBottom: 10,
        shadowColor:'green'
    },
    radioButtonLabel: {
        color: 'white',
        fontWeight: 'normal',
        fontSize: 20,
        marginLeft: 10,

    }

    });
export default questionnaireStyle;


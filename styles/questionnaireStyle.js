import { StyleSheet } from 'react-native';

const questionnaireStyle= StyleSheet.create({

    mainTitle:{
        alignSelf:'center',
        color:'#FF00FF',
        fontSize: 25,
        padding:10,
        fontWeight:'bold',
        shadowColor:'white'
    },
    subtitle:{
        alignSelf:'center',
        color:'white',
        fontSize: 18,

        shadowColor:'white'

    },
    title: {
        color:'white',
        padding:30,
        fontSize: 24,
        fontWeight:'bold',
        shadowColor:'white'

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

    },
     artistMenu1 : {
        backgroundColor: '#e8e8e8',
         borderColor: 'white',
        borderWidth: 2,
        marginTop: 5,
        maxHeight: 150,
        elevation: 2,

    },
    artist2menu : {
        backgroundColor: '#e8e8e8',
        borderColor: 'white',
        borderWidth: 2,


    },
    artistText:{
        color:'black',
        fontWeight:'bold',
        alignSelf:'center',
        fontSize:18,
    },
    textInputView:{
        flexDirection:'row',
        alignItems:'center'
    }

    });
export default questionnaireStyle;


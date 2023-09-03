import { StyleSheet } from 'react-native';

const myFriendsStyle = StyleSheet.create({
    viewStyle:{
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    background: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    buttonExit: {
        backgroundColor: 'blue',
        borderRadius: 50,
        padding: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        width: 200,
        shadowColor: 'black',
        position: 'absolute',
        left: '30%',
        marginLeft: -50,
    },
    Button: {
        backgroundColor: 'blue',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        width: 200,
        shadowColor: 'black',
        position: 'absolute',
        left: '70%',
        marginLeft: -100,
    },
    buttonText: {
        color: 'white',
        fontSize: 21,
        fontWeight: 'bold',
    },
    headerText: {
        justifyContent: 'center',
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 50,
        color:'blue',
        shadowColor:'white'
    },
    textInput:{
        justifyContent: 'center',
        padding: 10,
        paddingLeft: 60,
        width: 300,
        backgroundColor:'antiquewhite'
    },
    container: {
        flex: 1,
        backgroundColor:'pink',
        flexDirection:'row'
    },
    searchStyle: {
        flexDirection:'row',
        justifyContent: 'space-between',
        height: 40,
        borderColor: 'black',
        borderWidth: 5,
        borderRadius: 20,
        paddingHorizontal: 10,

    },

});

export default myFriendsStyle;

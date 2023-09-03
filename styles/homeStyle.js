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
    TouchableOpacity: {
        backgroundColor: '#2196F3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
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
    header:{
        position: 'absolute',

        right:150,
        fontSize: 16,
        fontWeight: 'bold',
        color:'white',
        shadowColor:'green'
    },
    loginButton:{
        left:100,
        backgroundColor:'green',
    },
    linearGradient: {
        left:100,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 60
    },
    buttonText3: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },


});

export default homeStyle;

import {Animated, StyleSheet} from 'react-native';
const glowValue = new Animated.Value(0);

const loginStyle = StyleSheet.create({

    container: {
        flex: 1,
    },

    viewStyle:{
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius:60,
    },

    textInput:{
        width:300,
        backgroundColor:'transparent'
    },

    warningText:{
        color:'#8B0000',
    },

    headerText: {
        alignSelf: 'center',
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop:10,
        color:'black',
        shadowColor:'white'
    },

    background: {
        width: '100%',
        height: '100%',
    },

    button:{
        marginTop:50,
        marginBottom: 10,
        alignItems:'center',
        backgroundColor: 'rgb(0,0,0,0.8)',
        borderRadius:50,
        marginLeft:5,
    },

    fuzzyFrame: {
        marginTop:20,
        marginLeft:10,
        marginRight:10,
        paddingTop:20,
        paddingBottom:20,
        alignItems:'center',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius:50,
    },

    underlineStyle:{
        backgroundColor:'white',
        height:2
    },

    buttonLabel:{
        color:'white',
        fontSize:21,
        fontWeight: 'bold'
    },

    glow:{
        backgroundColor: glowValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['rgba(0, 0, 128, 0.7)', 'rgba(0, 0, 128, 0.9)', 'rgba(0, 0, 128, 0.7)'],
        }),
    },

    radioButtonLabel:{
        color: 'white',
        fontWeight: 'bold',
        fontSize:20
    },

    radioButton:{
        shadowColor:'white',
        flexDirection:'row'
    },

    imageLogo:{
        height: 120,
        width: 120
    },

    warningView:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },

    addImageIcon:{
        marginRight:5,
        marginBottom:20
    }

});

export default loginStyle;

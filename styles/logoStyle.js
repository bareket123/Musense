import {Dimensions, StyleSheet} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const logoStyle = StyleSheet.create({

    fullScreenImage: {
        width: windowWidth,
        height: windowHeight,
        resizeMode: "contain",
        backgroundColor: 'black',
    },

    text: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding:10,
       color:'white',
        fontSize:17,
    },

});

export default logoStyle;

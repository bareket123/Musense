import {Dimensions, StyleSheet} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const logoStyle = StyleSheet.create({

    container: {
        flex: 1,
    },
    fullScreenImage: {
        width: windowWidth,
        height: windowHeight,
        resizeMode: "contain",
        backgroundColor: 'black',
    },
});
export default logoStyle;

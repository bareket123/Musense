import { StyleSheet } from 'react-native';

const currentPlayingStyle=StyleSheet.create({
    overlayContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        blur: 5,
    },
    closeButton: {
        position: 'absolute',
        top: 16, // Adjust the top position as needed
        right: 16,

    },
    overlayText: {
        color: 'white',
        fontFamily: 'RammettoOne',
        alignSelf:'center',
        fontSize:20,
    },
    overlayImage: {
        width: 300,
        height: 300,
        borderRadius: 200,
        borderColor: 'rgba(128, 128, 128, 0.5)',
        borderWidth:10,
        alignSelf: 'center',

    },
    controlButtons: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent:'center',
        right:20,
    },
    controlButton: {
        overflow: 'hidden',
        marginHorizontal: 5,
    },
    controlIcon: {
        fontSize: 40,
        marginLeft:5,
        marginRight:5,
    },
    volumeControls: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom:15,
    },
    volumeIcon: {
        marginLeft: 5,
    },
    volumeSlider: {
        width: 300,
        height:20,
        marginLeft: 5,
        marginTop: 5,
    },
    middleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10,
    },


})
export default currentPlayingStyle;

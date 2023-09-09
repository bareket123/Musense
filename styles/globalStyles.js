import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  flexProp:{
      flex:1
  },
    text: {
        fontSize: 18,
        color: 'black',
    },
    // // Add more global styles here...
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        position: 'absolute',
        left: 100,
    },
    iconContainer: {
        position: 'absolute',
        left: '100%',
        transform: [{ translateX: -11 }],
    },

    searchStyle: {
        flexDirection:'row',
        justifyContent: 'space-between',
        height: 40,
        marginBottom:50,
        borderColor: 'black',
        borderWidth: 5,
        borderRadius: 20, // Make it circular by setting borderRadius to half of the height
        paddingHorizontal: 10,
    },
    touchableOpacity:{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#f6f6f6',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    } ,
    view : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f6f6f6',
        marginBottom: 20,
    },
    image : {
        width: 60,
        height: 60,
        borderRadius: 30
    },

});

export default globalStyles;

import { StyleSheet } from 'react-native';

const searchFriendsStyle = StyleSheet.create({

    background: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    searchStyle: {
        flex:1,
        flexDirection:'row',
        justifyContent: 'space-between',
        height: 40,
        borderColor: 'black',
        borderWidth: 5,
        borderRadius: 20,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(255,253,253,0.77)',
    },

    cardContainer: {
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10,
        marginBottom:30,
        marginLeft:20,
        marginRight:20,
        marginTop:10,
    },

    followContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },

    followIcon: {
        height: 25,
        width: 30,
        marginBottom: 5,
    },

    followText: {
        color: 'white',
        marginLeft: 10,
        fontWeight: 'bold',
    },

    textTitle : {
        alignItems:'center'
    },

    textHeader : {
        fontSize: 30,
        color: 'white',
        textShadowColor: 'rgba(134,229,17,0.9)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4
    },

    username: {
        fontWeight: 'bold',
        height: 50,
        width: 50,
        color: "white",
        marginLeft: 20,
        marginTop:15
    },

    image: {
        width: 60,
        height: 60,
        borderRadius: 30
    },

    followingRequest: {
        height: 100,
        width: 180,
        alignItems: 'center',
        marginLeft: 110
    },

    frame: {
        backgroundColor: 'rgba(19,19,19,0.5)',
        borderRadius: 20,
        margin: 5,
        height:80
    },

});

export default searchFriendsStyle;

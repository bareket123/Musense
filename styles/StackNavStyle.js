import { StyleSheet } from 'react-native';

const StackNavStyle=StyleSheet.create({

    userView:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor:'transparent',
        borderBottomWidth:1,
        borderColor:'white',
        marginBottom: 20,
    },

    userViewTitle:{
        fontSize: 23,
        fontWeight:'bold',
        color:'white',
    },

    userImage:{
        width: 70,
        height: 70,
        borderRadius: 40
    },

    logOutButton:{
        flexDirection:'row',
        bottom: 0,
        width: '100%',
       marginLeft:15,
    },

    logOutText:{
        color:'#9B2335',
        alignSelf:'center'
    },

    labelStyle:{
        color:'white',
        fontWeight:'bold',
        fontSize:15
    },

})

export default StackNavStyle;

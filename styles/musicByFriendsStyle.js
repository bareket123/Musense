import { StyleSheet } from 'react-native';

const musicByFriendsStyle = StyleSheet.create({

  mainTitle:{
      color: 'white',
      fontSize: 20,
      fontFamily: 'RammettoOne',
      alignSelf:'center',
  },

  subtitle:{
      color: 'white',
      fontSize: 18,
      marginLeft:5,
  },

    noFriendsText:{
        color: 'lightgrey',
        fontSize:30,
        alignSelf:'center',
        marginTop:100
    },

  buttonText:{
      color:'lightgrey',
      alignSelf:'center',
      fontSize:45,
      fontWeight:'bold'
  },

});

export default musicByFriendsStyle;

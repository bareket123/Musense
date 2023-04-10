import React, {useState} from 'react';
import {View, Text,StyleSheet,ImageBackground} from 'react-native';
import axios from "axios";
import { RadioButton,TextInput ,Button} from 'react-native-paper';
import isEmail from 'validator/lib/isEmail';
import { AntDesign,MaterialIcons,MaterialCommunityIcons } from '@expo/vector-icons';
import image from '../images/musicBackGround.jpg';

export default function Login ({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email,setEmail]=useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [checked, setChecked] = useState('');

    async function handleButtonPressed() {
       let res;
        try {
           if (checked==='signUp'){
               res = await axios.create({baseURL: 'http://[write your ip]:8989'}).post('/sign-up?username=' + username + '&password=' + password+'&email='+email)
               if (res.data.success) {
                   alert("sign up successfully");
                   setConfirmPassword("");
                   setEmail("");
                   setChecked('login');

               }else {
                   alert(res.data.errorCode)

               }

           }else if (checked==='login') {
               res = await axios.create({baseURL: 'http://[write your ip]:8989'}).post('/login?username=' + username + '&password=' + password)
               if (res.data.success){
                   alert("login successfully");
                   navigation.navigate("Home")
               }else {
                   alert(res.data.errorCode)

               }

           }

            } catch (error) {
                console.log(error)
            }
          setUsername("")
          setPassword("")
}


    // // http://192.168.56.1:8989/sign-up?username=f&password=123456&email=ofir123@edu.aac.ac.il
    // async function handleSignIn() {
    //     try {
    //         const res = await axios.create({baseURL: 'http://192.168.56.1:8989'}).post('/sign-up?username='+username+'&password='+password);
    //         if (res.data.success){
    //             await CookieManager.set({
    //                 name: 'token',
    //                 value: res.data.token,
    //                 domain: 'http://localhost:19006/',
    //                 origin: 'http://localhost:19006/',
    //                 path: '/',
    //                 version: '1',
    //                 expiration: '2024-01-01T00:00:00.000Z',
    //                 secure: true,
    //                 httpOnly: false,
    //                 allowSetCookie: true,
    //             });
    //             alert("sign up successfully")
    //             navigation.navigate('Home')
    //         } else {
    //             alert(res.data.errorCode)
    //         }
    //         setUsername("")
    //         setPassword("")
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }



function emailValidation(userEmail){
        let valid;
        valid = !!isEmail(userEmail);
       return valid;
}


function checkValidation(){
        let validToPress=true;
        if ((username.length===0 || password.length===0) && checked!=='' ){
            validToPress=false;
        }
        if (checked==='signUp'){
            validToPress = !(!emailValidation(email) || password !== confirmPassword);
        }
        return validToPress;
}

    function clearButton() {
        setUsername("")
        setPassword("")
        setConfirmPassword("")
        setEmail("")

    }

    return (

        <View>
            <ImageBackground source={image} style={styles.background} >
            <RadioButton.Group onValueChange={value => setChecked(value)} value={checked}>
                <RadioButton.Item labelStyle={{ color: 'black', fontWeight: 'bold',fontSize:20 }} style={{shadowColor:'white'}} label="Login" value="login" />
                <RadioButton.Item labelStyle={{ color: 'black', fontWeight: 'bold',fontSize:20 }} style={{shadowColor:'white'}} label="SignUp" value="signUp" />
            </RadioButton.Group>

            {

              checked!==''&&
                <View>
                    <Text style={styles.headerText}>Enter your {checked==='login' ? 'username and password' : 'details to sign up'}</Text>
                    <View style={styles.viewStyle}>
                        <AntDesign name="user" size={24} color="black" />
                        <TextInput
                            placeholder="Username"
                            value={username}
                            mode={"outlined"}
                            onChangeText={setUsername}
                            style={styles.textInput}

                        />
                    </View>
                    <View style={styles.viewStyle}>
                        <MaterialCommunityIcons name="lock" size={24} color="black" />
                        <TextInput
                            placeholder="Password"
                            value={password}
                            mode={"outlined"}
                            onChangeText={setPassword}
                            style={styles.textInput}
                            secureTextEntry={true}
                        />
                </View>

                    {
                        checked === 'signUp' &&
                        <View>

                        <View style={styles.viewStyle}>
                            <MaterialCommunityIcons name="lock-check" size={24} color="black"/>
                            <TextInput
                                placeholder="Confirm Password"
                                mode={"outlined"}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                style={[styles.textInput, ((password !== confirmPassword) && (password.length !== 0&& confirmPassword.length!==0)) && { backgroundColor: 'tomato'}] }
                                secureTextEntry={true}
                            />

                        </View>

                    <View style={styles.viewStyle}>

                            <MaterialIcons name="mail-outline" size={24} color="black" />
                            <TextInput
                            placeholder="Email"
                            value={email}
                            mode={"outlined"}
                            onChangeText={setEmail}
                            style={[styles.textInput,(!emailValidation(email)&&  email.length!==0)&&  { backgroundColor: 'tomato'}]}
                            keyboardType={"email-address"}
                            />




                  </View>
                  </View>
                    }
                    <Button style={styles.button} labelStyle={{color:'white',fontSize:21,fontWeight: 'bold'}}
                 mode="contained"
                disabled={!checkValidation() }
                onPress={handleButtonPressed}
                    >{checked === 'login' ? "Login" : "Sign Up"}</Button>
                    {
                        (password !== confirmPassword) && (password.length !== 0) &&(confirmPassword.length!==0)&&

                        <View style={styles.viewStyle}>
                            <MaterialCommunityIcons name="alert-circle" size={24} color="red" />
                            <View style={{ marginLeft: 5 }}>
                                <Text style={styles.warningText}>Passwords do not match</Text>
                            </View>
                        </View>
                    }
                    {
                        (!emailValidation(email)) && (email.length!==0)&&
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10  }}>
                            <MaterialCommunityIcons name="alert-circle" size={24} color="red" />
                        <Text style={styles.warningText}>email isn't valid </Text>
                        </View>
                    }
                    <Button style={styles.button} title={'clear'} labelStyle={{color:'white',fontSize:21,fontWeight: 'bold'}} mode="contained" onPress={clearButton}>Clear</Button>
                </View>
            }
        </ImageBackground>

        </View>

    );


};



const styles = StyleSheet.create({

     viewStyle:{
         justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
         // flexDirection: 'column'
     },
    textInput:{
        justifyContent: 'center',
        padding: 10,
        paddingLeft: 60,
        width: 300,
        backgroundColor:'antiquewhite'
    },
    warningText:{
    color:'red',
    },
    headerText: {
        justifyContent: 'center',
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 10,
        color:'indianred',
        shadowColor:'white'
    },
    background: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    button:{
        marginBottom: 20,
        alignItems:'center',
        backgroundColor: 'pink',
        paddingVertical: 12,
        width:200,
        paddingHorizontal: 0,
        shadowColor: 'black',
    }



});

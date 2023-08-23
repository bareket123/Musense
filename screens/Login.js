import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ImageBackground, ScrollView} from 'react-native';
import axios from "axios";
import { RadioButton,TextInput ,Button} from 'react-native-paper';
import isEmail from 'validator/lib/isEmail';
import { AntDesign,MaterialIcons,MaterialCommunityIcons } from '@expo/vector-icons';
import image from '../images/musicBackGround.jpg';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import {LOCAL_SERVER_URL, setIsLoggedIn, setToken, setUsername} from "../redux/actions";
import {useDispatch, useSelector} from "react-redux";






export default function Login ({ navigation,refresh }) {
    const dispatch = useDispatch(); // Get the dispatch function

    const [usernameInput, setUsernameInput] = useState("");
    const [password, setPassword] = useState("");
    const [email,setEmail]=useState("");
    const [picture,setPicture]=useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [checked, setChecked] = useState('');
    const {isLoggedIn}= useSelector(state => state.reducer);



    useEffect(() => {
        console.log('isLoggedIn has changed:', isLoggedIn);
        if (isLoggedIn){
            dispatch(setUsername(usernameInput))
        }
    }, [isLoggedIn]);


    async function handleButtonPressed() {

        let res;
        try {
            if (checked==='signUp'){
                console.log("enter sign")
                res = await axios.create({baseURL: LOCAL_SERVER_URL}).post('/sign-up?username=' + usernameInput + '&password=' + password+'&email='+email+"&picture="+picture)
                if (res.data.success) {
                    alert("sign up successfully");
                    setConfirmPassword("");
                    setEmail("");
                    setChecked('login');

                }else {
                    alert(res.data.errorCode)

                }

            }else if (checked==='login') {
                console.log("enter login")

                res = await axios.create({baseURL: LOCAL_SERVER_URL}).post('/login?username=' + usernameInput + '&password=' + password)
                console.log(res.data)
                if (res.data.success){
                    const token=res.data.token;
                    dispatch(setToken(token));
                       dispatch(setIsLoggedIn(true))
                        dispatch(setUsername(usernameInput))
                        console.log("is logged in :" + isLoggedIn)
                        await AsyncStorage.setItem('token', token);
                        await AsyncStorage.setItem('username', usernameInput);
                    refresh=true;
                    alert("login successfully");
                    navigation.navigate('Home');
                }else {
                    alert(res.data.errorCode)

                }

            }

        } catch (error) {
            console.log(error)
        }
        setUsernameInput("")
        setPassword("")


    }
    function emailValidation(userEmail){
        let valid;
        valid = !!isEmail(userEmail);
        return valid;
    }


    function checkValidation(){
        let validToPress=true;
        if ((usernameInput.length===0 || password.length===0) && checked!=='' ){
            validToPress=false;
        }
        if (checked==='signUp'){
            validToPress = !(!emailValidation(email) || password !== confirmPassword);
        }
        return validToPress;
    }

    function clearButton() {
        setUsernameInput("")
        setPassword("")
        setConfirmPassword("")
        setEmail("")

    }

    // const pickImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });
    //
    //     if (!result.canceled) {
    //         setPicture(result.uri);
    //         console.log(picture)
    //     }
    // };
    return (
        <ImageBackground source={image} style={styles.background} >
            <ScrollView style={styles.container}>
                <View>

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
                                    value={usernameInput}
                                    mode={"outlined"}
                                    onChangeText={setUsernameInput}
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
                                    style={[styles.textInput, checked==='login'&& {marginBottom: 20}]}
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

                                    <View style={[styles.viewStyle]}>

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
                                    {/*<View style={[styles.viewStyle,{marginBottom:20}]}>*/}
                                    {/*    <MaterialIcons name="image" size={24} color="black" />*/}
                                    {/*    <TextInput*/}
                                    {/*        placeholder="add link to picture"*/}
                                    {/*        value={picture}*/}
                                    {/*        mode={"outlined"}*/}
                                    {/*        onChangeText={setPicture}*/}
                                    {/*        style={styles.textInput}*/}
                                    {/*    />*/}

                                    {/*</View>*/}
                                </View>
                            }
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Button style={styles.button} labelStyle={{color:'white',fontSize:21,fontWeight: 'bold'}}
                                        mode="contained"
                                        disabled={!checkValidation() }
                                        onPress={handleButtonPressed}
                                >{checked === 'login' ? "Login" : "Sign Up"}</Button>
                            </View>
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
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Button style={styles.button} title={'clear'} labelStyle={{color:'white',fontSize:21,fontWeight: 'bold'}} mode="contained" onPress={clearButton}>Clear</Button>
                            </View>
                        </View>
                    }


                </View>
            </ScrollView>
        </ImageBackground>
    );


};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
        marginBottom: 10,
        alignItems:'center',
        backgroundColor: 'pink',
        paddingVertical: 10,
        width:200,
        paddingHorizontal: 0,
        shadowColor: 'black',
    }



});

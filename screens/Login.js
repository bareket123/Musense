import React, {useState} from 'react';
import {ImageBackground, ScrollView, StyleSheet, Text, View,Image} from 'react-native';
import axios from "axios";
import {Button, RadioButton, TextInput} from 'react-native-paper';
import isEmail from 'validator/lib/isEmail';
import {AntDesign, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import pic from '../images/musicBackGround.jpg';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {LOCAL_SERVER_URL, setToken, setUsername,setPicture} from "../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import ErrorAlert from "./ErrorAlert";
import {LOGIN_SUCCESSFULLY, SIGN_UP_SUCCESSFULLY} from "./Constans";
import * as ImagePicker from 'expo-image-picker';


export default function Login () {
    const dispatch = useDispatch();

    const [usernameInput, setUsernameInput] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [checked, setChecked] = useState('');
    const {isLoggedIn} = useSelector(state => state.reducer);
    const [messageCode, setMessageCode] = useState(0);

    const [uploadPic, setUploadPic] = useState(null);


    const selectImage = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) {
            setUploadPic(result.assets[0]);
        }
    };

        const uploadImage = async () => {
        if (uploadPic) {
            const formData = new FormData();
            formData.append('image', {
                uri: uploadPic.uri,
                type: 'image/jpeg',
                name: 'image.jpg',
            });

            try {
                const response = await axios.post(LOCAL_SERVER_URL + '/upload', formData, {
                    params: {
                        username: usernameInput,
                    },
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                return { success: true, imageUrl: response.data.imageUrl }; // Return the upload success and imageUrl
            } catch (error) {
                return { success: false, errorCode: response.data.errorCode };
            }
        }
    };
    async function handleButtonPressed() {
        try {
            if (checked === 'signUp') {
                console.log("enter sign");

                const uploadResponse = await uploadImage(); // Wait for the image upload
                console.log(uploadResponse);

                if (uploadResponse.success) {
                  const  res = await axios.create({baseURL: LOCAL_SERVER_URL}).post('/sign-up?username=' + usernameInput + '&password=' + password+'&email='+email+'&imageUrl='+uploadResponse.imageUrl)

                    if (res.data.success) {
                        alert(SIGN_UP_SUCCESSFULLY);
                        setConfirmPassword("");
                        setEmail("");
                        setChecked('login');
                        setUploadPic(null);
                    } else {
                        setMessageCode(res.data.errorCode);
                    }
                } else {
                    alert(uploadResponse.errorCode);
                }
            } else if (checked === 'login') {
                console.log("enter login")
                let res;
                res = await axios.create({baseURL: LOCAL_SERVER_URL}).post('/login?username=' + usernameInput + '&password=' + password)
                            console.log(res.data)
                            if (res.data.success){
                                const token=res.data.token;
                                await AsyncStorage.setItem('token', token);
                                await AsyncStorage.setItem('username', usernameInput);
                                dispatch(setToken(token));
                                dispatch(setUsername(usernameInput))
                                await setUserPic(token);
                                console.log("is logged in :" + isLoggedIn)
                                alert(LOGIN_SUCCESSFULLY);
                            }else {
                                setMessageCode(res.data.errorCode)

                            }
            }
        } catch (error) {
            console.log(error);
        }

        setUsernameInput("");
        setPassword("");
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
    const setUserPic =async (token) => {
     const res = await axios.create({baseURL: LOCAL_SERVER_URL}).get('/get-user-picture-by-token?token=' + token);
     const picUrl=res.data.toString();
     await AsyncStorage.setItem('picture', picUrl);
     dispatch(setPicture(picUrl))

    }

    return (
        <ImageBackground source={pic} style={styles.background} >
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
                                    <View style={[styles.viewStyle]}>
                                        <Button style={styles.button} labelStyle={{color:'white',fontSize:21,fontWeight: 'bold'}}
                                                onPress={selectImage}
                                        >Upload Picture </Button>

                                    </View>
                                    <View style={[styles.viewStyle]}>
                                        {uploadPic && <Image source={{ uri: uploadPic.uri }} style={styles.image} />}
                                    </View>
                                    {/*<Button style={styles.button} labelStyle={{color:'white',fontSize:21,fontWeight: 'bold'}}*/}
                                    {/*        onPress={uploadImage}*/}
                                    {/*>Upload  </Button>*/}
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
                    {
                        messageCode!==0&&
                        <ErrorAlert message={messageCode}/>
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
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 20,
    },


});

import React, {useEffect, useState} from 'react';
import { KeyboardAvoidingView } from 'react-native';

import {
    ImageBackground,
    ScrollView,
    Text,
    View,
    Image,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';
import axios from "axios";
import {Button, RadioButton, TextInput} from 'react-native-paper';
import isEmail from 'validator/lib/isEmail';
import {AntDesign, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {LOCAL_SERVER_URL, setToken, setUsername, setPicture} from "../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import ErrorAlert from "./ErrorAlert";
import {LOGIN_SUCCESSFULLY, SIGN_UP_SUCCESSFULLY} from "./Constans";
import * as ImagePicker from 'expo-image-picker';
import  loginStyle from '../styles/loginStyle'
import {registerIndieID} from "native-notify";


export default function Login () {
        const dispatch = useDispatch();
        const [usernameInput, setUsernameInput] = useState("");
        const [password, setPassword] = useState("");
        const [email, setEmail] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");
        const [checked, setChecked] = useState('login');
        const {isLoggedIn} = useSelector(state => state.reducer);
        const [messageCode, setMessageCode] = useState(0);
        const [uploadPic, setUploadPic] = useState(null);
        const [isPasswordVisible, setPasswordVisible] = useState(false);
        const [hasStartedFillingFields, setHasStartedFillingFields] = useState(false);

    useEffect(()=>{
        setMessageCode(0)

    },[checked])
        const selectImage = async () => {
            setHasStartedFillingFields(true);
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
        const togglePasswordVisibility = () => {
            setPasswordVisible(!isPasswordVisible);
        };
        async function handleButtonPressed() {
            let res;
            try {
                if (checked === 'signUp') {
                    console.log("enter sign");
                    res = await axios.create({baseURL: LOCAL_SERVER_URL}).post('/check-if-username-available?username=' + usernameInput)
                    if (res.data.success){
                        const uploadResponse = await uploadImage(); // Wait for the image upload
                        console.log(uploadResponse);
                        res = await axios.create({baseURL: LOCAL_SERVER_URL}).post('/sign-up?username=' + usernameInput + '&password=' + password+'&email='+email+'&imageUrl='+uploadResponse.imageUrl)
                        if (res.data.success) {
                            setMessageCode(SIGN_UP_SUCCESSFULLY);
                        } else {
                            setMessageCode(res.data.errorCode);
                            console.log(res.data.errorCode)
                        }
                    }else {
                        setMessageCode(res.data.errorCode)
                        console.log("already exist")

                    }

                } else if (checked === 'login') {
                    console.log("enter login")
                    res = await axios.create({baseURL: LOCAL_SERVER_URL}).post('/login?username=' + usernameInput + '&password=' + password)
                    console.log(res.data)
                    setMessageCode(LOGIN_SUCCESSFULLY)
                    if (res.data.success){
                        const token=res.data.token;
                        registerIndieID(`${usernameInput}`, 11941, '7alrGeOddFsagJZ65YfsHS');

                        await AsyncStorage.setItem('token', token);
                        await AsyncStorage.setItem('username', usernameInput);
                        dispatch(setToken(token));
                        dispatch(setUsername(usernameInput))
                        await setUserPic(token);
                        console.log("is logged in :" + isLoggedIn)
                    }else {
                        setMessageCode(res.data.errorCode)
                    }
                }
            } catch (error) {
                console.log(error);
                setMessageCode(error)
            }
            clearButton()

        }


        function emailValidation(userEmail){
            let valid;
            valid = !!isEmail(userEmail);
            return valid;
        }


        function checkValidation(){
            let validToPress=true;
            if ((usernameInput.length===0|| usernameInput==='')||(password.length===0 ||password==='' )){
                validToPress=false;
            }
            if ((checked==='signUp' )&&((!emailValidation(email) || password !== confirmPassword)||(password.length <6)||(uploadPic===null)))
            {
                validToPress=false;

            }
            return validToPress;
        }


        function clearButton() {
            setUsernameInput("")
            setPassword("")
            setConfirmPassword("")
            setEmail("")
            setUploadPic(null)
            setHasStartedFillingFields(false)
            // setMessageCode(0)
        }


        const setUserPic =async (token) => {
            const res = await axios.create({baseURL: LOCAL_SERVER_URL}).get('/get-user-picture-by-token?token=' + token);
            const picUrl=res.data.toString();
            await AsyncStorage.setItem('picture', picUrl);
            dispatch(setPicture(picUrl))
        }

        return (
            <KeyboardAvoidingView

                style={{flex: 1}}
                keyboardVerticalOffset={1} // Adjust the value as needed
            >


            <ImageBackground source={{uri:'https://media3.giphy.com/media/lKaeQAunM3hZaqsOpj/giphy.gif'}} style={loginStyle.background} >
                <ScrollView style={loginStyle.container}>

                    <View>


                        {
                            checked!==''&&
                            <View>
                                <View style={loginStyle.fuzzyFrame}>

                                    <Image source={{uri:'https://st4.depositphotos.com/4329009/19956/v/450/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg'}} style={{width:100,height:100,borderRadius:50}}/>
                                    <Text style={loginStyle.headerText}>Enter your {checked==='login' ? 'username and password' : 'details to sign up'}</Text>
                                    <View style={loginStyle.viewStyle}>
                                        <AntDesign name="user" size={24} color="black" />
                                        <TextInput
                                            placeholder="Username"
                                            placeholderTextColor={'white'}
                                            value={usernameInput}
                                            mode={"flat"}
                                            textColor={'white'}
                                            underlineStyle={loginStyle.underlineStyle}
                                            onChangeText={(text) => {
                                                setUsernameInput(text);
                                                setHasStartedFillingFields(true); // Add this line
                                            }}
                                            style={{ width: 300, backgroundColor: 'transparent' }}
                                        />

                                    </View>



                                    <View style={loginStyle.viewStyle}>
                                        <MaterialCommunityIcons name="lock" size={24} color="black" />
                                        <TextInput
                                            placeholder="Password"
                                            value={password}
                                            mode={"flat"}
                                            placeholderTextColor={'white'}
                                            underlineStyle={loginStyle.underlineStyle}
                                            onChangeText={(text) => {
                                                setPassword(text);
                                                setHasStartedFillingFields(true); // Add this line
                                            }}
                                            textColor={'white'}
                                            style={[loginStyle.textInput, checked==='login'&& {marginBottom: 20}]}
                                            secureTextEntry={!isPasswordVisible&&true}
                                        />
                                        {password.length > 0 && (
                                            <TouchableOpacity onPress={togglePasswordVisibility}>
                                                <MaterialCommunityIcons
                                                    name={isPasswordVisible ? 'eye-off' : 'eye'}
                                                    size={24}
                                                    color={isPasswordVisible ? 'gray' : 'black'}
                                                />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                    {
                                        checked === 'signUp' &&
                                        <View>
                                            <View style={loginStyle.viewStyle}>
                                                <MaterialCommunityIcons name="lock-check" size={24} color="black"/>
                                                <TextInput
                                                    placeholder="Confirm Password"
                                                    mode={"flat"}
                                                    textColor={'white'}
                                                    placeholderTextColor={'white'}
                                                    underlineStyle={loginStyle.underlineStyle}
                                                    value={confirmPassword}
                                                    onChangeText={(text) => {
                                                        setConfirmPassword(text);
                                                        setHasStartedFillingFields(true); // Add this line
                                                    }}
                                                    style={[loginStyle.textInput, ((password !== confirmPassword) && (password.length !== 0&& confirmPassword.length!==0)) && { backgroundColor: '#8B0000'}] }
                                                    secureTextEntry={true}
                                                />
                                            </View>
                                            <View style={[loginStyle.viewStyle]}>
                                                <MaterialIcons name="mail-outline" size={24} color="black" />
                                                <TextInput
                                                    placeholder="Email"
                                                    value={email}
                                                    mode={"flat"}
                                                    textColor={'white'}
                                                    placeholderTextColor={'white'}
                                                    underlineStyle={loginStyle.underlineStyle}
                                                    onChangeText={(text) => {
                                                        setEmail(text);
                                                        setHasStartedFillingFields(true); // Add this line
                                                    }}
                                                    style={[loginStyle.textInput,(!emailValidation(email)&&  email.length!==0)&&  { backgroundColor: '#8B0000'}]}
                                                    keyboardType={"email-address"}
                                                />
                                            </View>
                                            <TouchableHighlight onPress={selectImage}  underlayColor='rgba(255, 255, 255, 0.5)' style={{marginTop:5}}>
                                                <View style={{flexDirection:'row'}}>
                                                    <MaterialCommunityIcons name="image-plus" size={24} color="black" style={loginStyle.addImageIcon}/>
                                                    <Text style={{fontSize:18,color:'white'}}>Add Profile Picture</Text>
                                                </View>
                                            </TouchableHighlight>

                                            <View >
                                                {uploadPic && <Image source={{ uri: uploadPic.uri }} style={{width:50,height:50}} />}
                                            </View>
                                        </View>
                                    }

                                    <View style={{flexDirection:'column'}}>
                                        {(hasStartedFillingFields &&(usernameInput.length === 0 || usernameInput.trim() === '') )&& (
                                            <View style={[loginStyle.warningView]}>
                                                <MaterialCommunityIcons name="alert-circle" size={24} color="#8B0000" />
                                                <Text style={loginStyle.warningText}>Username cannot be empty</Text>
                                            </View>
                                        )}
                                        {(hasStartedFillingFields &&(password.length === 0 || password.trim() === '') )&& (
                                            <View style={[loginStyle.warningView]}>
                                                <MaterialCommunityIcons name="alert-circle" size={24} color="#8B0000" />
                                                <Text style={loginStyle.warningText}>Password cannot be empty</Text>
                                            </View>
                                        )}
                                        {(checked==='signUp')&&(hasStartedFillingFields &&(password.length <6 )&&
                                            <View style={[loginStyle.warningView]}>
                                                <MaterialCommunityIcons name="alert-circle" size={24} color="#8B0000" />
                                                <Text style={loginStyle.warningText}>Password is Weak </Text>
                                            </View>
                                        )}
                                        {(checked==='signUp')&& (hasStartedFillingFields) && !uploadPic && (
                                            <View style={[loginStyle.warningView]}>
                                                <MaterialCommunityIcons name="alert-circle" size={24} color="#8B0000" />
                                                <Text style={loginStyle.warningText}>Please add a profile picture</Text>
                                            </View>
                                        )}
                                        {(password !== confirmPassword && password.length !== 0 && confirmPassword.length !== 0) &&
                                            <View style={[loginStyle.warningView]}>
                                                <MaterialCommunityIcons name="alert-circle" size={24} color="#8B0000" />
                                                <Text style={loginStyle.warningText}>Passwords do not match</Text>
                                            </View>
                                        }
                                        {(checked==='signUp')&& (hasStartedFillingFields) && (email.length === 0 || email.trim() === '') && (
                                            <View style={[loginStyle.warningView]}>
                                                <MaterialCommunityIcons name="alert-circle" size={24} color="#8B0000" />
                                                <Text style={loginStyle.warningText}>Email cannot be empty</Text>
                                            </View>
                                        )}
                                        {(!emailValidation(email)) && (email.length!==0)&&
                                            <View style={[loginStyle.warningView]}>
                                                <MaterialCommunityIcons name="alert-circle" size={24} color='#8B0000' />
                                                <Text style={loginStyle.warningText}>email isn't valid </Text>
                                            </View>
                                        }
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Button style={[loginStyle.button,loginStyle.glow]} labelStyle={loginStyle.buttonLabel}
                                                mode="contained"
                                                disabled={!checkValidation() }
                                                onPress={handleButtonPressed}
                                        >{checked === 'login' ? "Login" : "Sign Up"}</Button>

                                        <Button style={[loginStyle.button,loginStyle.glow]} title={'clear'} labelStyle={loginStyle.buttonLabel} mode="contained" onPress={clearButton}>Clear</Button>
                                    </View>

                                </View>
                            </View>
                        }
                        {
                            messageCode!==0&&
                            <ErrorAlert message={messageCode}/>
                        }
                        <RadioButton.Group onValueChange={value => setChecked(value)} value={checked} >
                            <View style={{flexDirection:'row',alignSelf:'center'}}>
                                <RadioButton.Item  labelStyle={loginStyle.radioButtonLabel} color={'white'} style={loginStyle.radioButton} label="Login" value="login" />
                                <RadioButton.Item labelStyle={loginStyle.radioButtonLabel} color={'white'} style={loginStyle.radioButton} label="SignUp" value="signUp" />
                            </View>
                        </RadioButton.Group>



                    </View>

                </ScrollView>
                <View style={{position:'absolute',bottom:0,right:0 }}>
                    <Image source={require('../images/simpleLogoLogin.png')}   style={[loginStyle.imageLogo, checked === 'signUp' && { height: 80, width: 80 }]} />
                </View>
            </ImageBackground>
            </KeyboardAvoidingView>
        );
};

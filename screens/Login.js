import React, {useState} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import axios from "axios";
import { RadioButton } from 'react-native-paper';
import isEmail from 'validator/lib/isEmail';




export default function Login ({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email,setEmail]=useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [type, setType] = useState("");
    const [checked, setChecked] = useState('');


    async function handleButtonPressed() {
       let res;
        try {
           if (checked==='signUp'){
               res = await axios.create({baseURL: 'http://[write your ip adress]:8989'}).post('/sign-up?username=' + username + '&password=' + password+'&email='+email)
               if (res.data.success) {
                   alert("sign up successfully");
                   setConfirmPassword("");
                   setEmail("");
                   setChecked('login');

               }else {
                   alert(res.data.errorCode)

               }

           }else if (checked==='login') {
               res = await axios.create({baseURL: 'http://[write your ip adress]:8989'}).post('/login?username=' + username + '&password=' + password)
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
// function emailValidation(userEmail){
//         let valid;
//         if (isEmail(userEmail)) {
//             valid=true;
//             console.log('Valid email address');
//         } else {
//             valid=false;
//             //setEmail("")
//             console.log('Invalid email address');
//         }
//        return valid;
// }

    function loginButton() {
        setType("login")
        console.log(type)
    }
    function signUpButton() {
        setType("signUp")
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <RadioButton.Group onValueChange={value => setChecked(value)} value={checked}>
                <RadioButton.Item label="Login" value="login" onValueChange={() => loginButton()} />
                <RadioButton.Item label="SignUp" value="signUp" onValueChange={() => signUpButton()} />
            </RadioButton.Group>

            {

              checked!==''&&
                <View>
                <Text>Enter your {checked==='login' ? 'username and password' : 'details to sign up'}</Text>
                 <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={{ borderWidth: 1, borderColor: 'gray', padding: 10 }}
                 />
                <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                style={{ borderWidth: 1, borderColor: 'white', padding: 10 }}
                secureTextEntry={true}
                />


                    {
                 checked === 'signUp' &&
                  <View>
                <TextInput
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={{ borderWidth: 1, borderColor: 'white', padding: 10 }}
                secureTextEntry={true}
                />
                      {
                          password!==confirmPassword&&
                          <Text style={{ color: 'red' }}>passwords not match</Text>
                      }
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={{ borderWidth: 1, borderColor: 'white', padding: 10 }}
                    keyboardType={"email-address"}
                />

                </View>
                    }
                <Button title={checked==='login'?"Login":"Sign Up"}
                disabled={(username.length===0|| password.length===0)&& checked!==''}
                onPress={handleButtonPressed}
                />
                </View>
            }

        </View>
    );
}

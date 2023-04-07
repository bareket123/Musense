import React, {useState} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import axios from "axios";

export default function SignIn ({ navigation }) {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");

    async function  handleSignIn() {
        try {
            //how to do post method->
            const res=await axios.create({baseURL: 'http://[write your ip adress]:8989'}).post('/sign-up?username='+username+'&password='+password
                )
            if (res.data.success){
                alert("sign up successfully")
                navigation.navigate('Home')


            }else {
                alert(res.data.errorCode)
            }
            setUsername("")
            setPassword("")
            // console.log(res.data)
            // if (username!==""){
            //     axios.post('http://[write your ip address]:8989/sign-up?', {username, password}).then(((res)=>{
            //
            //         if (res.data.success){
            //             console.log("success")
            //         }else {
            //             console.log(res.data)
            //         }
            //         setUsername("");
            //         setPassword("");
            //     }))
            // }



        }catch (error){
        console.log(error)
        }
        //how to do get method->
        // try {
        //     const res = await axios.get('http://[write your ip address]:8989/get-users-size');
        //     console.log(res.data);
        //     setUsers(res.data);
        // } catch (error) {
        //     console.log(error)
        // }

    }

    return (
        <View>
            <Text>please fill the following details:</Text>
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
            <Button title="Sign In" onPress={handleSignIn} disabled={username.length===0|| password.length===0} />


                <Text>{username}</Text>

        </View>
    );
}

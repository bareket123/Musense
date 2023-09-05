import React, { useState } from 'react';
import { Alert } from 'react-native';
import  alertStyle from '../styles/alertStyle'

function ErrorAlert(props) {
    let messageForUser='';
    const [visible, setVisible] = useState(true);
    let message = props.message;
    let type=message<1012? 'ERROR':'SUCCESS';
    if (visible){
        switch (message) {
            case 1000:
                messageForUser = 'error missing username ';
                break;
            case 1001:
                messageForUser = 'error missing password';
                break;
            case 1002:
                messageForUser = "error weak password";
                break;
            case 1003:
                messageForUser = 'error username already exists ';
                break;
            case 1004:
                messageForUser = 'error wrong login details ';
                break;
            case 1005:
                messageForUser = 'error not found user';
                break;
            case 1006:
                messageForUser = 'error not found friend';
                break;
            case 1007:
                messageForUser = 'error wrong song details';
                break;
            case 1008:
                messageForUser = 'error playlist not exist';
                break;
            case 1009:
                messageForUser = 'error in answers details';
                break;
            case 1010:
                messageForUser = 'error wrong answers details';
                break;
            case 1011:
                messageForUser = 'error no such connection';
                break;
            case 1012:
                messageForUser = 'image upload failed';
                break;
            ///////////////////////////////constant
            case 1013:
                messageForUser = 'SignUp successfully';
                break;
            case 1014:
                messageForUser = 'LogIn successfully';
                break;
            case 1015:
                messageForUser = 'following';
                break;
            case 1016:
                messageForUser = 'delete';
                break;
            case 1017:
                messageForUser = 'something went wrong';
                break;
        }
    }


    const handleClose = () => {
        setVisible(false);
    };

    return (
        Alert.alert(type, messageForUser, [{ text: 'OK' ,onPress: handleClose}])

    );
}

export default ErrorAlert;

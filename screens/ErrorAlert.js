import React, { useState } from 'react';
import { Alert } from 'react-native';
import alertStyle from "../styles/alertStyle";

function ErrorAlert(props) {
    let messageForUser='';
    const [visible, setVisible] = useState(true);
    let message = props.message;
    let type=message<1012? 'ERROR':'SUCCESS';
    if (visible){
        switch (message) {
            case 1000:
                messageForUser = 'ERROR MISSING USERNAME ';
                break;
            case 1001:
                messageForUser = 'ERROR MISSING PASSWORD';
                break;
            case 1002:
                messageForUser = "ERROR WEAK PASSWORD";
                break;
            case 1003:
                messageForUser = 'ERROR USERNAME ALREADY EXISTS';
                break;
            case 1004:
                messageForUser = 'ERROR WRONG LOGIN DETAILS';
                break;
            case 1005:
                messageForUser = 'ERROR NOT FOUND USER';
                break;
            case 1006:
                messageForUser = 'ERROR NOT FOUND FRIEND';
                break;
            case 1007:
                messageForUser = 'ERROR WRONG SONG DETAILS';
                break;
            case 1008:
                messageForUser = 'ERROR PLAYLIST NOT EXIST';
                break;


            case 1009:
                messageForUser = 'ERROR_IN_ANSWERS_DETAILS';
                break;
            case 1010:
                messageForUser = 'ERROR_WRONG_ANSWERS_DETAILS';
                break;
            case 1011:
                messageForUser = 'ERROR_NO_SUCH_CONNECTION';
                break;
            case 1012:
                messageForUser = 'IMAGE_UPLOAD_FAILED';
                break;


            ///////////////////////////////constant

            case 1013:
                messageForUser = 'SIGN_UP_SUCCESSFULLY';
                break;
            case 1014:
                messageForUser = 'LOGIN_SUCCESSFULLY';
                break;
            case 1015:
                messageForUser = 'FOLLOWING';
                break;
            case 1016:
                messageForUser = 'DELETE';
                break;
            case 1017:
                messageForUser = 'SOMETHING_WENT_WRONG';
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




// import React, { useState } from 'react';
// import { Alert } from 'react-native';
// import alertStyle from "./alertStyle";
//
// function ErrorAlert(props) {
//     let messageForUser='';
//     const [visible, setVisible] = useState(true);
//     let message = props.message;
//     let type=message<1012? 'ERROR':'SUCCESS';
//     if (visible){
//         switch (message) {
//             case 1000:
//                 messageForUser = 'error missing username ';
//                 break;
//             case 1001:
//                 messageForUser = 'error missing password';
//                 break;
//             case 1002:
//                 messageForUser = "error weak password";
//                 break;
//             case 1003:
//                 messageForUser = 'error username already exists ';
//                 break;
//             case 1004:
//                 messageForUser = 'error wrong login details ';
//                 break;
//             case 1005:
//                 messageForUser = 'error not found user';
//                 break;
//             case 1006:
//                 messageForUser = 'error not found friend';
//                 break;
//             case 1007:
//                 messageForUser = 'error wrong song details';
//                 break;
//             case 1008:
//                 messageForUser = 'error playlist not exist';
//                 break;
//             case 1009:
//                 messageForUser = 'error in answers details';
//                 break;
//             case 1010:
//                 messageForUser = 'error wrong answers details';
//                 break;
//             case 1011:
//                 messageForUser = 'error no such connection';
//                 break;
//             case 1012:
//                 messageForUser = 'image upload failed';
//                 break;
//             ///////////////////////////////constant
//             case 1013:
//                 messageForUser = 'SignUp successfully';
//                 break;
//             case 1014:
//                 messageForUser = 'LogIn successfully';
//                 break;
//             case 1015:
//                 messageForUser = 'following';
//                 break;
//             case 1016:
//                 messageForUser = 'delete';
//                 break;
//             case 1017:
//                 messageForUser = 'something went wrong';
//                 break;
//         }
//     }


import React, { useState } from 'react';
import { Alert } from 'react-native';

function ErrorAlert(props) {
    let messageForUser='';
    const [visible, setVisible] = useState(true);
    let message = props.message;
    let type=message<1009? 'ERROR':'SUCCESS';
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


            ///////////////////////////////constant
            case 1009:
                messageForUser = 'SIGN UP SUCCESSFULLY';

                break;
            case 1010:
                messageForUser = 'LOGIN SUCCESSFULLY';
                break;
            case 1011:
                messageForUser = 'FOLLOWING';
                break;
            case 1012:
                messageForUser = 'DELETE';
                break;
            case 1013:
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

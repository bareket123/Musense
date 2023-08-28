
import React, { useState } from 'react';
import { Alert } from 'react-native';

function ErrorAlert(props) {
    const [visible, setVisible] = useState(true);
    let message = props.message;


    switch (message) {
        case 1000:
            message = 'ERROR MISSING USERNAME ';
            break;
        case 1001:
            message = 'ERROR MISSING PASSWORD';
            break;
        case 1002:
            message = "ERROR WEAK PASSWORD";
            break;
        case 1003:
            message = 'ERROR USERNAME ALREADY EXISTS';
            break;
        case 1004:
            message = 'ERROR WRONG LOGIN DETAILS';
            break;
        case 1005:
            message = 'ERROR NOT FOUND USER';
            break;
        case 1006:
            message = 'ERROR NOT FOUND FRIEND';
            break;
        case 1007:
            message = 'ERROR WRONG SONG DETAILS';
            break;
        case 1008:
            message = 'ERROR PLAYLIST NOT EXIST';
            break;

            ///////////////////////////////constant
        case 1009:
            message = 'SIGN UP SUCCESSFULLY';
            break;
        case 1010:
            message = 'LOGIN SUCCESSFULLY';
            break;
        case 1011:
            message = 'FOLLOWING';
            break;
        case 1012:
            message = 'DELETE';
            break;
        case 1013:
            message = 'SOMETHING_WENT_WRONG';
            break;
    }

    const handleClose = () => {
        setVisible(false);
    };

    return (
        Alert.alert('Error', message, [{ text: 'OK' ,onPress: handleClose}])

);
    return null;
}

export default ErrorAlert;

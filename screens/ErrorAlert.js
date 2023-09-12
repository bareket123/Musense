import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal,StyleSheet  } from 'react-native';
// import { Alert } from 'react-native';
import  alertStyle from '../styles/alertStyle'
//
function ErrorAlert(props) {
    let messageForUser='';
    const [visible, setVisible] = useState(true);
    let message = props.message;
    let type=message<1013? 'ERROR':'SUCCESS';
    if (visible){
        switch (message) {
            case 1000:
                messageForUser = 'Missing Username ⚠️ ';
                break;
            case 1001:
                messageForUser = 'Missing password ⚠️';
                break;
            case 1002:
                messageForUser = "Weak password ⚠️";
                break;
            case 1003:
                messageForUser = 'Username Already Exists ⚠️';
                break;
            case 1004:
                messageForUser = 'Wrong Login Details ⚠️ ';
                break;
            case 1005:
                messageForUser = 'User Not Found❗';
                break;
            case 1006:
                messageForUser = 'Friend Not Found❗';
                break;
            case 1007:
                messageForUser = 'Wrong Song Details';
                break;
            case 1008:
                messageForUser = 'Playlist Not Exist';
                break;
            case 1009:
                messageForUser = 'error in answers details';
                break;
            case 1010:
                messageForUser = 'error wrong answers details';
                break;
            case 1011:
                messageForUser = 'No Such Connection ❗';
                break;
            case 1012:
                messageForUser = 'Image Upload Failed 🖼️⚠️';
                break;
            case 1013:
                messageForUser='Played Recently is Empty'
                break;
            case 1014:
                messageForUser='Not Found Followers'
                break;
            ///////////////////////////////constant
            case 1015:
                messageForUser = 'Sign Up Successfully';
                break;
            case 1016:
                messageForUser = 'Login Successfully';
                break;
            case 1017:
                messageForUser = 'Following Successfully';
                break;
            case 1018:
                messageForUser = 'Deleted Successfully ';
                break;
            case 1019:
                messageForUser = 'Something went Wrong 🥹';
                break;
            case 1020:
                messageForUser = 'Permission to access camera roll is required❗';
                break;
            case 1021:
                messageForUser='Favorite Removed Successfully'
                break;


        }
    }


    const handleClose = () => {
        setVisible(false);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={()=>handleClose()}
        >
            <View style={alertStyle.centeredView}>
                <View style={alertStyle.alertView}>
                    <Text style={alertStyle.alertText}> {messageForUser}</Text>
                    <TouchableOpacity style={alertStyle.closeButton} onPress={handleClose}>
                        <Text style={alertStyle.closeButtonText }>✖️</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

export default ErrorAlert;

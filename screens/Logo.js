import React, {useEffect, useState} from "react";
import {Image, View, Text} from "react-native";
import logoStyle from "../styles/logoStyle";

export default function Logo() {
    const [showNote, setShowNote] = useState(false);

    useEffect(() => {
        // Set a timeout of 5 seconds to show the note
        const timeoutId = setTimeout(() => {
            setShowNote(true);
        }, 5000);

        // Cleanup the timeout if the component unmounts
        return () => clearTimeout(timeoutId);
    }, []);

    return (

         <View>
            <Image
                source={require('../images/Logo.gif')}
                style={logoStyle.fullScreenImage}
            />
             {showNote && <Text style={logoStyle.text}>it might take a while we apologize for the inconvenience...</Text>}
         </View>


    );
}



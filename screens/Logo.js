import React from "react";
import {Image, StyleSheet, View, Dimensions, Text} from "react-native";
import logoStyle from "../styles/logoStyle";

export default function Logo() {
    return (
        <View style={logoStyle.container}>
            <Image
                source={require('../images/Logo.gif')}
                style={logoStyle.fullScreenImage}
            />
        </View>
    );
}



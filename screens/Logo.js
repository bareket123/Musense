import React from "react";
import {Image, StyleSheet, View, Dimensions, Text} from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Logo() {
    return (
        <View style={styles.container}>
            <Image
                source={require('../images/Logo.gif')}
                style={styles.fullScreenImage}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fullScreenImage: {
        width: windowWidth,
        height: windowHeight,
        resizeMode: "contain", // or 'cover' based on your preference
        backgroundColor: 'black',
    },
});

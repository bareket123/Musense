import React from 'react';
import { ScrollView,View, Text, Button,StyleSheet } from 'react-native';

export default function MyPlaylist ({ navigation }) {
  return (
    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <Text>choose an Atist:</Text>
    //   <Button
    //     title="Go back to Home"
    //     onPress={() => navigation.navigate('Home')}
    //   />
    // </View>
      <ScrollView style={styles.container}>
          <Text style={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit turpis vitae libero congue, eget bibendum nisi bibendum. Nullam et metus in purus vehicula aliquam. Mauris sit amet enim vitae felis tempus hendrerit. Fusce et augue quis nulla malesuada lobortis. Sed ut faucibus velit. Donec imperdiet, lorem ac malesuada pretium, justo dui aliquam ex, a lacinia velit velit vel lacus. Nullam malesuada, mi sed dictum bibendum, tellus nulla finibus nibh, sed ultrices quam magna nec nunc. Maecenas volutpat, ex sit amet dictum eleifend, elit metus blandit enim, sit amet ultricies velit nisi eu nulla. Praesent faucibus, quam eu rutrum mollis, augue tortor dignissim eros, non sodales nibh enim vel libero. Curabitur euismod, odio a dignissim pulvinar, est nunc blandit massa, sed semper justo tortor sit amet nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
          </Text>
      </ScrollView>
  );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
    },
});



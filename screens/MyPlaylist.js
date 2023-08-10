import React, {useContext, useState} from 'react';
import {ScrollView, View, Text, Button, StyleSheet, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRoute } from '@react-navigation/native';
import {GlobalStateContext} from './GlobalStateContext';



export default function MyPlaylist ({ navigation }) {
    const [image, setImage] = useState(null);
    const {myPlaylist}=useContext(GlobalStateContext);
    const route = useRoute();
    const receivedArray = route.params?.data || [];

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.uri);
        }
    };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>choose an Atist:</Text>
        <Button title="Upload Picture" onPress={pickImage} />
        {typeof image === 'string' && (
            <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200, marginTop: 20 }}
            />
        )}

        <Button
        title="Go back to Home"
        onPress={() => navigation.navigate("Home")}
      />
        <View>
            <Text>Received Array:</Text>
            {
                myPlaylist.map((item, index) => {
                    return(
                 <Text>{item.title}</Text>
                )
            })}
        </View>
    </View>

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



import React from 'react';
import { View, Text, Button } from 'react-native';

export default function PlayedRecently({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Played Recently:</Text>
      <Button
        title="Go back to Home"
        onPress={() => navigation.navigate('Home')}
      />

    </View>
  );
}

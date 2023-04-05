import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,flexDirection: 'column'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
        <Button
            title="Go to popular"
            onPress={() => navigation.navigate('Popular')}

        />
        <Button
            title="played recently"
            onPress={() => navigation.navigate('played')}

        />
             <Button
            title="played Music by artist"
            onPress={() => navigation.navigate('artist')}

        />
           
             <Button
            title="played Music by friends"
            onPress={() => navigation.navigate('friends')}

        />
              <Button
            title="my playlist"
            onPress={() => navigation.navigate('playlist')}

        />
        
         
    </View>
  );
}

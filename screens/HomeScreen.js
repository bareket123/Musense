import {ScrollView, SafeAreaView, TouchableOpacity, Text, Image,View} from 'react-native';
import  homeStyle from '../styles/homeStyle'


const HomeScreen = ({ navigation }) => {

    return (
        <ScrollView style={homeStyle.container}>
            <SafeAreaView>
                <View style={homeStyle.SafeAreaView}>
                    <TouchableOpacity onPress={()=>{ navigation.navigate('Popular')}}>
                        <Image source={require('../images/popularHome.gif')} style={homeStyle.image}  resizeMode="cover"
                        />
                        <Text style={homeStyle.caption}>Popular Music</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{ navigation.navigate('Played')}}>
                        <Image source={require('../images/playedRecentlyHome.gif')} style={homeStyle.image}/>
                        <Text style={homeStyle.caption}>Played Recently</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{ navigation.navigate('Search Artists')}}>
                        <Image source={require('../images/musicHome.png')} style={homeStyle.image}/>
                        <Text style={homeStyle.caption}> Music by Artist</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{ navigation.navigate('Friends Music')}}>
                        <Image source={require('../images/FriendsMusicHome.gif')} style={homeStyle.image}/>
                        <Text style={homeStyle.caption}>Played Music by Friends</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{ navigation.navigate('Playlist')}}>
                        <Image source={require('../images/playlistHome.gif')} style={homeStyle.image}/>
                        <Text style={homeStyle.caption}>my playlist</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{ navigation.navigate('Find Friends')}}>
                        <Image source={require('../images/findFriends.gif')} style={homeStyle.image}/>
                        <Text style={homeStyle.caption}>Find Friends</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{ navigation.navigate('My Connections')}}>
                        <Image source={require('../images/MtConnectionsHome.gif')} style={homeStyle.image}/>
                        <Text style={homeStyle.caption}>My Connections</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{ navigation.navigate('Recommendations')}}>
                        <Image source={require('../images/recommendationsHome.gif')} style={homeStyle.image}/>
                        <Text style={homeStyle.caption}>Recommendations</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};


export default HomeScreen;

import React, { useState } from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import {Fontisto, SimpleLineIcons} from '@expo/vector-icons';
import axios from "axios";
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";

const SearchFriends = ({ navigation }) => {
    const [searchFriend, setSearchFriend] = useState('');
    const [foundUser,setFoundUser]=useState({});


    const handleSearch = (text) => {
        setSearchFriend(text);
    };

    const search = async () => {
        const response = await axios.create({baseURL: 'http://192.168.68.116:8989'}).post('/search-by-user-username?username=' + searchFriend);
        if (response.data.success) {
            setFoundUser(response.data.friendsDetailsModel)

        } else {
            alert(response.data.errorCode)

        }
        setSearchFriend("")
    };


    return (
        <View>
            <View style={styles.searchStyle}>
                <TextInput
                    placeholder="Search Friends..."
                    onChangeText={handleSearch}
                    value={searchFriend}
                />
                <TouchableOpacity onPress={search}>
                    <Fontisto name="search" size={30} color="black" />
                </TouchableOpacity>
            </View>
            {
                foundUser!==null &&
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity>
                        <View style={{height: 100, width: 180, alignItems: 'center' }}>
                            <SimpleLineIcons name="user-follow" size={24} color="black" style={{ height: 30, width: 50, marginBottom: 5 }} />
                            <Text >You can start following</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{marginLeft:100}}>
                        <Text style={{height:50, width:50}}> {foundUser.username}</Text>
                    </View>
                    <Image
                        source={{
                            uri: foundUser.picture,
                        }}
                        style={{ width: 60, height: 60, borderRadius: 30 }}
                    />

                </View>
            }

        </View>
    );
};

const styles = StyleSheet.create({
    searchStyle: {
        flexDirection:'row',
        justifyContent: 'space-between',
        height: 40,
        marginBottom:50,
        borderColor: 'black',
        borderWidth: 5,
        borderRadius: 20, // Make it circular by setting borderRadius to half of the height
        paddingHorizontal: 10,
    },
});

export default SearchFriends;










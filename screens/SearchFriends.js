import React, {useEffect, useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import {Fontisto, SimpleLineIcons} from '@expo/vector-icons';
import axios from "axios";
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {LOCAL_SERVER_URL, setToken} from "../redux/actions";
import {useSelector} from "react-redux";

const SearchFriends = ({ navigation }) => {
    const [searchFriend, setSearchFriend] = useState('');
    const [foundUser,setFoundUser]=useState(null);
    const {token} = useSelector(state => state.reducer);
    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers,setFilteredUsers]=useState([]);

    useEffect(() => {
        if (token!==null)
        setUsersFromServer().then(r => {})
    },[token]);



    const handleSearch = (text) => {
        setSearchFriend(text);
        if (text !== '') {
            const tempFilteredUsers = allUsers.filter((user) => {
                return user.username.includes(text);
            });
            setFilteredUsers(tempFilteredUsers);
        } else {
            setFilteredUsers(allUsers);
        }
        console.log(token);
        console.log(filteredUsers);
    };



    // const search = async () => {
    //     // const response = await axios.create({baseURL: LOCAL_SERVER_URL}).post('/search-by-user-username?username=' + searchFriend);
    //     // if (response.data.success) {
    //     //     setFoundUser(response.data.friendsDetailsModel)
    //     //
    //     // } else {
    //     //     alert(response.data.errorCode)
    //     //
    //     // }
    //     // setSearchFriend("")
    //
    // };
    const followingRequest = async ()=>{
           console.log("inside ")
        if (token!==''){
            const response = await axios.create({baseURL: LOCAL_SERVER_URL}).post('/follow-friend?token=' + token +'&friendUsername='+foundUser.username);
            if (response.data.success){
                alert("following")
            }else {
                alert(response.data.errorCode)
            }
        }else {
            console.log("token is empty")
        }

    }

    const setUsersFromServer = async ()=>{
            if (token!==''){
            const response = await axios.create({baseURL: LOCAL_SERVER_URL}).post('/get-all-Users-without-current?token=' + token);
            if (response.data.success){
                setAllUsers(response.data.myFriends);
            }else {
                alert(response.data.errorCode)
            }
        }else {
            console.log("token is empty")
        }

    }

    return (
        <View>
            <View style={styles.searchStyle}>
                <TextInput
                    placeholder="Search Friends..."
                    onChangeText={handleSearch}
                    value={searchFriend}
                />

                {/*<TouchableOpacity onPress={search}>*/}
                {/*    <Fontisto name="search" size={30} color="black" />*/}
                {/*</TouchableOpacity>*/}
            </View>
            <View>
                {

                    filteredUsers.map((user)=>{
                        return (
                            <Text>{user.username}</Text>
                        )
                    })
                }
            </View>
            {
                foundUser!==null &&
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={followingRequest}>
                        <View style={{height: 100, width: 180, alignItems: 'center' }}>
                            <SimpleLineIcons name="user-follow" size={24} color="black" style={{ height: 30, width: 50, marginBottom: 5 }} />
                            <Text>You can start following</Text>
                        </View>
                    </TouchableOpacity>

                    {/*<View style={{marginLeft:100}}>*/}
                    {/*    <Text style={{height:50, width:50}}> {foundUser.username}</Text>*/}
                    {/*</View>*/}
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










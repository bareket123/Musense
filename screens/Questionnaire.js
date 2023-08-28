import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {ImageBackground, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {RadioButton,TextInput,Button,Checkbox} from "react-native-paper";
import  questionnaireStyle from '../styles/questionnaireStyle'
import axios from "axios";
import {LOCAL_SERVER_URL} from "../redux/actions";

const Questionnaire = ({onSubmit}) => {
    const {token} = useSelector(state => state.reducer);
    const [genre, setGenre] = useState("");
    const [artist1,setArtist1]=useState("");
    const [artist2,setArtist2]=useState("");
    const [favoriteSong,setFavoriteSong]=useState("");


    const handleSubmit = async () => {
        if (token!==""){
            if (genre!==""&&artist1!==""&&artist2!==""&&favoriteSong!==""){
                const response = await axios.create({baseURL: LOCAL_SERVER_URL}).post('/send-user-preferences?token=' + token + '&genre=' + genre + '&artist1=' + artist1 +
                    "&artist2=" + artist2 +'&favoriteSong='+ favoriteSong)
                if (response.data.success){
                    alert("update")
                    onSubmit({
                        res:true
                    });
                }else {
                    alert(response.data.errorCode)
                }
            }else {
                alert("you must fill everything")
            }

        }


    };


    return (

        <ScrollView contentContainerStyle={{flex:0,alignItems:'center'}}>
            <View>
                <ImageBackground source={{uri:'https://cdn.dribbble.com/users/1237300/screenshots/6478927/__-1_1_____.gif'}}>
                    <View style={questionnaireStyle.cardContainer}>
                        <Text style={questionnaireStyle.title} >Favorite music style  </Text>

                        <RadioButton.Group onValueChange={value => setGenre(value)} value={genre}>
                            <RadioButton.Item  labelStyle={questionnaireStyle.radioButtonLabel} style={questionnaireStyle.radioButton} label="POP" value="POP" />
                            <RadioButton.Item   labelStyle={questionnaireStyle.radioButtonLabel} style={questionnaireStyle.radioButton} label="ELECTRONIC" value="ELECTRONIC" />
                            <RadioButton.Item  labelStyle={questionnaireStyle.radioButtonLabel} style={questionnaireStyle.radioButton} label="ROCK" value="ROCK" />
                            <RadioButton.Item  labelStyle={questionnaireStyle.radioButtonLabel} style={questionnaireStyle.radioButton} label="RNB" value="RNB" />
                            <RadioButton.Item   labelStyle={questionnaireStyle.radioButtonLabel} style={questionnaireStyle.radioButton} label="DANCE" value="DANCE" />
                        </RadioButton.Group>
                    </View>

                    <View style={questionnaireStyle.cardContainer}>
                        <Text style={questionnaireStyle.title}>Favorite music artist</Text>
                        <TextInput style={questionnaireStyle.answerInput} placeholder={"first choice"} value={artist1} onChangeText={setArtist1}/>
                        <TextInput style={questionnaireStyle.answerInput} placeholder={"second choice"} value={artist2} onChangeText={setArtist2}/>
                    </View>

                    <View style={questionnaireStyle.cardContainer}>
                        <Text style={questionnaireStyle.title}>a special song you can't go without</Text>
                        <TextInput style={questionnaireStyle.answerInput} placeholder={"name and artist"} value={favoriteSong} onChangeText={setFavoriteSong}/>
                    </View>
                    <TouchableOpacity style={{alignItems:'center'}}>
                        <Text style={questionnaireStyle.title} onPress={handleSubmit}>Submit</Text>
                    </TouchableOpacity>
                </ImageBackground>

            </View>

        </ScrollView>


    );
};

export default Questionnaire;

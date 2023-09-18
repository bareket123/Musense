import {useSelector} from "react-redux";
import React, { useState} from "react";
import { ImageBackground, ScrollView, Text, TouchableOpacity, View} from "react-native";

import {RadioButton,TextInput} from "react-native-paper";
import  questionnaireStyle from '../styles/questionnaireStyle'
import axios from "axios";
import {LOCAL_SERVER_URL} from "../redux/actions";
import {Ionicons} from "@expo/vector-icons";
import playedRecentlyStyle from "../styles/playedRecentlyStyle";

const Questionnaire = ({onSubmit}) => {
    const {token} = useSelector(state => state.reducer);
    const [genre, setGenre] = useState("");
    const [artist1,setArtist1]=useState("");
    const [artist2,setArtist2]=useState("");
    const [favoriteSong,setFavoriteSong]=useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions1, setShowSuggestions1] = useState(true); // Flag to control visibility
    const [showSuggestions2, setShowSuggestions2] = useState(true); // Flag to control visibility


    const topSingers = [
        'Adele', 'Ed Sheeran', 'Beyoncé', 'Taylor Swift', 'Justin Bieber', 'Ariana Grande', 'Rihanna',
        'Drake', 'Katy Perry', 'Lady Gaga', 'Bruno Mars', 'The Weeknd', 'Eminem', 'Coldplay', 'Michael Jackson',
        'Queen', 'Whitney Houston', 'Elton John', 'Kendrick Lamar', 'Madonna', 'Mariah Carey', 'Dua Lipa', 'Billie Eilish',
        'John Legend', 'Nicki Minaj', 'Ella Fitzgerald', 'Bob Marley', 'Prince', 'David Bowie', 'Bob Dylan', 'Frank Sinatra', 'Alicia Keys', 'Celine Dion', 'U2', 'Sam Smith', 'Stevie Wonder',
        'Janis Joplin', 'Johnny Cash', 'George Michael', 'Johnny Hallyday', 'Lana Del Rey', 'Aretha Franklin', 'Pink Floyd', 'John Lennon', 'Shakira', 'Miley Cyrus', 'Ray Charles',
        'Billy Joel', 'Sia', 'Bon Jovi', 'Elvis Presley', 'Sting', 'Enrique Iglesias', 'Barbra Streisand', 'Eric Clapton', 'Metallica', 'Nirvana', 'Tina Turner', 'Ricky Martin', 'Fleetwood Mac', 'Neil Young', 'Jennifer Lopez',
        'The Rolling Stones', 'Oasis', 'Aerosmith', 'George Strait', 'The Police', 'Eagles', 'Maroon 5', 'Justin Timberlake', 'Cardi B', 'Shania Twain', 'The Notorious B.I.G.',
        'Dr. Dre', 'Selena Gomez', 'Olivia Rodrigo', 'Camila Cabello', 'Travis Scott', 'Doja cat', 'Blake Shelton', 'Kanye West', 'Khalid', 'BTS', 'Tupac Shakur', 'Bruce Springsteen', 'Harry Styles', 'Dolly Parton', 'Lorde', 'Red Hot Chili Peppers',
        'Stevie Nicks', 'Johnny Mercer', 'Tony Bennett', 'Ray Stevens', 'Bobby Vinton', 'Dean Martin', 'Diana Ross', 'Glenn Miller', 'Patsy Cline', 'The Supremes',
    ];

    const handleInputChange = (text, setterFunction) => {
        setterFunction(text);
        artist1===''&&
        setShowSuggestions1(true)
         artist2===''&&
        setShowSuggestions2(true)
        // Filter the top singers based on user input
        const matchingArtists = topSingers.filter((artist) =>
            artist.toLowerCase().includes(text.toLowerCase())
        );

        setSuggestions(matchingArtists);
    };
    const handleArtistSelect = (selectedArtist,artist) => {
        if (artist===1){
            setArtist1(selectedArtist);
            setShowSuggestions1(false)
            setShowSuggestions2(false)

        }else if (artist===2) {

            setArtist2(selectedArtist)
            setShowSuggestions2(false)
            setShowSuggestions1(false)
        }
        setSuggestions([]);
    };


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
const checkIfAllFilled = () => {
  let isComplete=true;
  if (favoriteSong===""&&artist1===""&&artist2===""&&genre===""){
      isComplete=false;
  }
  return isComplete;
}

    return (

        <ScrollView contentContainerStyle={{flex:0,alignItems:'center'}}>
            <View>
                <ImageBackground source={{uri:'https://cdn.dribbble.com/users/1237300/screenshots/6478927/__-1_1_____.gif'}}>
                    <Text style={questionnaireStyle.mainTitle}>Let's create your perfect playlist!</Text>
                    <Text style={questionnaireStyle.subtitle}>Please fill out this form with your musical preferences</Text>
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

                        <View style={questionnaireStyle.textInputView} >
                            <TextInput style={questionnaireStyle.answerInput} placeholder={"first choice"} value={artist1} onChangeText={(text) => handleInputChange(text, setArtist1)}/>
                            {
                                artist1.length>0&&
                                <Ionicons
                                    name="close-circle"
                                    size={24}
                                    color="grey"
                                    style={playedRecentlyStyle.clear}
                                    onPress={() => setArtist1('')}
                                />
                            }
                        </View>

                        {(artist1.length > 0 && showSuggestions1)&& (
                            <View style={questionnaireStyle.artistMenu1}>
                                {suggestions.map((suggestion) => (
                                    <TouchableOpacity
                                        key={suggestion}
                                        onPress={() => handleArtistSelect(suggestion, 1)}
                                    >
                                        <Text style={questionnaireStyle.artistText}>{suggestion}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}

                        <View style={questionnaireStyle.textInputView}>
                            <TextInput style={questionnaireStyle.answerInput} placeholder={"second choice"} value={artist2} onChangeText={(text) => handleInputChange(text, setArtist2)}/>
                            {
                                artist2.length>0&&
                                <Ionicons
                                    name="close-circle"
                                    size={24}
                                    color="grey"
                                    style={playedRecentlyStyle.clear}
                                    onPress={() => setArtist2('')}
                                />
                            }
                        </View>

                        {(artist2.length > 0 && showSuggestions2)&& (
                            <View style={questionnaireStyle.artist2menu}>
                                    {suggestions.map((suggestion) => (
                                        <TouchableOpacity
                                            key={suggestion}
                                            onPress={() => handleArtistSelect(suggestion, 2)}>

                                            <Text style={questionnaireStyle.artistText}>{suggestion}</Text>
                                        </TouchableOpacity>
                                    ))}

                            </View>

                        )}
                    </View>

                    <View style={questionnaireStyle.cardContainer}>
                        <Text style={questionnaireStyle.title}>a special song you can't go without</Text>
                        <TextInput style={questionnaireStyle.answerInput} placeholder={"name and artist"} value={favoriteSong} onChangeText={setFavoriteSong}/>
                    </View>
                    <TouchableOpacity style={{alignItems:'center'}}>
                        <Text style={questionnaireStyle.title} onPress={handleSubmit} disabled={!checkIfAllFilled()}>Submit</Text>
                    </TouchableOpacity>
                    {
                        !checkIfAllFilled()&&
                        <Text style={{color:'#8B0000',alignSelf:'center',fontSize:18}}>All fields must be completed. </Text>
                    }
                </ImageBackground>

            </View>

        </ScrollView>



    );
};

export default Questionnaire;

import { Audio } from "expo-av";
import {setPlayedRecently} from "../redux/actions";

let sound = null;
let volume = 0.5; // Initial volume

export const playAudio = async (song, dispatch) => {
    if (sound) {
        await sound.unloadAsync();
    }

    try {
        const { sound: newSound } = await Audio.Sound.createAsync({ uri: song.url });
        sound = newSound;

        // Set the volume when playing the audio
        await sound.setVolumeAsync(volume);

        await sound.playAsync();
        dispatch(setPlayedRecently(song));
    } catch (error) {
        console.error("Error playing audio: ", error);
    }
};

export const pauseAudio = async () => {
    if (sound) {
        await sound.pauseAsync();
    }
};

export const setVolume = async (newVolume) => {
    if (sound) {
        try {
            await sound.setVolumeAsync(newVolume);
            volume = newVolume; // Update the volume variable
        } catch (error) {
            console.error("Error setting volume: ", error);
        }
    }
};

export const getVolume = () => {
    return volume; // Return the current volume
};

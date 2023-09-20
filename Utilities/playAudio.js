import { Audio } from "expo-av";

let sound = null;
let volume = 0.5;
export const reloadSong=async ()=> {
    try {
        if (sound._loaded) {
            await sound.stopAsync();
            await sound.playAsync();
        }
    } catch (error) {
        console.error('Error reloading the song:', error);
    }
}
export const playAudio = async (song,spinValue,setPressedPlaying) => {
    if (sound) {
        await sound.unloadAsync();
    }
    try {
        const { sound: newSound } = await Audio.Sound.createAsync({ uri: song.url });
        sound = newSound;
        await sound.setVolumeAsync(volume);
        sound.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded && !status.isPlaying && status.didJustFinish) {
                spinValue.stopAnimation();
                setPressedPlaying(false);
            }
        });
        await sound.playAsync();
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
            volume = newVolume;
        } catch (error) {
            console.error("Error setting volume: ", error);
        }
    }
};

export const getVolume = () => {
    return volume;
};
export const waitForSongCompletion = () => {
    return new Promise((resolve) => {
        const listener = (status) => {
            if (status.isLoaded && !status.isPlaying && status.didJustFinish) {
                sound.setOnPlaybackStatusUpdate(null); // Remove the listener
                resolve();
            }
        };

        sound.setOnPlaybackStatusUpdate(listener);
    });
};


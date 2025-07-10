const SoundEngine = () =>{ 

    const loadSoundFx = (src) =>{
        try {
            let soundFx = new Audio(src);
            return soundFx
        } catch (error) {
            console.error(`Error loading or playing soundFx from ${src}. The game is still playable.`);
            throw error;
        }
    }

    const playSoundFx = (soundFx) =>{
        try {
            if(soundFx){
            soundFx.play()
            }
        } catch (error) {
            console.error(`Error playing ${soundFx}. The game is still playable.`);
            throw error;
        }
    }

    return{loadSoundFx, playSoundFx}
}

export default SoundEngine;

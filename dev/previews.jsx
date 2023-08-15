import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import MyPlaylist from "../screens/MyPlaylist";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/MyPlaylist">
                <MyPlaylist/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews
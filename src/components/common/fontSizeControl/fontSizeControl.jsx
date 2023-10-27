import { useContext } from 'react'
import { FontSizeContext, ImagesContext } from '../../../App'



export const FontSizeControl = (props) => {
    const fontSizeContext = useContext(FontSizeContext)
    const imagesContext = useContext(ImagesContext)
    return <div {...props}>
        <img src={imagesContext.fontSizeIncreaseSrc} onClick={fontSizeContext.increaseFontSize}/>
        <img src={imagesContext.fontSizeDecreaseSrc} onClick={fontSizeContext.decreaseFontSize}/>
    </div>
}
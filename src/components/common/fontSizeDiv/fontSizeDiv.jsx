import { useContext } from "react"
import { FontSizeContext } from "../../../App"



export const FontSizeDiv = ({addSize = 0, ...props}) => {
    const fontSizeContext = useContext(FontSizeContext);
    return <div style={{fontSize:`${fontSizeContext.fontSize + addSize}px`}} {...props}>
        {props.children}
    </div>
}
import { useContext } from "react"
import { ConfigurationConstants } from "../../.."
import { DisabledIcon } from "../disabledIcon/disabledIcon"
import { FontSizeContext } from "../../../App"



export const Input = ({field, ref, ...props}) => {
    const fontSizeContext = useContext(FontSizeContext)
    return <> <input style={{fontSize:fontSizeContext.fontSize}} {...field} ref={ref} value={field?.value || ""} 
     readOnly={ConfigurationConstants.IsReadOnly} {...props}
     className={`base-edit-input ts-box-sizing `} />
     <DisabledIcon />
     </>
}
import { ConfigurationConstants } from "../../.."
import { FontSizeContext } from "../../../App";
import { DisabledIcon } from "../disabledIcon/disabledIcon"
import { useState, useRef, useEffect, useContext} from "react";


export const TextArea = ({field, ...props}) => {
    const fontSizeContext = useContext(FontSizeContext)
    const ref = useRef(null);
    const onInput = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = (e.target.scrollHeight) + 'px';
    }

    useEffect(() => {
        if(ref){
            ref.current.style.height = 'auto';
            ref.current.style.height = (ref.current.scrollHeight) + 'px';
        }
    }, [ref])
    return <> <textarea {...field} ref={ref} value={field?.value || ""} {...props}
     readOnly={ConfigurationConstants.IsReadOnly}
      style={{resize:"none", overflow:"hidden", height:"26px", fontSize:fontSizeContext.fontSize}} onInput={onInput}
     className={`memo-edit-height base-edit-input memo-edit-area ts-box-sizing survey-textarea`} />
     <DisabledIcon />
     </>
}
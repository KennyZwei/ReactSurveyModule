import { ConfigurationConstants } from "../../.."
import { DisabledIcon } from "../disabledIcon/disabledIcon"



export const Input = ({field, ref, ...props}) => {
    return <> <input {...field} ref={ref} value={field.value || ""} {...props}
     readOnly={ConfigurationConstants.IsReadOnly}
     className={`base-edit-input ts-box-sizing `}  />
     <DisabledIcon />
     </>
}
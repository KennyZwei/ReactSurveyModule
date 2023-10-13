import { ConfigurationConstants } from "../../.."


export const DisabledIcon = () => {
    return <div style={{display:ConfigurationConstants.IsReadOnly ? "block" : "none"}}
     className="base-edit-disabled-el-icon">

    </div>
}
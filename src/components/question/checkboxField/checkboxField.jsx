import { Field } from "formik"
import { ConfigurationConstants } from "../../..";
import { useContext } from "react";
import { FontSizeContext } from "../../../App";
export const CheckBoxField = ({data, id, value}) => {
    const {fontSize} = useContext(FontSizeContext)
    const isReadOnly = ConfigurationConstants.IsReadOnly
    
    return (
        <div role="group" className="survey-checkbox" aria-labelledby="checkbox-group">
        {
            data.map((dataItem, index) => {
                let isChecked = false;
                if(value?.arrayValue){
                    isChecked = value.arrayValue.indexOf(dataItem.id) !== -1;
                }
            return <div className="survey-checkbox-item" key={dataItem.id}>
                <span className={`t-checkboxedit-wrap ${isChecked ? "t-checkboxedit-checked" : ""} `}>
                    <Field type="checkbox" className="t-checkboxedit" name={`${id}.arrayValue`}
                      value={`${dataItem.id}`} disabled={isReadOnly} />
                </span>
                <label key={index} className="t-label" style={{fontSize:fontSize}}>
                    {dataItem.text}
                </label>
            </div>
            })
        }
        </div>
    )
}
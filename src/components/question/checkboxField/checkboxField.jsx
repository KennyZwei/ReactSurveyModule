import { Field } from "formik"
import { ConfigurationConstants } from "../../..";
export const CheckBoxField = ({data, id, value}) => {
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
                <label key={index} className="t-label">
                    {dataItem.text}
                </label>
            </div>
            })
        }
        </div>
    )
}
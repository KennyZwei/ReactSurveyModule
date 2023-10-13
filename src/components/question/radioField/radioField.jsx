import { Field } from "formik"
import { ConfigurationConstants } from "../../..";

export const RadioBoxField = ({data, id, value}) => {
    const isReadOnly = ConfigurationConstants.IsReadOnly
    return (
        <div  className="survey-radio" key={id} >
        {
            data.map((dataItem, index) => {
                let isChecked = false;
                if(value){
                    isChecked = value.value === dataItem.id;
                }
            return <div className="survey-radio-item" key={dataItem.id}>
                <span className={`t-radio-wrap ${isChecked ? "t-radio-checked" : ""} `}>
                    <Field type="radio" disabled={isReadOnly}
                         className="t-radio" name={`${id}.value`} value={`${dataItem.id}`} />
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
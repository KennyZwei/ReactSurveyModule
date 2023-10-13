import { Field } from "formik"
import { DatePicker } from "./datePicker/datePicker";
import { useState } from "react";
import { TimePicker } from "./timePicker/timePicker";
import { Input } from "../../common/input/input";
import { ConfigurationConstants } from "../../..";

export const dateToTimeString = (date) => {
    return `${date.getHours()}:${date.getMinutes()}`;
}
const dateToString = (date) => {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}
const isTimeNull = (date) => {
    return date.getHours() === 0 && date.getMinutes() === 0
}
const setTime = (toDate, fromDate) => {
    const hours = fromDate.getHours();
    const minutes = fromDate.getMinutes();
    toDate.setHours(hours);
    toDate.setMinutes(minutes);
}

export const DateField = ({id, isOnlyDate}) => {
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [styleTop, setStyleTop] = useState(0);
    
    const isReadOnly = ConfigurationConstants.IsReadOnly

    const setVisible = (value) => {
        if(!isReadOnly || !value){
            setDatePickerVisible(value);
        }
    }

    const setDateValue = (setFieldValue, values) => (date) => {
        if(isOnlyDate){
            date.setHours(0)
            date.setMinutes(0)
            setFieldValue(`${id}.value`, date);
        }else{
            const valuesDate = values[id]?.value;
            if(valuesDate && !isTimeNull(valuesDate)){
                setTime(date, valuesDate);
            }else{
                setTime(date, new Date());
            }
            setFieldValue(`${id}.value`, date);
        }
    }

    const beforeSetVisible = (value) => {
        const parent = document.getElementById("survey-content");
        const divTop = document.getElementById(id).offsetTop - parent.scrollTop;
        if(divTop + 280 > parent.clientHeight){
            setStyleTop(divTop - 230);
        }else{
            setStyleTop(divTop);
        }
        setVisible(value);
    }

    const setTimeValue = (setFieldValue, values) => (time) => {
        const newDate = values[id]?.value || new Date();
        const times = time.split(":");
        if(times.length === 2){
            newDate.setHours(Number(times[0]));
            newDate.setMinutes(Number(times[1]));
        }else if(times.length === 1){
            newDate.setHours(Number(times[0]));
        }
        setFieldValue(`${id}.value`, newDate);
    }

    return <Field name={`${id}.value`} >
        {({
            field, 
            form: { values, setFieldValue },
            }) => (<div className="survey-date">
                <DatePicker isVisible={datePickerVisible} setVisible={beforeSetVisible}
                 setValue={setDateValue(setFieldValue, values)} styleTop={styleTop} />
                <div id={id}
                     className="survey-date-datecontrol base-edit ts-box-sizing base-edit-with-right-icon date-edit datetime-datecontrol">
                    <Input field={field} onClick={() => beforeSetVisible(true)}
                         value={field.value && dateToString(field.value)}  />
                    <div className='base-edit-right-icon-wrapper'
                        style={{display:isReadOnly && "none"}}
                         onClick={() => beforeSetVisible(true)}>

                        <div className="base-edit-right-icon ts-date-edit-right-icon">
                        </div>
                    </div>
                    <span className="base-edit-validation" ></span>
                </div>
                {isOnlyDate ? "" : <TimePicker styleTop={styleTop} setTimeValue={setTimeValue}  id={id}/>}
                </div>)}
        
    </Field>
}
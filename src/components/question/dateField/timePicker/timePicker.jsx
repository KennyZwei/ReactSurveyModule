import { Field } from "formik"
import { TimePickerTimes } from "./timePickerTimes"
import { useEffect, useRef, useState } from "react";
import { dateToTimeString } from "../dateField";
import { Input } from "../../../common/input/input";
import { ConfigurationConstants } from "../../../..";

export const TimePicker = ({setTimeValue, id, styleTop}) => {
    const [timePickerVisible, setTimePickerVisible] = useState(false);
    const containerRef = useRef(null);
    const isReadOnly = ConfigurationConstants.IsReadOnly
    const beforeSetVisible = (newVisible) => {
        if(!isReadOnly){
          setTimePickerVisible(newVisible);
        }
    }
    useEffect(() => {
        function handleClickOutside(e) {
          if (containerRef.current && !containerRef.current.contains(e.target)) {
            setTimePickerVisible(false)
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [containerRef]);

    const onChange = (setFieldValue, values, e)=>{
        setTimeValue(setFieldValue, values)(e.target.value);
    }

    return <Field name={`${id}.value`} >
    {({
        field,
        form: {setFieldValue, values }
        }) => (<>
        <div ref={containerRef} className="listview listview-scroll" style={{opacity: timePickerVisible ? "1" : "0",
                 display:timePickerVisible ? "" : "none", top:`${styleTop}px`}}>
                    <TimePickerTimes setVisible={beforeSetVisible}  setTime={setTimeValue(setFieldValue, values)} />
                </div>
        <div 
         className="survey-date-timecontrol base-edit ts-box-sizing base-edit-with-right-icon time-edit datetime-timecontrol">
                
                <Input field={field} onChange={(e) => onChange(setFieldValue, values, e)}
                  value={field.value && dateToTimeString(field.value)} onClick={() => beforeSetVisible(true)}/>
                <div style={{display:isReadOnly && "none"}}
                    className='base-edit-right-icon-wrapper'
                    onClick={() => beforeSetVisible(true)}>

                    <div className="base-edit-right-icon combobox-edit-right-icon"></div>
                </div>
                <span className="base-edit-validation"></span>
                
            </div>
            
            </>)}

</Field>
   
}
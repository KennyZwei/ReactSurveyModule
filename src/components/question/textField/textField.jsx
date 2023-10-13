
import { Field } from "formik"
import { DisabledIcon } from "../../common/disabledIcon/disabledIcon";
import { Input } from "../../common/input/input";

export const TextField = ({id, maxLength}) => {
    
    return <div className={`simple-question base-edit ts-box-sizing number-edit-align`}>
        <Field name={`${id}.value`} >
            {({field, form}) => (<>
                <Input field={field} onChange={e => {
                    e.preventDefault();
                    const { value } = e.target;
                    if(maxLength){
                        if (value.length <= maxLength) {
                            form.setFieldValue(`${id}.value`, value);
                        }
                    }else{
                        form.setFieldValue(`${id}.value`, value);
                    }
                    
                }} />
            </>)}
        </Field>
    </div>
}

import { Field } from "formik"
import { TextArea } from "../../common/textarea/textarea";

export const TextField = ({id, maxLength}) => {
    
    return <div className={`base-edit ts-box-sizing number-edit-align `}>
        <Field name={`${id}.value`} >
            {({field, form}) => (<>
                <TextArea field={field} onChange={e => {
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
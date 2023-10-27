import { Field } from "formik"
import { DisabledIcon } from "../../common/disabledIcon/disabledIcon";
import { Input } from "../../common/input/input";

export const IntegerField = ({id, changeOverallRating}) => {
    return <div className={`simple-question base-edit ts-box-sizing number-edit-align`}>
        <Field name={`${id}.value`}>
            {({field, form, values}) => (<>
                <Input field={field} pattern="[0-9]*"  onChange={e => {
                    e.preventDefault();
                    const { value } = e.target;
                    if (e.target.validity.valid) {
                        form.setFieldValue(`${id}.value`, value);
                        changeOverallRating(form.values, form.setFieldValue, {
                            id:id,
                            value:value
                        })
                    }
                }}/>
            </>)}
        </Field>
    </div>
}
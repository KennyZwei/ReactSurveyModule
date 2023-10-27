import { Field } from "formik"
import { DisabledIcon } from "../../common/disabledIcon/disabledIcon";
import { Input } from "../../common/input/input";

export const FloatField = ({id, changeOverallRating}) => {
    return <div className={`simple-question base-edit ts-box-sizing number-edit-align`}>
        <Field name={`${id}.value`} >
            {({field, form}) => (<>
                <Input field={field} onChange={e => {
                    e.preventDefault();
                    const { value } = e.target;
                    if (!isNaN(e.target.value.replace(",", "."))) {
                        form.setFieldValue(`${id}.value`, value);
                        changeOverallRating(form.values, form.setFieldValue, {
                            id:id,
                            value:value
                        })
                    }
                }} type="text"
                />
            </>)}
        </Field>
    </div>
}
import { Field } from "formik"
import { Input } from "../../common/input/input";
import { useState, useRef, useEffect, useContext} from "react";
import { ConfigurationConstants } from "../../..";
import { FontSizeContext } from "../../../App";


export const RadioBoxField = ({data, id, value, changeOverallRating}) => {
    const fontSizeContext = useContext(FontSizeContext)
    const [visible, setVisible] = useState(false);
    const containerRef = useRef(null);
    const isReadOnly = ConfigurationConstants.IsReadOnly

    const beforeSetVisible = (newVisible) => {
        if(!isReadOnly){
            setVisible(newVisible);
        }
    }

    useEffect(() => {
        function handleClickOutside(e) {
          if (containerRef.current && !containerRef.current.contains(e.target)) {
            setVisible(false)
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [containerRef]);
    return (
        <div className="survey-radio base-edit ts-box-sizing number-edit-align" key={id} ref={containerRef}>
            <Input onClick={() => {beforeSetVisible(true)}}
                         value={data.find(dataItem => dataItem.id === value?.value)?.text || ""}/>
            <Field name={`${id}.value`} >
            {({
                    form: {setFieldValue, values},
                    }) => (<>
                    <div className="listview listview-scroll" style={{opacity: visible ? "1" : "0",
                 display:visible ? "" : "none"}}>
                        <ul>
                        {
                            data.map((dataItem) => {
                                return (
                                    <li style={{fontSize:fontSizeContext.fontSize}} key={dataItem.id} onClick={() => {
                                        setFieldValue(`${id}.value`, dataItem.id);
                                        setVisible(false);
                                        changeOverallRating(values, setFieldValue, {
                                            id:id,
                                            value:dataItem.weight ?? 0
                                        })
                                    }}>
                                        {dataItem.text}
                                    </li>
                            )})
                        }
                        </ul>
            </div></>)}
            </Field>
        </div>
    )
}
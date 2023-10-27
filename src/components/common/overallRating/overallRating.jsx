import { ConfigurationConstants } from "../../..";
import { Input } from "../input/input";
import {useEffect} from "react";
function getAverage(questions, values){
    let sum = 0;
    let length = 0;
    Object.keys(questions).forEach(key => {
        if((questions[key].Type === ConfigurationConstants.QuestionType.Decimal 
          || questions[key].Type === ConfigurationConstants.QuestionType.Integer) && values[key]?.value >= 0){
              sum += values[key].value;
              length++;
          }
    })
    if(length === 0){
      return 0;
    }
    return sum / length;
}

export const OverallRating = ({setFieldValue, field, values, questions}) => {

    useEffect(() => {
        setFieldValue("overallRating", getAverage(questions, values))
    }, [values])
    return <Input field={field} readOnly={true} />
}
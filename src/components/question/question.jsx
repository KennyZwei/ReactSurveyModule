import { ConfigurationConstants } from "../..";
import { CheckBoxField } from "./checkboxField/checkboxField"
import { DateField } from "./dateField/dateField";
import { RadioBoxField } from "./radioField/radioField"
import { IntegerField } from "./integerField/integerField"
import { FloatField } from "./floatField/floatField";
import { TextField } from "./textField/textField";
import { useContext } from "react";
import { FontSizeContext } from "../../App";
import { FontSizeDiv } from "../common/fontSizeDiv/fontSizeDiv";


export const Question = ({questionData, isVisible, id, value, changeOverallRating}) => {
    const types = ConfigurationConstants.QuestionType;
    let question = <></>;
    if(!questionData.withoutAnswer){
        if(questionData.type === types.MultipleChoice){
            question = <CheckBoxField data={questionData.choices} id={id} value={value} />
        }else if(questionData.type === types.OneChoice){
            question = <RadioBoxField data={questionData.choices} id={id} value={value} changeOverallRating={changeOverallRating} />
        }else if(questionData.type === types.DateTime){
            question = <DateField data={questionData.choices} id={id} isOnlyDate={false} />
        }else if(questionData.type === types.Date){
            question = <DateField data={questionData.choices} id={id} isOnlyDate={true} />
        }else if(questionData.type === types.Integer){
            question = <IntegerField id={id} changeOverallRating={changeOverallRating}/>
        }else if(questionData.type === types.Decimal){
            question = <FloatField id={id} changeOverallRating={changeOverallRating}/>
        }else if(questionData.type === types.LimitedText){
            question = <TextField id={id} maxLength={250}/>
        }else if(questionData.type === types.UnlimitedText){
            question = <TextField id={id} />
        }
    }
    
    return <div key={id} className="survey-question" style={{display:`${isVisible ? "" : "none"}`}}>
        <FontSizeDiv addSize={questionData.withoutAnswer ? 2 : 0}
            className={`survey-question-label t-label ${questionData.withoutAnswer ? "survey-question-without-answer" : ""}`}>
            <pre>{questionData.title}</pre>
        </FontSizeDiv>
        <div className="survey-question-content">
            {question}
        </div>
        <div className="sirvey-question-not">
            {questionData.note}
        </div>
    </div>
}
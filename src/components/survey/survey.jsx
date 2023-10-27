import { Form, Formik, Field } from "formik";
import { Question } from "../question/question"
import {useContext, useEffect, useState } from "react";
import { Input } from "../common/input/input";
import { TextArea } from "../common/textarea/textarea";
import { ConfigurationConstants } from "../..";
import { FontSizeContext } from "../../App";
import { FontSizeDiv } from "../common/fontSizeDiv/fontSizeDiv";
import { FontSizeControl } from "../common/fontSizeControl/fontSizeControl";
function clearObject(object){
  Object.keys(object).forEach((k) => !object[k] && delete object[k]);
}
function getSurveyValue(values){
  var surveyValue = {
    comment:values.comment,
    overallRating:values.overallRating
  }
  delete values.comment;
  delete values.overallRating;
  return surveyValue;
}

function getAverage(questions, values, newValue){
  let sum = 0;
  let length = 0;
  Object.keys(questions).forEach(key => {
      if((questions[key].type === ConfigurationConstants.QuestionType.Decimal 
        || questions[key].type === ConfigurationConstants.QuestionType.Integer
        || questions[key].type === ConfigurationConstants.QuestionType.OneChoice)){
          if(newValue.id === key){
            if(!!newValue.value){
              sum += Number(newValue.value);
              length++;
            }
          }else if(!!values[key]?.value){
            if(questions[key].type === ConfigurationConstants.QuestionType.OneChoice){
              var value = questions[key].choices.find(choice => choice.id === values[key].value).weight;
              sum += Number(value);
            }else{
              sum += Number(values[key]?.value);
            }
            length++;
          }
        }
  })
  if(length === 0){
    return 0;
  }
  return (sum / length).toFixed(1);
}

export const Survey = ({surveyData, save, send, close, questionsSequence, isCanSaveAndSend, fromEmployee, onlyShow}) => {
    const [isFormValueChanged, setIsFormValueChanged] = useState(false);
    const fontSizeContext = useContext(FontSizeContext)

    const changeOverallRating = (questions) => (values, setFieldValue, newValue) => {
      if(fromEmployee && questions[newValue.id].includeAssessment){
        const raiting = getAverage(questions, values, newValue);
        setFieldValue("overallRating", raiting);
      }
    }
    const onSaveBttuonClick = (values, setSubmitting) => {
      clearObject(values)
      const sendValues = {...values}
      const surveyValue = getSurveyValue(sendValues);
      setSubmitting(true)
      save(sendValues, surveyValue, function(){
        setIsFormValueChanged(false);
        setSubmitting(false)
      });
    }
    const onSendButtonClick = (values, setSubmitting) => {
      clearObject(values)
      const sendValues = {...values}
      const surveyValue = getSurveyValue(sendValues);
      setSubmitting(true)
      send(sendValues, surveyValue, function(){
        setIsFormValueChanged(false);
        setSubmitting(false)
      });
    }

    const onCloseButtonClick = (values, setSubmitting) => {
      clearObject(values)
      setSubmitting(true)
      close(values,isFormValueChanged, function(){
        setSubmitting(false)
      });
    }
    return(
        <Formik
       initialValues={{...surveyData.answers, ...surveyData.addInformation}}
       validate={values => {
         const errors = {};
         setIsFormValueChanged(true);
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         
       }}
     >
       {({ isSubmitting, values, setSubmitting, setFieldValue}) => (
         <Form className="survey-form">
          <div className="survey-header">
            <FontSizeDiv className="survey-label" addSize={5}>
              {surveyData.name}
            </FontSizeDiv>
            <FontSizeControl className="survey-font-size-control" />
          </div>
          
            <div className="survey-content" id="survey-content">
            {
                  questionsSequence.map(sequence => {
                      const data = surveyData.questions[sequence.questionId];
                      let isVisible = true;
                      sequence.visibleRules?.some(rule => {
                          const value = values[rule.questionId];
                          if(value === undefined){
                              isVisible = false;
                          }else if(value.value !== rule.value){
                              isVisible = false;
                          }else{
                            isVisible = true;
                            return true;
                          }
                      })
                      if(values[sequence.questionId] !== '' && !isVisible){
                        setFieldValue(sequence.questionId, '');
                      }

                      return <Question key={sequence.questionId} changeOverallRating={changeOverallRating(surveyData.questions)}
                      value={values[sequence.questionId]}  id={sequence.questionId} questionData={data} isVisible={isVisible} />
                  })
              }
            </div>
            {fromEmployee &&
              <div className="survey-employee">
                  <div className="overall-rating">
                    <FontSizeDiv addSize={2} className={`survey-question-label t-label`}>
                        <pre>Общая оценка</pre>
                    </FontSizeDiv>
                    <div className=" simple-question base-edit ts-box-sizing number-edit-align">
                      <Field name="overallRating" >
                        {({field}) => {
                          return <Input field={field} readOnly={true} />
                          }
                        }
                      </Field>
                    </div>
                  </div>
                  <div className="comment">
                    <FontSizeDiv className={`survey-question-label t-label`}>
                        <pre>Комментарий</pre>
                    </FontSizeDiv>
                    <div className=" simple-question base-edit ts-box-sizing number-edit-align">
                      <Field name="comment" >
                        {({field}) => (<>
                            <TextArea field={field} />
                        </>)}
                      </Field>
                    </div>
                  </div>
              </div>
            }
            
            
            { !onlyShow &&
              <div className="survey-buttons">
              <button onClick={() => onSaveBttuonClick(values, setSubmitting)}
               disabled={isSubmitting && isFormValueChanged && isCanSaveAndSend}
               className="t-btn-wrapper t-btn-text t-btn-style-blue actions-button-margin-right">
                Сохранить
              </button>
              <button onClick={() => onSendButtonClick(values, setSubmitting)}
               disabled={isSubmitting && isCanSaveAndSend}
               className="t-btn-wrapper t-btn-text t-btn-style-green actions-button-margin-right">
                Отправить
              </button>
              <button onClick={() => onCloseButtonClick(values, setSubmitting)}
              disabled={isSubmitting} className="t-btn-wrapper t-btn-text t-btn-style-blue actions-button-margin-right">
                Закрыть
              </button>
            </div>
            }
           
         </Form>
       )}
     </Formik>
  )
}
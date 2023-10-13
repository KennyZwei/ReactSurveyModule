import { Form, Formik } from "formik";
import { Question } from "../question/question"
import {useState } from "react";
function clearObject(object){
  Object.keys(object).forEach((k) => !object[k] && delete object[k]);
}
export const Survey = ({surveyData, save, send, close, questionsSequence, isCanSaveAndSend}) => {
    const [isFormValueChanged, setIsFormValueChanged] = useState(false);
    const onSaveBttuonClick = (values, setSubmitting) => {
      clearObject(values)
      setSubmitting(true)
      save(values, function(){
        setIsFormValueChanged(false);
        setSubmitting(false)
      });
    }
    const onSendButtonClick = (values, setSubmitting) => {
      clearObject(values)
      setSubmitting(true)
      send(values, function(){
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
       initialValues={surveyData.answers}
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
          <div className="survey-label">
            {surveyData.name}
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

                      return <Question key={sequence.questionId}
                      value={values[sequence.questionId]}  id={sequence.questionId} questionData={data} isVisible={isVisible} />
                  })
              }
            </div>
            
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
           
         </Form>
       )}
     </Formik>
  )
}
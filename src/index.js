import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


export const ConfigurationConstants = {
  IsReadOnly:false,
  CultureSettings:{
    monthNames:[],
    shortDayNames:[]
  },
  QuestionType:{
    Date:"029acf30-28b8-45e8-b272-9caf0674309b",
    Integer:'6b033446-1717-4867-93d0-57ff1fe44bc3',
    Decimal:'93fb1c82-c5f6-4afc-a18f-8cc55e3d7c64',
    DateTime:'97ad174a-8890-4bce-9dea-ac8c9e3d108b',
    LimitedText:'97ef4aae-a68f-49a6-a129-73a2b34e83ac',
    MultipleChoice:'aa5c10a6-c913-49a0-a5cc-aa2953295656',
    UnlimitedText:'ee1535ba-1279-4dd2-b9a7-f97bca2565ad',
    OneChoice:'5b667163-de81-4167-8e51-4428aeab37da'
  }
}

function guidIsEmpty(guid){
  return guid === "00000000-0000-0000-0000-000000000000";
}

function questionsSequenceToArray(questionsSequence){
  const array = [];
  questionsSequence.forEach(sequence => {
    array.push({...sequence, nextQuestions:[]})
    if(sequence.nextQuestions.length > 0){
      array.push(...questionsSequenceToArray(sequence.nextQuestions))
    }
  })
  return array;
}

function getSortedQuestions(questions){
  let sortable = [];
  for (var questionId in questions) {
      sortable.push({
        questionId:questionId,
        ...questions[questionId]
      });
  }

  sortable.sort(function(a, b) {
      return Number(a.number) - Number(b.number);
  });

  return sortable;
}

function fillSequenceWithOneChoice(questionInSequence, questionsSequence, questions, questionId){
  let item = questions[questionId];
  let questionInSequenceItem = questionInSequence[questionId];
  if(!questionInSequenceItem){
      let sequenceItem = {questionId:questionId, nextQuestions:[]};
      item.choices.forEach(choice => {
          let nextQuestionId = choice.nextQuestion;
          if(!guidIsEmpty(nextQuestionId)){
            if(questionInSequence[nextQuestionId]){
              const nextQuestionIndex = sequenceItem.nextQuestions.findIndex(question => question.questionId === nextQuestionId);
              if(nextQuestionIndex !== -1){
                sequenceItem.nextQuestions[nextQuestionIndex].visibleRules.push({
                  questionId:sequenceItem.questionId,
                  value:choice.id
                })
              }else{
                let questionsSequenceIndex = questionsSequence.findIndex(sequence => sequence.questionId === nextQuestionId);
                let nextQuestion = questionsSequence.splice(questionsSequenceIndex, 1)[0];
                nextQuestion.visibleRules = [{
                  questionId:sequenceItem.questionId,
                  value:choice.id
               }]
                sequenceItem.nextQuestions.push(nextQuestion);
              }
              
            }else{
              if(questions[nextQuestionId].type === ConfigurationConstants.QuestionType.OneChoice){
                let newSequenceItem = fillSequenceWithOneChoice(questionInSequence, questionsSequence, questions, nextQuestionId)
                newSequenceItem.visibleRules = [{
                  questionId:sequenceItem.questionId,
                  value:choice.id
                }]
                sequenceItem.nextQuestions.push(newSequenceItem);
              }else{
                let newSequenceItem = {
                  questionId:nextQuestionId,
                  nextQuestions:[],
                  visibleRules:[{
                   questionId:sequenceItem.questionId,
                   value:choice.id
                }]
                }
                sequenceItem.nextQuestions.push(newSequenceItem);
                
              }
            }
          }
          questionInSequence[nextQuestionId] = true;
      })
      questionInSequence[sequenceItem.questionId] = true;
      return sequenceItem;
      questionsSequence.push(sequenceItem);
  } 
}

class SurveyComponent extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('div');
    this.appendChild(mountPoint);
    ConfigurationConstants.CultureSettings.monthNames = this.monthNames;
    ConfigurationConstants.CultureSettings.shortDayNames = this.shortDayNames;
    ConfigurationConstants.IsReadOnly = this.isReadOnly;
    const questionInSequence = {};
    let questionsSequence = [];
    const questionTypes = ConfigurationConstants.QuestionType;
    const questions = this.surveyData.questions;
    const sortedQuestions = getSortedQuestions(questions);
    sortedQuestions.forEach(item => {
      if(item.type === questionTypes.Date || item.type === questionTypes.DateTime){
        const answer = this.surveyData.answers[item.questionId]
        if(answer){
          answer.value = new Date(answer.value.replaceAll(".", '/'));
        }
      }
    })
    sortedQuestions.forEach(item => {
      
      if(item.type === questionTypes.OneChoice){
        var sequenceItem = fillSequenceWithOneChoice(questionInSequence, questionsSequence, questions, item.questionId)
        if(!!sequenceItem){
          questionsSequence.push(sequenceItem)
        }
        
      }else if(!questionInSequence[item.questionId]){
        questionsSequence.push({questionId:item.questionId, nextQuestions:[]});
        questionInSequence[item.questionId] = true;
      }
    })
    debugger
    questionsSequence = questionsSequenceToArray(questionsSequence);
    const root = ReactDOM.createRoot(mountPoint);

    root.render(<App surveyData={this.surveyData} isCanSaveAndSend={this.isCanSaveAndSend} close={this.close}
      questionsSequence={questionsSequence} initialValues={this.answers} send={this.send} save={this.save} />);
  }
}
customElements.define('survey-component', SurveyComponent);
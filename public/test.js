
const root = document.getElementById("root");
const surveyComponent = document.createElement("survey-component");
surveyComponent.initFontSize = 14;
surveyComponent.images = {
    fontSizeDecreaseSrc:"test",
    fontSizeIncreaseSrc:"test"
}
surveyComponent.shortDayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
surveyComponent.monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
surveyComponent.surveyData = {
    name: "Satisfaction survey",
    
    id: 1,
    answers:{},
      "questions": {
          "8ecf6cef-cf2f-4ebd-aeb1-1f9ce6b06bb7": {
              "title": "1",
              "choices": [
                  {
                      "text": "2",
                      "id": "71da12a4-f519-4c39-b768-7a8959796dff",
                      "nextQuestion": "00000000-0000-0000-0000-000000000000"
                  }
              ],
              "visibleRules": [],
              "type": "aa5c10a6-c913-49a0-a5cc-aa2953295656",
              "note": "",
              "number": 1
          },
          "1aaf596f-cda3-4942-a5a0-92ec3fe9d698": {
              "title": "2",
              "choices": [],
              "visibleRules": [],
              "type": "93fb1c82-c5f6-4afc-a18f-8cc55e3d7c64",
              "note": "",
              "number": 2
          },
          "1abf596f-cda3-4942-a5a0-92ec3fe9d698": {
            "title": "22",
            "choices": [],
            "visibleRules": [],
            "type": "6b033446-1717-4867-93d0-57ff1fe44bc3",
            "note": "",
            "number": 2
        },
          "496beaea-8f2c-440e-8c2f-6ed652b5e0e1": {
              "title": "3",
              "choices": [
                {
                  "text": "После дата и время 3",
                  "id": "f1e5767f-0731-446b-b39c-7ca8f2f3a488",
                  "nextQuestion": "396beaea-8f2c-440e-8c2f-6ed652b5e0e1",
                  "weight":1
              },
              {
                "text": "После дата и время 3",
                "id": "b2a5767f-0731-446b-b39c-7ca8f2f3a488",
                "nextQuestion": "00000000-0000-0000-0000-000000000000",
                "weight":2
            }
              ],
              "visibleRules": [],
              "type": "5b667163-de81-4167-8e51-4428aeab37da",
              "note": "",
              "number": 3
          },
          "396beaea-8f2c-440e-8c2f-6ed652b5e0e1": {
            "title": "3",
            "choices": [
                {
                    "text": "Тест 1",
                    "id": "a1e5767f-0731-446b-b39c-7ca8f2f3a488",
                    "nextQuestion": "219e14c0-3bb0-4fba-b24d-5f791eed7d71"
                },
                {
                  "text": "Тест 2",
                  "id": "b1e5767f-0731-446b-b39c-7ca8f2f3a488",
                  "nextQuestion": "8ecf6cef-cf2f-4ebd-aeb1-1f9ce6b06bb7"
              },
              {
                "text": "Тест 3",
                "id": "a2e5767f-0731-446b-b39c-7ca8f2f3a488",
                "nextQuestion": "219e14c0-3bb0-4fba-b24d-5f791eed7d71"
            },
            ],
            "visibleRules": [],
            "type": "5b667163-de81-4167-8e51-4428aeab37da",
            "note": "",
            "number": 4
        },
          
          "219e14c0-3bb0-4fba-b24d-5f791eed7d71": {
            "title": "После 3 вопрос(вопрос)",
            "choices": [
                {
                    "text": "После 3 вопрос(ответ)",
                    "id": "b2e5767f-0731-446b-b39c-7ca8f2f3a488",
                    "nextQuestion": "00000000-0000-0000-0000-000000000000"
                },
               
            ],
            "visibleRules": [],
            "type": "5b667163-de81-4167-8e51-4428aeab37da",
            "note": "",
            "number": 5
          },
      },
      "answers": {}
  }
  

  root.appendChild(surveyComponent);

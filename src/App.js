import './App.css';
import { Survey } from './components/survey/survey';


function App({surveyData, send, save, questionsSequence, isCanSaveAndSend, close}) {
  return (
    <div className="App">
      <Survey surveyData={surveyData} isCanSaveAndSend={isCanSaveAndSend} close={close}
      save={save} send={send} questionsSequence={questionsSequence} />
    </div>
  );
}

export default App;

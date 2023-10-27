import { createContext, useState } from 'react';
import './App.css';
import { Survey } from './components/survey/survey';
export const FontSizeContext = createContext("font-size-context")
export const ImagesContext = createContext("images-size-context")

export function App({surveyData, send, save, questionsSequence, isCanSaveAndSend, images,
   close, fromEmployee, onlyShow, initFontSize, saveFontSize}) {
  const [fontSize, setFontSize] = useState(initFontSize)

  const increaseFontSize = () => {
    saveFontSize(fontSize + 1)
    setFontSize(prevFontSize => prevFontSize + 1);
  }

  const decreaseFontSize = () => {
    saveFontSize(fontSize - 1)
    setFontSize(prevFontSize => prevFontSize - 1);
  }
  debugger
  return (
    <FontSizeContext.Provider value={{fontSize:fontSize, decreaseFontSize:decreaseFontSize, increaseFontSize:increaseFontSize}}>
      <ImagesContext.Provider value={images}>
        <div className="App">
          <Survey surveyData={surveyData} isCanSaveAndSend={isCanSaveAndSend} close={close} onlyShow={onlyShow}
          save={save} send={send} questionsSequence={questionsSequence} fromEmployee={fromEmployee}/>
        </div>
      </ImagesContext.Provider>
    </FontSizeContext.Provider>
  );
}
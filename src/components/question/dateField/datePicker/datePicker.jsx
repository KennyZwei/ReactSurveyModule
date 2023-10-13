import { useEffect, useRef, useState } from "react"
import { DatePickerDays } from "./datePickerDays";
import { ConfigurationConstants } from "../../../..";

export const DatePicker = ({setValue, isVisible, setVisible, styleTop}) => {
    const now = new Date();
    const [date, setDate] = useState(new Date());
    const containerRef = useRef(null);
    const {monthNames, shortDayNames} = ConfigurationConstants.CultureSettings;

    const toPrevMonth = () => {
        setDate(value => {
            return new Date(value.setMonth(value.getMonth() - 1))
        })
    }

    const toNextMonth = () => {
        setDate(value => {
            return new Date(value.setMonth(value.getMonth() + 1))
        })
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

    return <div ref={containerRef} className="ts-datepicker-container"
     style={{display:isVisible ? " " : "none", top:`${styleTop}px`}}>
        <div className="ts-datepicker-item ts-datepicker-date">
            Сегодня {now.getDate()}.{now.getMonth() + 1}.{now.getFullYear()}
        </div>
        <div className="ts-datepicker-item ts-datepicker-panel ts-datepicker-days-panel">
            <div className="ts-datepicker-item ts-datepicker-arrow ts-datepicker-left-arrow" onClick={toPrevMonth}>
            &nbsp;
            </div>
            <div className="ts-datepicker-item ts-datepicker-display">
                 <span>{monthNames[date.getMonth()]} </span>
                 <span>{date.getFullYear()}</span>
            </div>
            <div className="ts-datepicker-item ts-datepicker-arrow ts-datepicker-right-arrow" onClick={toNextMonth}>
            &nbsp;
            </div>
        </div>
        {
            shortDayNames.map((dayName, index) => {
                if(index !== 0){
                    return <div key={dayName} className="ts-datepicker-day-name ts-datepicker-item">
                        {dayName}
                    </div>
                }
            })
        }
        <div className="ts-datepicker-day-name ts-datepicker-item">
            {shortDayNames[0]}
        </div>
        <DatePickerDays currentDate={date} setValue={setValue} setVisible={setVisible} />
    </div>
}
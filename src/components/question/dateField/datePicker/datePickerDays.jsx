const DAYSINWEEK = 7;
const LINESTODISPLAY = 6;
const daysInMonth = (month, year) => {
    var date = new Date(year, month + 1, 0);
    return date.getDate();
}
const getPrevMonthDayCount = (date) => {
    const prevDate = new Date(date.setDate(1));
    var weekDay = prevDate.getDay();
    if(weekDay === 0){
        return 6;
    }
    return weekDay - 1;
}
export const DatePickerDays = ({currentDate, setValue, setVisible}) => {
    const prevMonthDayCount = getPrevMonthDayCount(currentDate);
    const currentMonthDayCount = daysInMonth(currentDate.getMonth(), currentDate.getFullYear());
    const nextMonthDayCount = DAYSINWEEK * LINESTODISPLAY - prevMonthDayCount - currentMonthDayCount
    
    const onChange =(value) => () => {
        setValue(value);
        setVisible(false)
    }

    const prevMonthDay = (date) => {
        const prevDate = new Date(date.toString());
        
        prevDate.setMonth(prevDate.getMonth() - 1)
        const month = prevDate.getMonth();
        const year = prevDate.getFullYear();
        const days = [];
        const daysInPrevMonth = daysInMonth(month, year);
        for(let i = 1; i <= prevMonthDayCount; i++){
            const day = daysInPrevMonth - prevMonthDayCount + i
            days.push(
            <div key={`${month} ${i}`} onClick={onChange(new Date(year, month, day))}
             className="ts-datepicker-day ts-datepicker-item ts-datepicker-not-current">
                {day}
            </div>)
        }
        return days;
    }

    const currentMonthDay = (date) => {
        const days = [];
        const month = date.getMonth();
        const year = date.getFullYear();
        for(let i = 1; i <= currentMonthDayCount; i++){
            days.push( 
            <div key={`${month} ${i}`} onClick={onChange(new Date(year, month, i))}
            className="ts-datepicker-day ts-datepicker-item">
                {i}
            </div>)
        }
        return days;
    }

    const nextMonthDay = (date) => {
        const nextDate = new Date(date.toString());
        nextDate.setMonth(nextDate.getMonth() + 1)
        const month = nextDate.getMonth();
        const year = nextDate.getFullYear();
        const days = [];
        for(let i = 1; i <= nextMonthDayCount; i++){
            days.push(
            <div key={`${month} ${i}`} onClick={onChange(new Date(year, month, i))}
            className="ts-datepicker-day ts-datepicker-item ts-datepicker-not-current">
                {i}
            </div>)
        }
        return days;
    }
    return <>
        {
           prevMonthDay(currentDate)
        }
        {
           currentMonthDay(currentDate)
        }
        {
            nextMonthDay(currentDate)
        }
    </>
} 
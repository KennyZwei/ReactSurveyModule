import { useState } from "react"

export const TimePickerTimes = ({setTime, setVisible}) => {
    const onClick = (value) => () => {
        setTime(value);
        setVisible(false);
    }
    const getTimes = () => {
        const times = []
        for(let hour = 0; hour < 24; hour++){
            for(let minute = 0; minute < 60; minute += 15){
                const value = `${hour}:${minute === 0 ? "00" : minute}`
                times.push(<li key={value} onClick={onClick(value)}>{value}</li>)
            }
        }
        return times;
    }
    const [times, ] = useState(getTimes())
    

    return <ul>
        {
            times
        }
    </ul>
}
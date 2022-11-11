import React from 'react'
import Table from '../components/Table';


export default function Admin(props) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const dates = [];
    let dateOnMonday = new Date();
    let todayIndex = dateOnMonday.getDay();
    let delayIndex;

    switch (todayIndex) {
        case 0: //Sun
            delayIndex = -7;
            break;
        case 1: //Mon
            delayIndex = -1;
            break;
        case 2: //Tue
            delayIndex = - 2;
            break;
        case 3: //Wed
            delayIndex = - 3;
            break;
        case 4: //Thu
            delayIndex = - 4;
            break;
        case 5: //Fri
            delayIndex = - 5;
            break;
        case 6: //Sat
            delayIndex = - 6;
            break;
        default:
            delayIndex = null;
    }

    dateOnMonday.setDate(dateOnMonday.getDate() + delayIndex);

    while (dates.length < 7) {
        dates.push(new Date(dateOnMonday.setDate(dateOnMonday.getDate() + 1)).toLocaleDateString());
    }

    days.forEach((day, index) => console.log(day, dates[index]))
    return (
        <>
            {/*props.isLoading && <h1 style={{ color: 'white' }}>Loading...</h1>*/}
            {!props.isLoading && <div className='admin container'>
                {days.map((day, dayIndex) => {
                    if (dayIndex === 5 || dayIndex == 6) {
                        return false
                    };
                    return (
                        <table>
                            <Table
                                key={dayIndex}
                                day={day}
                                dateOnDay={dates[dayIndex]}
                            />
                            {props.collections
                                .sort(function (a, b) {
                                    if (a.material.toLowerCase() < b.material.toLowerCase()) {
                                        return -1;
                                    }
                                    if (a.material.toLowerCase() > b.material.toLowerCase()) {
                                        return 1;
                                    }
                                    return 0;
                                })
                                .map((lorry, lorryIndex) => {
                                    return (
                                        <>
                                            {
                                                new Date(lorry.scheduled).toLocaleDateString() === dates[dayIndex] &&
                                                <tbody key={lorryIndex}>
                                                    <tr>
                                                        <td>{lorry.material}</td>
                                                        <td>{lorry.customer}</td>
                                                        <td>{lorry.refNum}</td>
                                                        <td>
                                                            {lorry.out && 'Done'}
                                                        </td>
                                                        {false &&
                                                            <td>
                                                                {lorry.out && new Date(lorry.out).toLocaleDateString()}
                                                            </td>}
                                                    </tr>
                                                </tbody>}
                                        </>
                                    )
                                })}
                        </table>
                    )
                })}
            </div>
            }
        </>
    )
}

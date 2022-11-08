import React from 'react'

export default function Table(props) {
    return (
        <>
            <thead>
                <tr>
                    <th colSpan={3} className='table-day'>{props.day}</th>
                    <th colSpan={2} className='table-date'>{props.dateOnDay}</th>
                </tr>
                <tr>
                    <th>Material</th>
                    <th>Customer</th>
                    <th>Ref</th>
                    <th>Status</th>
                    <th>Date</th>
                </tr>
            </thead>
        </>
    )
}

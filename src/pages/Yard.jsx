import React, { useState } from 'react'
import Collection from '../components/Collection'
import { CiAlarmOn as WaitingIcon } from 'react-icons/ci'
import { GiForklift as LoadingIcon } from 'react-icons/gi'
import { GiTrafficLightsGreen as FinishedIcon } from 'react-icons/gi'

export default function Yard(props) {
    const [isWaiting, setWaiting] = useState(true)
    const [isLoaded, setLoaded] = useState(false)
    const [isFinished, setFinished] = useState(false)

    return (
        <>
            <nav className='tabs'>
                <ul>
                    <li style={{
                        backgroundColor: `${isWaiting ? 'darkslategrey' : 'white'}`,
                        color: `${isWaiting ? 'white' : 'black'}`
                    }} className='tab' onClick={() => { setWaiting(true); setLoaded(false); setFinished(false) }}>Waiting</li>
                    <li style={{
                        backgroundColor: `${isLoaded ? 'darkslategrey' : 'white'}`,
                        color: `${isLoaded ? 'white' : 'black'}`
                    }} className='tab' onClick={() => { setWaiting(false); setLoaded(true); setFinished(false) }}>Loaded</li>
                    <li style={{
                        backgroundColor: `${isFinished ? 'darkslategrey' : 'white'}`,
                        color: `${isFinished ? 'white' : 'black'}`
                    }} className='tab' onClick={() => { setWaiting(false); setLoaded(false); setFinished(true) }}>Finished</li>
                </ul>
            </nav>

            <div className='yard container'>
                {/*props.isLoading && <h1 style={{ color: 'white' }}>Loading...</h1>*/}
                {true &&
                    <>
                        {isWaiting &&
                            <div className='waiting col'>
                                {props.collections
                                    .sort((a, b) => new Date(a.in) - new Date(b.in))
                                    .map(load => {
                                        return <>
                                            {load.in && !load.start &&
                                                < Collection
                                                    key={load._id}
                                                    id={load._id}
                                                    material={load.material}
                                                    customer={load.customer}
                                                    refNum={load.refNum}
                                                    collectionIn={load.in}
                                                    collectionOut={load.out}
                                                    //check in-out
                                                    collectionStart={load.start}
                                                    collectionFinish={load.finish}
                                                    //loading status
                                                    collections={props.collections}
                                                    setCollections={props.setCollections}
                                                    //due
                                                    scheduled={load.scheduled}
                                                    //button visibility
                                                    fwBtnVis={[false, true, false, false]}
                                                    redoBtnVis={[false, false, false, false]}
                                                />}
                                        </>
                                    })}
                            </div>}

                        {isLoaded &&
                            <div className='loading col'>
                                {props.collections
                                    .sort((a, b) => new Date(a.start) - new Date(b.start))
                                    .map(load => {
                                        return <>
                                            {load.start && !load.finish &&
                                                < Collection
                                                    key={load._id}
                                                    id={load._id}
                                                    material={load.material}
                                                    customer={load.customer}
                                                    refNum={load.refNum}
                                                    collectionIn={load.in}
                                                    collectionOut={load.out}
                                                    //check in-out
                                                    collectionStart={load.start}
                                                    collectionFinish={load.finish}
                                                    //loading status
                                                    collections={props.collections}
                                                    setCollections={props.setCollections}
                                                    //due
                                                    scheduled={load.scheduled}
                                                    //button visibility
                                                    fwBtnVis={[false, false, true, false]}
                                                    redoBtnVis={[false, true, false, false]}
                                                />}
                                        </>
                                    })}
                            </div>}

                        {isFinished &&
                            <div className='completed col'>
                                {props.collections
                                    .sort((a, b) => new Date(a.finish) - new Date(b.finish))
                                    .map(load => {
                                        return <>
                                            {load.finish &&
                                                < Collection
                                                    key={load._id}
                                                    id={load._id}
                                                    material={load.material}
                                                    customer={load.customer}
                                                    refNum={load.refNum}
                                                    collectionIn={load.in}
                                                    collectionOut={load.out}
                                                    //check in-out
                                                    collectionStart={load.start}
                                                    collectionFinish={load.finish}
                                                    //loading status
                                                    collections={props.collections}
                                                    setCollections={props.setCollections}
                                                    //due
                                                    scheduled={load.scheduled}
                                                    //button visibility
                                                    fwBtnVis={[false, false, false, false]}
                                                    redoBtnVis={[false, false, true, false]}
                                                />}
                                        </>
                                    })}
                            </div>}
                    </>
                }
            </div>
        </>
    )
}

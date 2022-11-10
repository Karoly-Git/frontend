import React from 'react'
import Collection from '../components/Collection'
import { CiAlarmOn as WaitingIcon } from 'react-icons/ci'
import { GiForklift as LoadingIcon } from 'react-icons/gi'
import { GiTrafficLightsGreen as FinishedIcon } from 'react-icons/gi'

export default function Loading(props) {
    return (
        <div className='yard container'>
            <div className='waiting col'>
                <h2>
                    <WaitingIcon /> Waiting
                </h2>
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
            </div>
            <div className='loading col'>
                <h2>
                    <LoadingIcon /> Being loaded
                </h2>
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
            </div>
            {!false && <div className='completed col'>
                <h2>
                    <FinishedIcon /> Finished
                </h2>
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
        </div>
    )
}

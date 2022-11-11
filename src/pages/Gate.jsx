import React, { useState, useRef } from 'react'
import Collection from '../components/Collection'
import { BsCalendarWeek as CalenderIcon } from 'react-icons/bs'
import { GoListOrdered as InIcon } from 'react-icons/go'
import { AiOutlineLike as OutIcon } from 'react-icons/ai'
import { BsSearch as SearchIcon } from 'react-icons/bs'
import { IoMdClose as ResetIcon } from 'react-icons/io'

export default function Gate(props) {
    const myRef = useRef();
    const dateToday = new Date();
    const [searchValue, setSearchValue] = useState('');
    const [isAllShowed, setIsAllShowed] = useState(false)
    const [isDue, setDue] = useState(true)
    const [isOn, setOn] = useState(false)
    const [isOut, setOut] = useState(false)

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleCheckBoxChange = () => {
        setIsAllShowed(!isAllShowed);
    }

    const showAll = (scheduled, reScheduled) => {
        if (isAllShowed) {
            return true
        } else if (reScheduled && new Date(reScheduled) <= dateToday) {
            return true
        } else if (scheduled && new Date(scheduled) <= dateToday) {
            return true
        } else {
            return false;
        }
    }

    const search = (material, customer, refNum, date) => {
        if (
            material.toLowerCase().includes(searchValue.toLowerCase()) ||
            customer.toLowerCase().includes(searchValue.toLowerCase()) ||
            refNum.toLowerCase().includes(searchValue.toLowerCase()) ||
            date.toLowerCase().includes(searchValue.toLowerCase())
        ) {
            return true
        } else {
            return false
        }
    }

    const resetClick = () => {
        myRef.current.focus();
        setSearchValue('');
    }

    return (
        <>
            <nav className='tabs'>
                <ul>
                    <li style={{
                        backgroundColor: `${isDue ? 'black' : 'white'}`,
                        color: `${isDue ? 'white' : 'black'}`
                    }} className='tab' onClick={() => { setDue(true); setOn(false); setOut(false) }}>Due</li>
                    <li style={{
                        backgroundColor: `${isOn ? 'black' : 'white'}`,
                        color: `${isOn ? 'white' : 'black'}`
                    }} className='tab' onClick={() => { setDue(false); setOn(true); setOut(false) }}>Ready</li>
                    <li style={{
                        backgroundColor: `${isOut ? 'black' : 'white'}`,
                        color: `${isOut ? 'white' : 'black'}`
                    }} className='tab' onClick={() => { setDue(false); setOn(false); setOut(true) }}>Gone</li>
                    <li className='ico-container'>
                        <SearchIcon
                            onClick={() => {
                                myRef.current.focus();
                            }}
                            className='search-icon' />
                        <ResetIcon
                            onClick={resetClick}
                            className='reset-icon' />
                        <input ref={myRef} className='search-input' onChange={handleInputChange} value={searchValue} type="text" placeholder='Search...' />
                    </li>
                    <li>
                        <label htmlFor="all">
                            All <input onChange={handleCheckBoxChange} type="checkbox" id='all' />
                        </label>
                        {false && <label htmlFor="cancelled">
                            Cancelled <input type="checkbox" id='cancelled' />
                        </label>}
                    </li>
                </ul>
            </nav>
            <div className='weighbridge container'>
                {/*props.isLoading && <h1 style={{ color: 'white' }}>Loading...</h1>*/}
                {!props.isLoading &&
                    <>
                        {isDue &&
                            <div className='due col'>
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
                                    .map(load => {
                                        return <>
                                            {!load.in &&
                                                showAll(load.scheduled, load.reScheduled) &&
                                                search(load.material, load.customer, load.refNum, load.scheduled) &&
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
                                                    fwBtnVis={[true, false, false, false]}
                                                    redoBtnVis={[false, false, false, false]}
                                                />}
                                        </>
                                    })}
                            </div>}

                        {isOn &&
                            <div className='checked-in col'>
                                {props.collections
                                    .sort((a, b) => new Date(a.in) - new Date(b.in))
                                    .map(load => {
                                        return <>
                                            {load.finish && !load.out &&
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
                                                    fwBtnVis={[false, false, false, true]}
                                                    redoBtnVis={[true, false, false, false]}
                                                />}
                                        </>
                                    })}
                            </div>}

                        {isOut &&
                            <div className='checked-out col'>
                                {props.collections
                                    .sort((a, b) => new Date(a.out) - new Date(b.out))
                                    .map(load => {
                                        return <>
                                            {load.out &&
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
                                                    redoBtnVis={[false, false, false, true]}
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
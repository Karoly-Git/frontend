import React, { useState } from 'react'
import Collection from '../components/Collection'
import { BsCalendarWeek as CalenderIcon } from 'react-icons/bs'
import { GoListOrdered as InIcon } from 'react-icons/go'
import { AiOutlineLike as OutIcon } from 'react-icons/ai'
import { BsSearch as SearchIcon } from 'react-icons/bs'
import { IoMdClose as ResetIcon } from 'react-icons/io'

export default function CheckInOut(props) {
    const dateToday = new Date();
    const [searchValue, setSearchValue] = useState('');
    const [isAllShowed, setIsAllShowed] = useState(false)

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

    const resetSearchValue = () => {
        setSearchValue('');
    }

    return (
        <>
            <nav className='tabs'>
                <ul>
                    <li>Due</li>
                    <li>Onsite</li>
                    <li>Left</li>
                </ul>
            </nav>
            <div className='weighbridge container'>
                <div className='due col'>
                    <h2>
                        <CalenderIcon /> Due collections
                    </h2>
                    <div className='ico-container'>
                        <SearchIcon className='search-icon' />
                        <ResetIcon onClick={resetSearchValue} className='reset-icon' />
                    </div>
                    <input className='search-input' onChange={handleInputChange} value={searchValue} type="text" placeholder='Search for collection' />
                    <div className='search-box'>
                        <label htmlFor="all">
                            All <input onChange={handleCheckBoxChange} type="checkbox" id='all' />
                        </label>
                        {false && <label htmlFor="cancelled">
                            Cancelled <input type="checkbox" id='cancelled' />
                        </label>}
                    </div>
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
                </div>

                <div className='checked-in col'>
                    <h2>
                        <InIcon /> Collections onsite
                    </h2>
                    {props.collections
                        .sort((a, b) => new Date(a.in) - new Date(b.in))
                        .map(load => {
                            return <>
                                {load.in && !load.out &&
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
                </div>

                {!false && <div className='checked-out col'>
                    <h2>
                        <OutIcon /> Checked out
                    </h2>
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
            </div>
        </>
    )
}
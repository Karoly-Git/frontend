import React, { useState } from 'react'
import { MdLogin as CheckInIcon } from 'react-icons/md'
import { MdLogout as CheckOutIcon } from 'react-icons/md'
import { VscDebugStart as StartIcon } from 'react-icons/vsc'
import { MdDone as FinishIcon } from 'react-icons/md'
import { CgRedo as RedoIcon } from 'react-icons/cg'

const passwords = ['', '1', '2'];

export default function Collection(props) {
    const [id, setId] = useState('');
    const [action, setAction] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = { id, action };
        fetch('http://localhost:8000/write', {
            //fetch('https://lorry-tracker.herokuapp.com/write', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
    }

    const checkIn = (id) => {
        let password = prompt('Password?');
        if (passwords.includes(password)) {
            setId(id);
            setAction('checkIn');
        } else {
            alert('Wrong password!');
            return
        }
    }

    const redoCheckIn = (id) => {
        let password = prompt('Password?');
        if (passwords.includes(password)) {
            setId(id);
            setAction('redoCheckIn');
        } else {
            alert('Wrong password!');
            return
        }
    }

    const startLoading = (id) => {
        let password = prompt('Password?');
        if (passwords.includes(password)) {
            setId(id);
            setAction('startLoading');
        } else {
            alert('Wrong password!');
            return
        }
    }

    const redoStartLoading = (id) => {
        let password = prompt('Password?');
        if (passwords.includes(password)) {
            setId(id);
            setAction('redoStartLoading');
        } else {
            alert('Wrong password!');
            return
        }
    }

    const finishLoadnig = (id) => {
        let password = prompt('Password?');
        if (passwords.includes(password)) {
            setId(id);
            setAction('finishLoadnig');
        } else {
            alert('Wrong password!');
            return
        }
    }

    const redoFinishLoadnig = (id) => {
        let password = prompt('Password?');
        if (passwords.includes(password)) {
            setId(id);
            setAction('redoFinishLoadnig');
        } else {
            alert('Wrong password!');
            return
        }
    }

    const checkOut = (id) => {
        let password = prompt('Password?');
        if (passwords.includes(password)) {
            setId(id);
            setAction('checkOut');
        } else {
            alert('Wrong password!');
            return
        }
    }

    const redoCheckOut = (id) => {
        let password = prompt('Password?');
        if (passwords.includes(password)) {
            setId(id);
            setAction('redoCheckOut');
        } else {
            alert('Wrong password!');
            return
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <header>
                <div className='detail-box'>
                    <div className='material'>{props.material}</div>
                    <div className='customer'>{props.customer}</div>
                    <div className='ref-number'>{props.refNum}</div>
                    <div className='due'>{new Date(props.scheduled).toLocaleDateString()}</div>
                </div>

                <div className='time-box'>
                    {props.collectionIn &&
                        <div>
                            <CheckInIcon className='status-icon' />
                            {new Date(props.collectionIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>}
                    {props.collectionStart &&
                        <div>
                            <StartIcon className='status-icon' />
                            {new Date(props.collectionStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>}
                    {props.collectionFinish &&
                        <div>
                            <FinishIcon className='status-icon' />
                            {new Date(props.collectionFinish).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>}
                    {props.collectionOut &&
                        <div>
                            <CheckOutIcon className='status-icon' />
                            {new Date(props.collectionOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>}
                </div>
            </header>
            <footer>
                {props.redoBtnVis[0] && !props.collectionStart &&
                    <button onClick={() => redoCheckIn(props.id)}>
                        <RedoIcon className='icon redo' style={{ transform: 'scale(-1, 1)' }} />
                    </button>}
                {props.redoBtnVis[1] &&
                    <button onClick={() => redoStartLoading(props.id)}>
                        <RedoIcon className='icon redo' style={{ transform: 'scale(-1, 1)' }} />
                    </button>}
                {props.redoBtnVis[2] && !props.collectionOut &&
                    <button onClick={() => redoFinishLoadnig(props.id)}>
                        <RedoIcon className='icon redo' style={{ transform: 'scale(-1, 1)' }} />
                    </button>}
                {!false && props.redoBtnVis[3] && props.collectionOut &&
                    <button onClick={() => redoCheckOut(props.id)}>
                        <RedoIcon className='icon redo' style={{ transform: 'scale(-1, 1)' }} />
                    </button>}

                {props.fwBtnVis[0] &&
                    <button type='submit forward' onClick={() => {
                        checkIn(props.id);
                    }}>
                        <CheckInIcon className='icon forward' />
                    </button>}
                {props.fwBtnVis[1] &&
                    <button onClick={() => startLoading(props.id)}>
                        <StartIcon className='icon forward' />
                    </button>}
                {props.fwBtnVis[2] &&
                    <button onClick={() => finishLoadnig(props.id)}>
                        <FinishIcon className='icon forward' />
                    </button>}
                {props.fwBtnVis[3] && props.collectionFinish &&
                    <button onClick={() => checkOut(props.id)}>
                        <CheckOutIcon className='icon forward' />
                    </button>}
            </footer>
        </form>
    )
}

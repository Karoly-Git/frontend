import './App.css'
import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useFetcher } from 'react-router-dom'
import axios from 'axios'
import Loading from './pages/Loading'
import CheckInOut from './pages/Check_In_Out'
import Admin from './pages/Admin'

export default function App() {
  const [collections, setCollections] = useState([]);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const clock = () => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    }, 1000);
  }

  //clock();

  const getData = () => {
    axios.get("http://localhost:8000/all")
      //axios.get("https://lorry-tracker.herokuapp.com/all")
      .then(res => {
        //console.log(res.data);
        setCollections([...res.data])
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    //setInterval(() => {
    getData();
    //}, 1000);
  }, [])


  return (
    <>
      <div>
        <div className='date-time'>
          <div>
            {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', weekday: 'long' })}
          </div>
          <div>
            {time}
          </div>
        </div>
        <nav>
          <div>
            <Link key={'link1'} to={'/'} >WeighBridge</Link>
            <Link key={'link2'} to={'loading'} >Yard</Link>
            <Link key={'link3'} to={'admin'} >Admin</Link>
          </div>
        </nav>
        <Routes>
          <Route path='/' element={<CheckInOut collections={collections} setCollections={setCollections} />} ></Route>
          <Route path='loading' element={<Loading collections={collections} setCollections={setCollections} />} ></Route>
          <Route path='admin' element={<Admin collections={collections} setCollections={setCollections} />} ></Route>
          <Route path='*' element={<h1>Page not found</h1>} ></Route>
        </Routes>
      </div>
    </>
  )
}

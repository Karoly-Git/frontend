import './App.css'
import React, { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
import Yard from './pages/Yard'
import Gate from './pages/Gate'
import Admin from './pages/Admin'

export default function App() {
  const [collections, setCollections] = useState([]);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [loading, setLoading] = useState(false);

  const clock = () => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    }, 1000);
  }

  clock();

  const getData = () => {
    //axios.get("http://localhost:8000/all")
    axios.get("https://lorry-tracker.herokuapp.com/all")
      .then(res => {
        //console.log(res.data);
        setCollections([...res.data])
      })
      .catch((err) => console.log(err))
  }

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://lorry-tracker.herokuapp.com/all", {
        params: {},
      });
      setCollections([...res.data]);
      /*setTimeout(() => {
        setLoading(false);
      }, 200);*/
    } catch (error) {
      setLoading(false);
      console.error(error);
    }

    /*
    //axios.get("http://localhost:8000/all")
    axios.get("https://lorry-tracker.herokuapp.com/all")
      .then(res => {
        //console.log(res.data);
        setCollections([...res.data])
      })
      .catch((err) => console.log(err))
      */
  }

  useEffect(() => {
    setInterval(() => {
      //getData();
      fetchData();
    }, 1000);
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
            <Link key={'link1'} to={'/'} >Gate</Link>
            <Link key={'link2'} to={'loading'} >Yard</Link>
            <Link key={'link3'} to={'admin'} >Admin</Link>
          </div>
        </nav>
        <Routes>
          <Route path='/' element={<Gate isLoading={loading} collections={collections} setCollections={setCollections} />} ></Route>
          <Route path='loading' element={<Yard isLoading={loading} collections={collections} setCollections={setCollections} />} ></Route>
          <Route path='admin' element={<Admin isLoading={loading} collections={collections} setCollections={setCollections} />} ></Route>
          <Route path='*' element={<h1>Page not found</h1>} ></Route>
        </Routes>
      </div>
    </>
  )
}

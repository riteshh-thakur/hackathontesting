import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Doctordashboard from './screens/Doctordashboard'
import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Footer from './Footer/Footer';
function App() {
  const [count, setCount] = useState(0)

  return (<>
 <Header/>
 <Outlet/>
 <Footer/>
 </>

  )
}

export default App

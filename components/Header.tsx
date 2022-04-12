import React, {useContext, useEffect, useState} from 'react'
import Link from 'next/link'
import AppContext from '../contexts/AppContext';

const Header = () => {
  const appState = useContext(AppContext);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  
  const {loader, meetActivate} = appState.state;

  useEffect(() => {
    const oldThemeMode = localStorage.getItem('themeMode');
    if(oldThemeMode) setThemeMode(oldThemeMode as 'light' | 'dark');
    else{
      const html = document.querySelector('html');
      if(html) {
        setThemeMode(html.classList.contains('dark') ? 'dark' : 'light');
      }
    }
  },[])

  useEffect(() => {
    const html = document.querySelector('html');
    if(html) {
      if(themeMode === 'dark') html.classList.add('dark');
      else html.classList.remove('dark');
    }
    localStorage.setItem('themeMode', themeMode);
  },[themeMode])

  const toggleThemeMode = () => {
      setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
  }

  return (
    <div className='sticky z-50 mb-4 top-0 left-0 bg-white dark:bg-black transition-none dark:text-white '>
     <div className="mx-20 px-6 py-4 flex justify-between">
      <Link href='/'>
          <a  className={`font-semibold text-xl no-underline text-center w-20 transition ease-linear duration-1000 ${meetActivate ? "animateFullWidth" : "animateNormalWidth"}`}>V9 meet</a>
      </Link>
      <div className="flex items-center">
            <div className={`transition-none ${meetActivate ? "w-0 h-0 invisible" : ""}`}>
            <Link href='/'>
              <a className="mx-2">Home</a>
            </Link>
            <Link href='https://www.vivek9patel.dev'>
              <a className="mx-2">About Me</a>
            </Link>
            </div>
          <input onChange={toggleThemeMode} checked={themeMode === 'dark'} className="themeToggle mx-2" type="checkbox"></input>
      </div>
     </div>
     <div className="w-full dark:bg-gray-200 bg-black h-1">
      <div className={`bg-v9-pink w-0 h-1 ${loader ? "triggerLoader" : ""}`}></div>
      </div>
    </div>
  )
}

export default Header

import React, {useEffect, useState} from 'react'
import Link from 'next/link'

const Header = () => {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  const [headerBGColor, setHeaderBGColor] = useState('transperent');
  // const {loader, meetActivate} = appState.state;

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
    <div className={`sticky z-50 top-0 left-0 transition-none transform dark:text-white bg-${themeMode === 'dark' ? "black" : "white"}`}>
     <div className="mx-20 px-6 py-4 flex justify-between">
      <Link href='/'>
          <div className={`font-semibold text-xl no-underline text-center w-24 transition ease-linear duration-1000 ${false ? "animateFullWidth" : "animateNormalWidth"}`}>
            <a className='cursor-pointer'>V9 blogs</a>
          </div>
      </Link>
      <div className="flex items-center">
            <div className={`transition-none ${false ? "w-0 h-0 invisible" : ""}`}>
            <Link href='/'>
              <a className="mx-2">Home</a>
            </Link>
            <Link href='https://meet.vivek9patel.dev/schedule'>
              <a target={"_blank"} className="mx-2">Let's chat</a>
            </Link>
            </div>
          <input onChange={toggleThemeMode} checked={themeMode === 'dark'} className="themeToggle mx-2" type="checkbox"></input>
      </div>
     </div>
     <div className="w-full dark:bg-gray-200 bg-black h-1">
      <div className={`bg-v9-pink w-0 h-1 ${false ? "triggerLoader" : ""}`}></div>
      </div>
    </div>
  )
}

export default Header

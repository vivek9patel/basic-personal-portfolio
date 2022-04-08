import React, {useState} from 'react'
import Link from 'next/link'

const Header = ({loader = false}: {loader?: boolean}) => {

  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  const toggleThemeMode = () => {
    const html = document.querySelector('html');
    if(html){
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        setThemeMode('light');
    } else {
        html.classList.add('dark');
        setThemeMode('dark');
    }
    }
  }

  return (
    <div className='sticky top-0 left-0 bg-white dark:bg-black transition-none dark:text-white '>
     <div className="mx-20 px-6 py-4 flex justify-between">
      <Link href='/'>
          <a  className='font-semibold text-xl no-underline'>V9 meet</a>
          </Link>
        <div className="flex items-center">
            <Link href='/'>
              <a className="mx-2">Home</a>
            </Link>
            <Link href='https://www.vivek9patel.dev'>
              <a className="mx-2">Personal site</a>
            </Link>
            <input onClick={toggleThemeMode} defaultChecked={themeMode==="light"} className="themeToggle mx-2" type="checkbox"></input>
        </div>
     </div>
     <div className="w-full dark:bg-gray-200 bg-black h-1">
      <div className={`bg-v9-pink w-0 h-1 ${loader ? "triggerLoader" : ""}`}></div>
      </div>
    </div>
  )
}

export default Header

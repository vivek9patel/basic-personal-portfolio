import React from 'react'
import { NextPage } from "next"
import Link from 'next/link'

const Header: NextPage = () => {

  const [themeMode, setThemeMode] = React.useState<'light' | 'dark'>('light');

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
    <div className='bg-white border-b-4 border-black dark:bg-black dark:text-white dark:border-white'>
     <div className="mx-20 px-6 py-4 flex justify-between">
      <Link href='/'>
          <a  className='font-semibold text-xl no-underline'>v9 blogs</a>
          </Link>
        <div className="flex items-center">
            <Link href='/'>
              <a className="mx-2">Home</a>
            </Link>
            <Link href='/blogs'>
              <a className="mx-2">Blogs</a>
            </Link>
            <input onClick={toggleThemeMode} defaultChecked={themeMode==="light"} className="themeToggle mx-2" type="checkbox"></input>
        </div>
     </div>
    </div>
  )
}

export default Header
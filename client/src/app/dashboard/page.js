import NavBar from '@/components/navbar/page'
import SideBar from '@/components/sidebar/page'
import React from 'react'
import MainSection from './mainSection'
import LoginSection from './loginSection'


const page = () => {
    const expenditureToday = 2000

  return (
    <div>
        <NavBar/>
        <div className='flex'>
            <SideBar/>
            <LoginSection/>
            <MainSection expenditureToday={expenditureToday}/>
        </div>
       
    </div>
  )
}

export default page
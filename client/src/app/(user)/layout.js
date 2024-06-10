'use client'
import SideBar from '@/components/sidebar/page'
import { Button, Image } from '@nextui-org/react'
import React from 'react'
import {Avatar} from "@nextui-org/react";
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/redux/reducerSlices/userSlice';
import { useRouter } from 'next/navigation';
const layout = ({children}) => {
  const dispatch = useDispatch()
  const router= useRouter()

  const logout = ()=>{
    dispatch(logoutUser())
    router.push('/')
  }
  return (
    <div >
        <div className='flex m-4'>
            <div className='flex flex-col items-center'>
              <Image src="/logo.png" width={80 } height={80} className=''/>
              
            <SideBar/>
            </div>
            {children}
            <Button onClick={()=> logout()}>Logout</Button>
            {/* <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" /> */}
           </div>
           </div>
  )
}

export default layout
import SideBar from '@/components/sidebar/page'
import { Image } from '@nextui-org/react'
import React from 'react'

const layout = ({children}) => {
  return (
    <div>
        <div className='flex m-4'>
            <div className='flex flex-col items-center'>
              <Image src="/logo.png" width={80 } height={80} className=''/>
            <SideBar/>
            </div>
            {children}
           </div>
           </div>
  )
}

export default layout
'use client'
import { changeHeight } from '@/redux/reducerSlices/boxSlice'
import { Button, Input } from '@nextui-org/react'
import React from 'react'

import { useSelector } from 'react-redux'

const Box = () => {
    const {height, width, backgroundColor} = useSelector(state=>state.box)
  return (
    <div>
      <div style={{backgroundColor: backgroundColor, height: height, width:width }}>
      </div>
    <Button>+Width</Button>
    <Button>+Height</Button>
    <Button>Change to circle</Button>
    <Input placeholder='Enter color'/>

    </div>
  )
}

export default Box
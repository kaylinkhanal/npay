'use client'
import { changeHeight, changeShape,changeWidth,changeBackgroundColor } from '@/redux/reducerSlices/boxSlice'
import { Button, Input } from '@nextui-org/react'
import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

const Box = () => {
    const {height, width, backgroundColor, borderRadius } = 
    useSelector(state=>state.box)
    const dispatch = useDispatch()
  const generateArea = () => {
    return Math.PI * (width/2) ** 2
  }
  return (
    <div>
      <div style={{backgroundColor: backgroundColor, height: height, width:width, borderRadius:borderRadius }}>
      </div>
      {generateArea()}
    <Button onClick={()=>dispatch(changeWidth()) }>+Width</Button>
    <Button onClick={()=> dispatch(changeHeight())}>+Height</Button>
    <Button  onClick={()=> dispatch(changeShape())}>Change shape</Button>
    <Input onChange={(e)=>dispatch(changeBackgroundColor(e.target.value)) } placeholder='Enter color'/>
    </div>
  )
}
export default Box
'use client'
import React from 'react'
import { useSelector } from 'react-redux'

const CustomCard = () => {
  const value = useSelector(state=> state.counter.value)

  return (
    <div className='m-4 p-4 shadow-lg'>
        {value}
    </div>
  )
}

export default CustomCard
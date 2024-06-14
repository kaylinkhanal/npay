'use client'

import { Card, CardBody } from '@nextui-org/react'
import React from 'react'
import { CgDollar } from 'react-icons/cg'
import { useSelector } from 'react-redux'
import { SiMoneygram } from "react-icons/si";
import { GiExpense } from "react-icons/gi";




const page = () => {
 const {userDetails} = useSelector(state=>state.user)
  return (
    <div  >
    <div className='flex text-2xl m-6 p-2'>
      Hi 
       <div className='font-mono font-extrabold mx-4 text-green-400'>{userDetails.fullName}</div>
    </div> 
    <section className="text-gray-600 body-font ">
  <div className="container px-5  mx-auto ">
    <div className="flex flex-col text-center w-full mb-20">
    <Card className='p-4'>
      <CardBody className='font-mono '>
       <div> 
        <p className='text-gray-400'> TOTAL BALANCE:</p>
        <div className=' text-4xl font-extrabold text-green-500'> {userDetails.totalBalance}</div>
        </div>
      </CardBody>
    </Card>
    </div>

    <div className="flex flex-wrap">
      <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
      <Card className='p-4'>
      <CardBody className='font-mono '>
       <div> 
        <div className='flex text-gray-400 items-center'> <SiMoneygram size={40}/> Income</div>
        <div className=' text-4xl font-extrabold text-green-500'> NPR. 500</div>
        </div>
      </CardBody>
    </Card>
      </div>

      <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
      <Card className='p-4'>
      <CardBody className='font-mono '>
       <div> 
       <div className='flex text-gray-400 items-center'> <GiExpense size={40}/> Expense</div>
        <div className=' text-4xl font-extrabold text-green-500'> NPR. 500</div>
        </div>
      </CardBody>
    </Card>
      </div>

      <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
        <Card className='p-4'>
      <CardBody className='font-mono '>
       <div> 
        <p className='text-gray-400'> TOTAL BALANCE:</p>
        <div className=' text-4xl font-extrabold text-green-500'> NPR. 500</div>
        </div>
      </CardBody>
    </Card>
      </div>

      <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
      <Card className='p-4'>
      <CardBody className='font-mono '>
       <div> 
        <p className='text-gray-400'> TOTAL BALANCE:</p>
        <div className=' text-4xl font-extrabold text-green-500'> NPR. 500</div>
        </div>
      </CardBody>
    </Card>
      </div>

    </div>
    <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
  </div>
</section>
    </div>
  )
}

export default page
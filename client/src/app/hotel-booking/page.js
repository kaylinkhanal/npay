'use client'
import { Card, CardBody, CardFooter, CardHeader, Image } from '@nextui-org/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const HotelBooking = () => {
    const [roomList, setRoomList] = useState([])
    useEffect(()=>{
        fetchHotelList()
    },[])

    const fetchHotelList = async()=> {
        const {data} =await axios.get(`${process.env.NEXT_PUBLIC_API_URL}rooms`)
        setRoomList(data)
    }
  return (
    <div className='flex'>
           {roomList.length>0 && roomList.map((item)=>{
            return (
                <Card className='p-2 w-[30%] m-2'>
                    <CardHeader>
                    {item.roomCategory}
                    </CardHeader>
                    <CardBody className='bg-orange-300 text-sm rounded-md shadow-md'>
                     {item.isBooked ? "Not Available": "Available"}
                     <Image src={`${process.env.NEXT_PUBLIC_API_URL}rooms-image/${item.roomPhoto}`} width={100} height={100}/>
     
                    </CardBody>
                    <CardFooter>
                    {item.price}
                    </CardFooter>
                </Card>
            )
           })}
    </div>
  )
}

export default HotelBooking
'use client'
import ProductCard from '@/components/card/page'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsCart, BsHeart } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import {Badge, Avatar, Switch} from "@nextui-org/react";

const Home = () => {
  const [productList, setProductList] = useState([])
  const [isInvisible, setIsInvisible] = useState(false);

  const {wishLists} = useSelector(state=>state.product)
  useEffect(()=>{
    fetchProductList()
  },[])

  const fetchProductList =async()=> {
    const {data} =await axios.get(`http://localhost:4000/products`)
    setProductList(data)
  }
  return (
    <div className='m-4'>
       <Link href="/cart" >
       <Badge color="danger" content={wishLists?.length || 0} isInvisible={isInvisible} shape="circle">
       <BsHeart size={40}/>

        </Badge>
        
    
        </Link>
        <div className='flex'>
        {productList.map((item)=>{
          return <ProductCard item={item}/>
        })}
      </div>
    </div>
 
  )
}

export default Home
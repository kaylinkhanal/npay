'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const box = () => {
  const [productList, setProductList] = useState([])
  useEffect(()=>{
    fetchProducts()
  },[])
  const fetchProducts = async()=>{
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}products`)
    setProductList(data)
  }
  return (
    <div>{JSON.stringify(productList)}</div>
  )
}

export default box
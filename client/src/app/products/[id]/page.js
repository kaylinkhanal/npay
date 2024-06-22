'use client'
import { addToCart } from '@/redux/reducerSlices/productSlice'
import { Button } from '@nextui-org/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const ProductDetails = ({params}) => {
  const dispatch = useDispatch()
  const [productDetails, setProductDetails] = useState([])
  useEffect(()=>{
    if(params.id){
      fetchProductDetails()
    }
  },[])

  const fetchProductDetails =async()=> {
    const {data} =await axios.get(`http://localhost:4000/products/${params.id}`)
    setProductDetails(data)
  }
  return (
    <div>
      <p className='text-3xl m-2 text-green-400'>{productDetails?.productName}</p>
      <p className=' m-2 text-green-400'>{productDetails?.productDescription}</p>
      <Button onClick={()=>dispatch(addToCart(productDetails))}>Add to Cart</Button>
    </div>
  )
}

export default ProductDetails
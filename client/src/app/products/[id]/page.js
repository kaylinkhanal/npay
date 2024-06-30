'use client'
import { addToCart, addToWishlist } from '@/redux/reducerSlices/productSlice'
import { Badge, Button } from '@nextui-org/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsCart } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'

const ProductDetails = ({params}) => {
  const dispatch = useDispatch()
  const {cartItems} = useSelector(state=>state.product)
  const [isInvisible, setIsInvisible] = useState(false);
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
       <Badge color="danger" content={cartItems.length} isInvisible={isInvisible} shape="circle">
       <BsCart size={40}/>

        </Badge>
      <p className='text-3xl m-2 text-green-400'>{productDetails?.productName}</p>
      <p className=' m-2 text-green-400'>{productDetails?.productDescription}</p>
      <Button onClick={()=>dispatch(addToCart(productDetails))}>Add to Cart</Button>
      <Button onClick={()=>dispatch(addToWishlist(productDetails))}>Add to Wishlist</Button>

    </div>
  )
}

export default ProductDetails
'use client'
import { removeFromCart } from '@/redux/reducerSlices/productSlice'
import { Button } from '@nextui-org/react'
import React from 'react'
import { BsTrash2 } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'

const Cart = () => {
   const dispatch= useDispatch()
    const {wishLists } = useSelector(state=>state.product)
  return (
    <div>
      YOUR wishlist ITEMS
  
        {wishLists.length>0 ? wishLists.map((item)=>{
          return (
            <div className='p-2 m-2 shadow-md'>
              <p>{item.productName}</p>
              <p>{item.productPrice}</p>
              <BsTrash2 onClick={()=>dispatch(removeFromCart(item._id))}/>
            </div>
          )
        }) : "No Cart Items"}
      </div>

  )
}

export default Cart
'use client'
import React from "react";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { BsHeart } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "@/redux/reducerSlices/productSlice";

export default function ProductCard(props) {
  const dispatch = useDispatch()
  const {wishLists} = useSelector(state=>state.product)
  const router = useRouter()
  const generateColor = ()=> {
    if(wishLists?.length> 0){
      const isInWishList = wishLists.find((item)=>{
        if(item._id == props.item._id){
            return item
        }
        })
        if(isInWishList) return 'red'
    }
  
  }
  return (
    <Card className="py-4 m-2">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
      <BsHeart color={generateColor()} size={40} onClick={()=>dispatch(addToWishlist(props.item))}/>
        <p className="text-tiny uppercase font-bold">{props.item.productCategory}</p>
        <small className="text-default-500">{props.item.productDescription.slice(0,13)+'...'}</small>
        <h4 className="font-bold text-large">{props.item.productName}</h4>
      </CardHeader>
      <CardBody onClick={()=> router.push('/products/'+props.item._id)} className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://nextui.org/images/hero-card-complete.jpeg"
          width={270}
        />
      </CardBody>
    </Card>
  );
}

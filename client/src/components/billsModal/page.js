'use client'
import React, { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, DatePicker} from "@nextui-org/react";

import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";


import { useFormik } from 'formik';
import { Input} from '@nextui-org/react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { BsTrash2 } from 'react-icons/bs';
import * as Yup from 'yup';
import CreatableSelect from 'react-select/creatable';



const MerchantForm = (props) => {

  const formik = useFormik({
    initialValues: {
        merchantName:props.merchantName,
        merchantPhoneNumber: props.merchantPhoneNumber
    },
    onSubmit: async (values) => {
     await submitMerchant(values)
    },
  });

  const submitMerchant = async(values) => {
     await axios.post(`${process.env.NEXT_PUBLIC_API_URL}bills`,values)

  }

 
  
  return (
    <form className='m-4 h-[30%] overflow-scroll flex flex-col border shadow-md rounded-lg p-4' onSubmit={formik.handleSubmit}>
      { props.merchantFields?.length> 0 && props.merchantFields?.map((item)=>{
        if(item.value?.toLowerCase().includes('month')){
          return<>
            <label htmlFor={item.value}>{item.label}</label>
            <DatePicker onChange={(e)=>formik.setFieldValue(item.value, e.day.toString() +'/'+ e.month.toString() +'/'+ e.year.toString())}/>
          </> 
        }
      return (
        <div>
           <label htmlFor={item.value}>{item.label}</label>
           <Input
        id={item.value}
        name={item.value}
        type="text"
        onChange={formik.handleChange}
        isRequired
        value={formik.values[item.value]}
      />
        </div>
      )
     })}
     
      <button className='bg-green-500 text-white rounded p-2 my-4 w-[20%]' type="submit">Submit</button>

   
    </form>
  );
};



export default function BillsModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = useState("inside");
  const [selectedCard, setSelectedCard] =useState(null)


  const [merchantList, setMerchantList] = useState([])
  useEffect(()=>{
    fetchMerchants()
  },[])
  const fetchMerchants = async()=>{
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}merchant`)
    setMerchantList(data)
  }

  return (
    <>
      <Button variant="light" onPress={onOpen} className="flex justify-start text-base">Bills Payment</Button>
      <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={scrollBehavior}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Bills Payment</ModalHeader>

              <ModalBody className="grid grid-cols-3 gap-4 max-h-96">
          

              {merchantList.length> 0 && merchantList.map((item)=>{
                return (
                  <Card   className="max-w-[290px]" style={{backgroundColor: item._id == selectedCard?._id ? 'lightGreen': null }}>
                    <CardHeader  onClick={()=> setSelectedCard(item)} className="flex gap-3">
                    <p> {item.merchantName}</p> 
                    </CardHeader>
                    <Divider/>
                    {/* <CardBody> */}
                    {/* <p>Merchant number: {item.merchantPhoneNumber}</p> <br/>
                    <p>Service Charge: {item.merchantServiceCharge}</p> 
                    </CardBody> */}
                  </Card>
                )
                })}
              </ModalBody>
                {selectedCard?.merchantFields && <MerchantForm merchantPhoneNumber={selectedCard?.merchantPhoneNumber} merchantName={selectedCard?.merchantName} merchantFields={selectedCard?.merchantFields}/>}
              
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

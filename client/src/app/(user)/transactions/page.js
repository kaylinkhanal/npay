"use client";

import { Card, CardBody, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { CgDollar } from "react-icons/cg";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "@/socket/socket";
import Lottie from 'react-lottie';
import animationData from '@/lotties/success';
import { useRouter } from "next/navigation";
import { GoTriangleDown } from "react-icons/go";
import BillsModal from "@/components/billsModal/page";

const SendMoneyForm = () => {
  useEffect(()=>{
    socket.on('connection')
  },[])
  
  const [isTrasactionSuccess, setIsTrasactionSuccess] = useState(false)
  const [successTransactionDetails, setSuccessTransactionDetails] = useState({})
  const itemValues = Object.entries(successTransactionDetails)
  const itemObject = itemValues.reduce((obj, [key, value]) => {
    obj[key] = value
    return obj
  }, {})
  // console.log(itemObject.amount)
  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const router = useRouter();
  const handleClick = () => {
    router.push('/dashboard')
  };

  const {userDetails} = useSelector(state=>state.user)
  const sendMoneySchema = Yup.object().shape({
    npayIdReceiver: Yup.string()
      .min(4, 'Too Short!')
      .max(10, 'Too Long!')
      .required('Required'),
      amount: Yup.number()
      .min(50, 'The minimum amount is Rs. 50')
      .max(100000, 'Maximum amount permitted is 1 lakhs')
      .required('Required'),
      remarks: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  });
  
 
  const formik = useFormik({
    initialValues: {
      npayIdReceiver: '',
      amount: '',
      remarks: ''
    },
    validationSchema:sendMoneySchema,
    onSubmit: values => {
      makeTransactions(values)
    },
  });

  const makeTransactions = async(values)=> {
   const {data}= await axios.patch('http://localhost:8000/transactions', {
    "npayIdReceiver": values.npayIdReceiver,
    "npayIdSender": userDetails.phoneNumber,
    "amount": values.amount ,
    "remarks": values.remarks
})
  socket.emit('transactions',{
    "npayIdReceiver": values.npayIdReceiver,
    "npayIdSender": userDetails.phoneNumber,
})
if(data.transactionId){
  setIsTrasactionSuccess(true)
  setSuccessTransactionDetails(data.transactionDetail)
}else{
  alert(data.msg)
}
  }
  const renderTransactionDetails = () => {
    return (
       <div>
        <h5 className="text-center text-xl font-bold mb-4 text-green-500">Transaction Successful!</h5>
        <div className="p-2 m-1 shadow-lg">
          <div className="flex justify-between items-center">
            <strong className="text-sm">Total Balance:</strong>
              <span className="text-red-500 text-md flex items-center">
                <GoTriangleDown className="text-red-500" />
                  {itemObject.amount}
              </span>
          </div>
      <div className="mt-1">
        <span className="text-md">
          ${userDetails.totalBalance - itemObject.amount - (0.1 * itemObject.amount)}
        </span>
      </div>
      
    </div>
<div className="grid grid-cols-2 gap-x-14 p-2 m-1 shadow-lg">
    {itemValues.map(([key, value]) => (
        <div key={key} className="p-1">
          <strong className="capitalize block mb-1 text-sm">{key}:</strong> 
            <span className="text-sm">{value}</span>
        </div>
        ))}
      </div>
        <Button
          type="submit"
          fullWidth
          className="bg-green-500 text-white" 
          onClick={()=>handleClick()}
          >
            Done
        </Button>
      </div>
    );
  }
  return (
    <div>
        {
        isTrasactionSuccess ? (
          <>
           <Lottie 
                options={defaultOptions}
                  height={70}
                  width={70}
                  style={{ marginTop: '1px' }}
                />
           {renderTransactionDetails()}
          </>
         
        ): (
          <form onSubmit={formik.handleSubmit}>
          <label htmlFor="remarks">Receiver N-pay Id</label>
       <Input
         id="npayIdReceiver"
         placeholder="Receiver N-pay Id"
         name="npayIdReceiver"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.npayIdReceiver}
       />
       {formik.errors?.npayIdReceiver}
       <label htmlFor="amount">Amount</label>
       <Input
         id="amount"
         name="amount"
         placeholder="Amount"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.amount}
       />
            {formik.errors?.amount}
       <label htmlFor="remarks">Remarks</label>
       <Input
         id="remarks"
         name="remarks"
         placeholder="Remarks"
         onChange={formik.handleChange}
         value={formik.values.remarks}
       />
         {formik.errors?.remarks}
       <Button className="bg-green-300" type="submit">Submit</Button>
     </form>
        )
      }
    </div>

  );
};
const Transactions = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return <div className="flex m-12">
        <Card className="w-[30%] m-2">
          <CardBody onClick={onOpen}>
            <CgDollar/>
            Send Money
          </CardBody>
        </Card>
        <Card className="w-[30%] m-2">
          <CardBody>
            <CgDollar/>
            Request Money
          </CardBody>
        </Card>
        <Card className="w-[30%] m-2">
          <CardBody>
            <BillsModal/>
          </CardBody>
        </Card>

         <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Send Money</ModalHeader>
              <ModalBody>
               <SendMoneyForm/>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>


  </div>;
};

export default Transactions;

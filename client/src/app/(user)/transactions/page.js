"use client";

import { Card, CardBody, Input } from "@nextui-org/react";
import React from "react";
import { CgDollar } from "react-icons/cg";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { useFormik } from 'formik';
import * as Yup from 'yup'
const SendMoneyForm = () => {
 
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
      console.log(values)
    },
  });
  return (
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
            Bills Payment
          </CardBody>
        </Card>

         <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
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

import React, { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import axios from "axios";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

export default function BillsModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = useState("inside");



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
                  <Card className="max-w-[290px]">
                    <CardHeader className="flex gap-3">
                    <p>Merchant name: {item.merchantName}</p> 
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                    <p>Merchant number: {item.merchantPhoneNumber}</p> <br/>
                    <p>Service Charge: {item.merchantServiceCharge}</p> 
                    </CardBody>
                  </Card>
                )
                })}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

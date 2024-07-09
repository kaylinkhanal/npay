'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import { useSelector } from 'react-redux';
import {DateRangePicker} from "@nextui-org/react";
import {getLocalTimeZone, parseDate, today} from "@internationalized/date";


const page = () => {
  const dataOfUser = useSelector((state) => state.user);
  const [statementList, setStatementList] = useState([])
  useEffect(() => {
    checkStatements()

  }, []);
  const checkStatements = async ()=> {
    const {data} =await axios.get(`${process.env.NEXT_PUBLIC_API_URL}statements/${dataOfUser.userDetails.phoneNumber}`)
   setStatementList(data)
   }

  return (
      <div className='p-4 m-3'>
       <div className="m-2 p-4 shadow-lg rounded-lg bg-white">
  <div className="flex flex-col md:flex-row p-2 m-2">
    <div className="flex-col p-4 m-2 bg-gray-100 rounded-lg">
      <h2 className="font-bold text-lg mb-2">User Information</h2>
      <p><strong>Phone Number:</strong> {dataOfUser.userDetails.phoneNumber}</p>
      <p><strong>Full Name:</strong> {dataOfUser.userDetails.fullName}</p>
      <p><strong>Email Id:</strong> {dataOfUser.userDetails.email}</p>
      <p><strong>Gender:</strong> {dataOfUser.userDetails.gender}</p>
    </div>
    <div className="flex-col p-4 m-2 bg-gray-100 rounded-lg">
      <h2 className="font-bold text-lg mb-2">Account Information</h2>
      <p><strong>KYV Verified Status:</strong> {dataOfUser.kycVerifiedStatus}</p>
      <p><strong>Opening Balance:</strong> {dataOfUser.userDetails.openingBalance}</p>
      <p><strong>Closing Balance:</strong> {dataOfUser.userDetails.totalBalance}</p>
    </div>
  </div>
  <div className="w-full max-w-xl flex flex-col gap-4 mt-4">
    <h3 className="font-bold text-lg">Select Date Range for Statement</h3>
    <DateRangePicker
      label="Date Range for Statement"
      maxValue={today(getLocalTimeZone())}
      defaultValue={{
        start: today(getLocalTimeZone()).subtract({ days: 1 }),
        end: parseDate("2024-04-08"),
      }}
    />
  </div>
  <h1 className="font-bold text-2xl mt-6">Statement</h1>
</div>
      <Table aria-label="Statement of the transaction">
      <TableHeader>
        <TableColumn>DATE/TIME</TableColumn>
        <TableColumn>DESCRIPTION</TableColumn>
        <TableColumn>CREDIT</TableColumn>
        <TableColumn>DEBIT</TableColumn>
        <TableColumn>SERVICE CHARGE</TableColumn>
        <TableColumn>AMOUNT</TableColumn>
      </TableHeader>
      <TableBody>
       
       {statementList.length>0 && statementList.map((item)=>{
        return (
          <TableRow key="1">
          <TableCell>{item.updatedAt}</TableCell>
          {
            dataOfUser.userDetails.phoneNumber == item.receiver 
             ? <TableCell>Deposited By: {item.sender} Remarks:{item.remarks}</TableCell> 
               : <TableCell> Transfer To: {item.receiver} Remarks:{item.remarks}</TableCell>
          }
          {
            dataOfUser.userDetails.phoneNumber == item.receiver 
             ? <TableCell>{item.amount}</TableCell> 
               : <TableCell>-</TableCell>
          }
          {
            dataOfUser.userDetails.phoneNumber == item.sender 
             ? <TableCell>{item.amount}</TableCell> 
               : <TableCell>-</TableCell>
          }
          {
            dataOfUser.userDetails.phoneNumber == item.sender 
             ? <TableCell>{item.transactionServiceChargre}</TableCell> 
               : <TableCell>-</TableCell>
          }
          {
            dataOfUser.userDetails.phoneNumber == item.receiver 
             ? <TableCell>{item.remainingAmountReceiver}</TableCell> 
               : <TableCell>{item.remainingAmountSender}</TableCell>
          }
        </TableRow>
        )
       })}
    
    </TableBody>
    </Table>
      </div>
  )
}

export default page
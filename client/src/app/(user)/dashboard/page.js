"use client";

import { Card, CardBody } from "@nextui-org/react";
import React, {useEffect} from "react";
import { CgDollar } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { BsGraphUpArrow ,BsGraphDownArrow  } from "react-icons/bs";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { setUserKycVerifiedStatus } from "@/redux/reducerSlices/userSlice";

const page = () => {
  const dispatch = useDispatch()
  const copylink = (e) => {
    toast.success("Number Copied");
    navigator.clipboard.writeText(userDetails.phoneNumber);
  };
  useEffect(() => {
    checkKycStatus()
  }, []);
  
  const checkKycStatus = async ()=> {
   const {data} =await axios.get(`http://localhost:4000/kyc-status/${userDetails._id}`)
    dispatch(setUserKycVerifiedStatus(data.kycVerifiedStatus))
  }
  const { userDetails } = useSelector((state) => state.user);
  return (
    <div className="grid grid-cols-4 ">
      <div className="col-span-3">
        <div className="flex text-2xl m-6 p-2">
          <div className="font-mono font-extrabold grid grid-cols-2 text-green-400">
            {" "}
            <p className="px-1 text-black">Hello, </p> {userDetails.fullName}
          </div>
        </div>
        <section className="text-gray-600 body-font ">
          <div className="container px-5  mx-auto ">
            <div className="flex flex-col text-center w-full mb-20">
              <Card className="p-4">
                <CardBody className="font-mono inline-grid grid-cols-2">
                  <span className="text-gray-400">Total Balance:</span>
                  <span className="text-gray-400">Npay ID:</span>
                  <span className="text-4xl font-extrabold text-green-500">
                    $ {userDetails.totalBalance}
                  </span>
                  <span
                    onClick={copylink}
                    className="text-4xl font-bold text-gray-800"
                  >
                    {userDetails.phoneNumber}
                  </span>
                </CardBody>
              </Card>
            </div>
    </div>
        </section>
        RECENT TRANSACTIONS
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                               Name
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Amount
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Type
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 w-10 h-10">
                                        <img className="w-full h-full rounded-full"
                                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                            alt="" />
                                    </div>
                                        <div className="ml-3">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                Vera Carpenter
                                            </p>
                                        </div>
                                    </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    Jan 21, 2020
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    43
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span
                                    className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                    <span aria-hidden
                                        className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                <span className="relative">Credit</span>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
                </div>
      </div>

      <div className="col-span-1 py-5">
      <p className="text-xl font-mono py-5">My Profile</p>

      <div className="max-w-sm mx-auto container m-2">
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-purple-200 rounded-md">
              <BsGraphUpArrow size={30}/>
            </div>
            
            <div>
              <div className="text-gray-600 text-sm">Income</div>
                <div className="text-gray-900 text-2xl font-semibold">
                  53453453
                </div>
            </div>
           </div>
         </div>
        </div>

        <div className="max-w-sm mx-auto m-2">
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-purple-200 rounded-md">
              <BsGraphDownArrow size={30}/>
            </div>
            
            <div>
              <div className="text-gray-600 text-sm">Expense</div>
                <div className="text-gray-900 text-2xl font-semibold">
                  53453453
                </div>
            </div>
           </div>
         </div>
        </div>  

      </div>
    </div>
  );
};

export default page;

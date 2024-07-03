"use client";

import { user } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  useEffect(() => {
    getKycList()
  }, []);
    const [kycList, setKycList] = useState([])
  const getKycList = async ()=> {
   const {data} =await axios.get(`${process.env.NEXT_PUBLIC_API_URL}user-kyc`)
   setKycList(data)
  }
   return (<div className="mx-10">
   

        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Fathers Name
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Date
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Amount
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            KYC status
                        </th>
                    </tr>
                </thead>
                <tbody>
                {kycList.length> 0 && kycList.map((item)=>{
               return( <tr>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 w-10 h-10">
                                    <img className="w-full h-full rounded-full"
                                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                        alt="" />
                                </div>
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {item.fathersName}
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
                            <span className="relative">
                            {item.kycVerifiedStatus}
                            </span>
                            </span>
                        </td>
                    </tr>)
                        })}
                </tbody>
            </table>
            </div>
            </div>

   </div>);
};

export default page;

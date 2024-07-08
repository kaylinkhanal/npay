'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react'




const page = () => {
  const [statementList, setStatementList] = useState([])
  useEffect(() => {
    checkStatements()

  }, []);
  const checkStatements = async ()=> {
    const {data} =await axios.get(`${process.env.NEXT_PUBLIC_API_URL}statements/6666`)
    setStatementList(data)
   }
  return (
    <div>
      statements here
       {statementList.length>0 && statementList.map((item)=>{
        return (
          <div className='p-2 m-2 shadow'>
            {item.receiver}
            <p>{item.remarks}</p>
          </div>
        )
       })}
    </div>
  )
}

export default page
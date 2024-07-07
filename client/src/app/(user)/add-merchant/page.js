'use client'
import React,{ useState, useEffect} from 'react';
import { useFormik } from 'formik';
import { Input} from '@nextui-org/react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { BsTrash2 } from 'react-icons/bs';
import * as Yup from 'yup';



const merchantForm = () => {
  const [merchantList, setMerchantList] = useState([])
  useEffect(()=>{
    fetchMerchants()
  },[])
  const fetchMerchants = async()=>{
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}merchant`)
    setMerchantList(data)
  }
  const merchantDetails= [
    {name:'merchantName', label:'Merchant Name'},
    {name:'merchantPhoneNumber', label:'Phone Number'}, 
    {name:'merchantServiceCharge', label:'Service Charge'} 
  ]

  const formik = useFormik({
    initialValues: {
        merchantName:'',
        merchantPhoneNumber: '',
        merchantServiceCharge:''
    },
    onSubmit: async (values) => {
     await submitMerchant(values)
    },
  });
const deleteItem =async(id)=>{
const {data} = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}merchant/`+id)
if(data){
    fetchMerchants()
}
}
  const submitMerchant = async(values) => {
    let formData = new FormData(); 
    formData.append('merchantName', values.merchantName); 
    formData.append('merchantPhoneNumber', values.merchantPhoneNumber);
    formData.append('merchantServiceCharge', values.merchantServiceCharge);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
  };
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}merchant`, requestOptions);
  const data = await response.json()
  if(response.status== '200'){
    toast.success(data.msg)
    fetchMerchants()
    formik.resetForm()
  }
  else{
    toast.error(data.msg)
  }
  }

  return (
    <form className='m-4 flex flex-col border shadow-md rounded-lg p-4' onSubmit={formik.handleSubmit}>
     <h1 className='text-4xl text-green-300'>Add Merchant</h1>
     {merchantDetails.map((item)=>{
      return (
        <div>
           <label htmlFor={item.name}>{item.label}</label>
      <Input
        id={item.name}
        name={item.name}
        type="text"
        onChange={formik.handleChange}
        isRequired
        value={formik.values[item.name]}
      />
        </div>
      )
     })}
     
      <button className='bg-green-500 text-white rounded p-2 my-4 w-[20%]' type="submit">Submit</button>

      {merchantList.length> 0 && merchantList.map((item)=>{
      return (
        <div className='p-2 m-2 shadow-lg'>{item.merchantName}
          <BsTrash2 onClick={()=>deleteItem(item._id)}/>
        </div>
      )
     })}
    </form>
  );
};


export default merchantForm
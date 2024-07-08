'use client'
import React,{ useState, useEffect} from 'react';
import { useFormik } from 'formik';
import { Input} from '@nextui-org/react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { BsTrash2 } from 'react-icons/bs';
import * as Yup from 'yup';
import CreatableSelect from 'react-select/creatable';



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
    {name:'merchantServiceCharge', label:'Service Charge'},
    {name:'merchantFields', label:'Merchant Fields', type:'multi'},

  ]
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState([]);

  const handleKeyDown= (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setValue((prev) => [...prev, createOption(inputValue)]);
        setInputValue('');
        event.preventDefault();
    }
  };
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
    debugger;
    values.merchantFields= value

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
  const components = {
    DropdownIndicator: null,
  };
  const createOption = (label) => ({
    label,
    value: label,
  });
  
  return (
    <form className='m-4 flex flex-col border shadow-md rounded-lg p-4' onSubmit={formik.handleSubmit}>
     <h1 className='text-4xl text-green-300'>Add Merchant</h1>
     {merchantDetails.map((item)=>{
      if(item.type === 'multi'){
     return   (
     <div>
                <label htmlFor={item.name}>{item.label}</label>
                <CreatableSelect
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={(newValue) => setValue(newValue)}
        onInputChange={(newValue) => setInputValue(newValue)}
        onKeyDown={handleKeyDown}
        placeholder="Type something and press enter..."
        value={value}
      />
     </div>
    )
      }
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
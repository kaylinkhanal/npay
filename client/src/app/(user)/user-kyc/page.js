'use client'
import React,{useState} from 'react';
import { useFormik } from 'formik';
import { Input, Radio, RadioGroup } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const UserKyc = () => {
  const userDetailsKyc= [
    {name:'email', label:'Email'},
     {name:'fullName', label:'Full Name'}, 
     {name:'phoneNumber', label:'Phone  Number'},  
         {name:'gender', label:'Gender' , radioOption:['male','female','other'], type:'radio'}, 
        //  {name:'isVerified', label:'Is Verified' , radioOption:['Yes', 'No'], type:'radio'}, 
         {name:'dob', label:'Date Of Birth'}, 
         {name:'fathersName', label:'Fathers Name'}, 
         {name:'citizenshipNumber', label:'Citizenship Number'}, 
         {name:'permanentAddress', label:'Permanent Address'}, 
         {name:'temporaryAddress', label:'Temporary Address'}, 
         {name:'panNumber', label:'Pan Number'}, 

  ]
 const {userDetails} = useSelector(state=>state.user)
 const {email,fullName,gender,phoneNumber,_id } = userDetails

  const formik = useFormik({
    initialValues: {
      email: email,
      fullName: fullName,
      gender: gender,
      phoneNumber: phoneNumber,
      dob: '',
      fathersName: '',
      citizenshipNumber: '',
      permanentAddress: '',
      temporaryAddress: '',
      panNumber: ''
    },
    onSubmit: values => {
      submitUserKyc(values)
    },
  });

  const submitUserKyc = async(values) => {

    let formData = new FormData(); 
    formData.append('dob', values.dob); 
    formData.append('fathersName', values.fathersName);
    formData.append('citizenshipNumber', values.citizenshipNumber);
    formData.append('permanentAddress', values.permanentAddress);
    formData.append('temporaryAddress', values.temporaryAddress);
    formData.append('userId', _id);
    formData.append('panNumber', values.panNumber);
    formData.append('citizenshipPhoto', image);

    

    const requestOptions = {
      method: 'POST',
      body: formData
  };
  const response = await fetch('http://localhost:4000/user-kyc', requestOptions);
  const data = await response.json()
  if(data.msg){
    toast(data.msg)
  }
  }

  const [image, setImage] = useState(null)
  return (
    <form className='m-4 flex flex-col border shadow-md rounded-lg p-4' onSubmit={formik.handleSubmit}>
     {userDetailsKyc.map((item)=>{
      if(item.type ==='radio'){
        return (
          <RadioGroup
          label={item.label}
          name={item.name}
          type={item.type}
          onChange={formik.handleChange}
        >{
          item.radioOption.map((val)=>{
            return (
              <Radio value={val}>{val}</Radio>
            )
          })
        }
       
        </RadioGroup>
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
        value={formik.values[item.name]}
      />
        </div>
      )
     })}

     <input  type="file" onChange={(e)=>setImage(e.target.files[0])}/>
      

     
      <button className='bg-green-500 text-white rounded p-2 my-4 w-[20%]' type="submit">Submit</button>
    </form>
  );
};


export default UserKyc
'use client'
import React,{ useState} from 'react';
import { useFormik } from 'formik';
import { Input, Radio, RadioGroup } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import { Editor } from "react-draft-wysiwyg";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";



const UserKyc = () => {

  const userDetailsKyc= [
    {name:'productName', label:'Product Name'},
     {name:'productPrice', label:'Product Price'}, 
     {name:'productDescription', label:'Product  Description', type:'editor'},  
      {name: 'productCategory', label: 'Product Category'}

  ]
 const {userDetails} = useSelector(state=>state.user)
 const {email,fullName,gender,phoneNumber,_id } = userDetails

  const formik = useFormik({
    initialValues: {
      productName:'',
      productPrice: '',
      productDescription:'',
      productCategory: ''
    },
    onSubmit: values => {
      submitUserKyc(values)
    },
  });

  const submitUserKyc = async(values) => {
    let formData = new FormData(); 
    formData.append('productName', values.productName); 
    formData.append('productPrice', values.productPrice);
    formData.append('productDescription', values.productDescription);
    formData.append('productCategory', values.productCategory);
    formData.append('productImage', image);

    const requestOptions = {
      method: 'POST',
      body: formData
  };
  const response = await fetch('http://localhost:4000/products', requestOptions);
  const data = await response.json()
  if(data.msg){
    toast(data.msg)
  }
  }
  const [editorText, setEditorText]= useState(null)
 debugger;
  const [image, setImage] = useState(null)
  return (
    <form className='m-4 flex flex-col border shadow-md rounded-lg p-4' onSubmit={formik.handleSubmit}>
     <h1 className='text-4xl text-green-300'>Add Products</h1>
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
      }else if(item.type === 'editor'){
        return (
          <Editor
          editorState={editorText}
          toolbarClassName="toolbarClassName"
          
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={(x)=>setEditorText(x)}
        />
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
'use client'
import { MapContainer, TileLayer,Marker, Popup, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css";

import React from 'react'
import { Input } from '@nextui-org/react';
import { iconPickup } from './icon';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { changePickUpAddress } from '@/redux/reducerSlices/locationSlice';
const AmbulanceRequestForm = ()=>{
    const dispatch = useDispatch()

    const {pickUpName} = useSelector(state=>state.location)
    return (
        <div>
            <Input value={pickUpName} onChange={(e)=>    dispatch(changePickUpAddress(e.target.value))} placeholder='Search PickUp Adress'/>
        </div>
    )
}
const hospitalList = [
    {
      name: 'Kantipur hospital',
      latlng: [27.685404, 85.64830]
    },
      {
      name: 'Kantipur hospital',
      latlng: [27.685404, 85.44839]
    },
      {
      name: 'Kantipur hospital',
      latlng: [27.685404, 85.734]
    }
  ]

const Maps = () => {
    const dispatch = useDispatch()
    const handleDrag = async(e)=>{
        const {lat,lng} = e.target._latlng
        const {data} =await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=490f9173e6a6441b98f94295be7b750d`)
        dispatch(changePickUpAddress(data.results[0].formatted))
        }
  return (
    <MapContainer center={[27.5,  83.45]} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <div style={{position:'absolute', zIndex:999, top:10, left:50}}>
    <AmbulanceRequestForm/>
    </div>
    <Marker
    eventHandlers={{
        dragend: handleDrag
    }}
    draggable={true} position={[27.5,83.45]} icon={iconPickup}>
    </Marker>
    {hospitalList.map((item,id)=>{
return( <Marker key={id}
    position={item.latlng} icon={iconPickup}>
 </Marker>)
    })}
   
  </MapContainer>
  )
}

export default Maps
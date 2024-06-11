'use client'
import React from "react";
import {Listbox, ListboxItem} from "@nextui-org/react";
import {cn} from "@nextui-org/react";
import { GenIcon } from "react-icons";
import { CgProfile } from "react-icons/cg";
import sideBarItems from '@/config/sideBarItems.json'
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";


export const ItemCounter = ({number}) => (
    <div className="flex items-center gap-1 text-default-400">
      <span className="text-small">{number}</span>
        <GenIcon/>
    </div>
  );
  


export const IconWrapper = ({children, className}) => (
    <div className={cn(className, "flex items-center rounded-small justify-center w-7 h-7")}>
      {children}
    </div>
  );
export default function SideBar() {
const {userDetails
}=  useSelector(state=>state.user)
  console.log(sideBarItems)
  const router = useRouter()
  return (
    <Listbox
      aria-label="User Menu"
      onAction={(key) => router.push(key)}
    
      className={`p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 ${userDetails.role=='admin' ?'bg-[#034CAD]': 'bg-green-500' }  max-w-[600px]  text-white overflow-visible shadow-small rounded-medium m-2`}
      itemClasses={{
        base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
      }}
    >
      {
     sideBarItems[userDetails?.role] && sideBarItems[userDetails?.role].map((item)=>{
        return (
          <ListboxItem
          key={item.link}
        
          startContent={
            <IconWrapper className="bg-success/10 text-success bg-white" >
             <CgProfile/>
            </IconWrapper>
          }
        >
       {item.name}
        </ListboxItem>
        )
      })
      }
   
     
    </Listbox>
  );
}

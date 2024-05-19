import React from 'react'

const CustomCard = (props) => {
  return (
    <div className='m-4 p-4 shadow-lg'>
        {props.expenditureToday}
    </div>
  )
}

export default CustomCard
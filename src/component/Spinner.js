import React from 'react'
import loading from './spinner.gif'
const Spinner= ()=> {

    return (
      <div className='text-center my-3'>
        <img className='my-3' src={loading} alt="Loading "  />
      </div>
    )
  
}
export default Spinner
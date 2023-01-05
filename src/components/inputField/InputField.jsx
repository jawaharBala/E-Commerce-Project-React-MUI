import React from 'react'
import './InputField.css'

const InputField = () => {
  return (
    <div>
        {/* <label>Enter your Task</label> */}
        <input placeholder='Enter your Task' type ='text'></input>
        <button>Add</button>
    </div>

  )
}

export default InputField;

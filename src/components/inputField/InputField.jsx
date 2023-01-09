import React from 'react';
import './InputField.css';
import { useState } from 'react';


const InputField = () => {
  const  [inputString,setInputString] = useState('');
  const [addString, setAddString] = useState([]);
  const handleChange = (event) => {
     setInputString(event.target.value);
   
  }
  const handleClick = (event)=>{
   setAddString([...addString,inputString]);
    console.log(addString)

  }

  return (
    <div>
        {/* <label htmlFor='input'>Enter your Task</label> */}
        <input onChange={handleChange} placeholder='Enter your Task' type ='text'></input>
        <button onClick={handleClick} >Add</button>
        {addString.map((elem, index)=>{
          return [<h2 key={index}>{elem}</h2>,
                  <h2 key={index+1}>{elem}</h2>]
        } 

        )}
    </div>

  )
}

export default InputField;

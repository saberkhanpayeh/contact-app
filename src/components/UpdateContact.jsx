import { useEffect, useState } from "react";
import inputs from "../constants/inputs";
import styles from"./UpdateContact.module.css";
function UpdateContact({contact,setContact,updateContact,setShowModal,setUpdateContact,dispatch}) {
  const [inputData,setInputData]=useState(updateContact);
  console.log(contact);
  const changeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
  //   console.log({name,value});
    setInputData(inputData=>({...inputData,[name]:value}));
  }
  const editContactHandler=()=>{
    dispatch("UPDATE");
    setShowModal("UPDATE");
    setContact(inputData);
  }
  console.log(contact);
  return (
    <div className={styles.container}>

      <div className={styles.form}>
      <div className={styles.cross}>
        <button onClick={()=>setUpdateContact(null)}>❌</button>
      </div>
        {inputs.map((input,index)=>(
      <input 
          key={index}
          type={input.type} 
          placeholder={input.placeholder} 
          name={input.name} 
          value={inputData[input.name]} 
          onChange={changeHandler}
      />))}
      <button onClick={()=>editContactHandler()}>Update Contact</button>
      </div>

    </div>
  )
}

export default UpdateContact
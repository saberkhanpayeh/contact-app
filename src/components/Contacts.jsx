import { useState,useReducer } from "react"
import ContactsList from "./ContactsList";
import inputs from "../constants/inputs";
import { v4 } from "uuid";
import Modal from "./Modal";
import UpdateContact from "./UpdateContact";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from "./Contacts.module.css";
import { initialContactValue, toastOptions } from "../constants/constantValues";
const initialState={message:"",alert:"",cancelBtn:"",confirmBtn:""}
const reducer=(state,action)=>{
    switch(action)
    {
        case "DELETE":
        return{
            message:"You are Already want to remove contacts!",
            alert:"Are you Sure?",
            cancelBtn:"cancel",
            confirmBtn:"confirm"
        }
        case "UPDATE":
            return{
                message:"You are Already want to Update Contact Information",
                alert:"Are you Sure?",
                cancelBtn:"cancel",
                confirmBtn:"Update"
            }
        default:throw new Error("Envalid Action");
    }
}
function Contacts() {
    const[state,dispatch]=useReducer(reducer,initialState);
    const[alert,setAlert]=useState("");
    const[contacts,setContacts]=useState([]);
    const[showModal,setShowModal]=useState("");
    const[updateContact,setUpdateContact]=useState();
    const[contact,setContact]=useState(initialContactValue);
    const[data,setData]=useState(contact);
    const changeHandler=(event)=>{
      const name=event.target.name;
      const value=event.target.value;
    //   console.log({name,value});
      setContact(contact=>({...contact,[name]:value}));
    }
    const addHandler=()=>{
        if(!contact.name || !contact.lastName || !contact.email || !contact.phone)
        {
            setAlert("Please Enter Valid data!!!");
            return;
        }
        setAlert("");
        const newContact={...contact,id:v4()};
        setContacts((contacts)=>([...contacts,newContact]));
        console.log(contacts);
        setContact(initialContactValue);
        toast.info("sucess adding", toastOptions);
    }
    const updateHandler=()=>{
        console.log(contact.id);
        const newContacts=contacts.filter((item)=>item.id!==contact.id);
        setContacts([...newContacts,contact]);
        setContact(initialContactValue);
        setShowModal("");
        toast.success("The Update Infromation User Was Success!",toastOptions);
    }
    const deleteHandler=(id)=>{
        const newContacts=contacts.filter((contact)=>contact.id!==id);
        setContacts(newContacts);
    }
    const selectContactHandler=(id)=>{
    const newContacts=contacts.map((contact)=>{
        if(contact.id===id)
        {
            return {...contact,select:!contact.select}
        }
        else{
            return contact;
        }
    })
    setContacts(newContacts);
    console.log(contacts);  
    }
    const groupDeleteHandler=()=>{
        console.log("Group Delete");
        const newContacts=contacts.filter((contact)=>!contact.select);
        const counterContactRemove=contacts.length-newContacts.length;
        setContacts(newContacts);
        setShowModal("");
        toast.info(`"${counterContactRemove}" contact has removed!`);

    }
  return (
    <div className={styles.container}>
        <div className={styles.form}>
        
            {inputs.map((input,index)=>(
            <input 
                key={index}
                type={input.type} 
                placeholder={input.placeholder} 
                name={input.name} 
                value={contact[input.name]} 
                onChange={changeHandler}
            />))}
            <button onClick={addHandler}>Add Contact</button>
        </div>
        <div className={styles.alert}>
            {alert&&<p>{alert}</p>}
        </div>
        <ContactsList contacts={contacts} deleteHandler={deleteHandler} selectContactHandler={selectContactHandler} setShowModal={setShowModal} dispatch={dispatch} setUpdateContact={setUpdateContact}/>
        {
            showModal==="DELETE" ? (<Modal showModal={showModal} setShowModal={setShowModal} functionHandler={groupDeleteHandler} state={state}/>):null
        }
        {
            !!updateContact&&(<>
                <UpdateContact contact={contact} setContact={setContact} updateContact={updateContact}  setShowModal={setShowModal} setUpdateContact={setUpdateContact} dispatch={dispatch}/>
                {showModal==="UPDATE"? (<Modal showModal={showModal} setShowModal={setShowModal} functionHandler={updateHandler} state={state}/>):null }
                </>)
        }
        <ToastContainer progressClassName={styles.toast} />
    </div>
  )
}

export default Contacts
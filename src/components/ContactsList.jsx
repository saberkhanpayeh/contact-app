import { useState } from "react";
import ContactItem from "./ContactItem";
import styles from "./ContactsList.module.css";
import { FaUserCheck } from "react-icons/fa6";
function ContactsList({contacts,deleteHandler,selectContactHandler,setShowModal,dispatch,setUpdateContact}) {
    // console.log(contacts);
  const [showGroupDelete,setShowGroupDelete]=useState(false);
  const deleteListHandler=()=>{
    dispatch("DELETE");
    setShowModal("DELETE");
  }
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <h3>
                Contacts List
            </h3>         
            {
                showGroupDelete && contacts.length?(
                    <div className={styles.selected}>
                        <button onClick={()=>setShowGroupDelete(false)}>🔙</button>
                        <button onClick={deleteListHandler}>🗑️</button>
                    </div>):(<button onClick={()=>setShowGroupDelete(true)}><FaUserCheck/> </button>)
            }

        </div>

        {contacts.length?(<ul className={styles.contacts}>
            {
                contacts.map((contact)=><ContactItem key={contact.id} data={contact} deleteHandler={deleteHandler} selectContactHandler={selectContactHandler} showGroupDelete={showGroupDelete} setUpdateContact={setUpdateContact}/>)
            }
        </ul>):(<p className={styles.message}>No Contacts Yet!</p>)}

    </div>
  )
}

export default ContactsList
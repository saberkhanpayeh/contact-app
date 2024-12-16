import { useState } from "react";
import styles from "./ContactItem.module.css";
import { TfiMenuAlt } from "react-icons/tfi";
import { FaTrashCan } from "react-icons/fa6";
import { MdEditSquare } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";

function ContactItem({data,deleteHandler,selectContactHandler,showGroupDelete,setUpdateContact}) {
 const [showMenue,setShowMenue]=useState(false);
    console.log(data);
  return (
    <li className={styles.item}>
    <p>
        {data.name} {data.lastName}
    </p>
    <p>
        <span>📭</span> {data.email}
    </p>
    <p>
        <span>📞</span> {data.phone}
    </p>
    {
      !!showGroupDelete &&(
      <p>
        <input type="checkbox" checked={data.select} onChange={()=>selectContactHandler(data.id)} />
      </p>)
    }
  
    <div className={styles.btn}>
      {
        showMenue ?( <>
                <button onClick={()=>deleteHandler(data.id)}><FaTrashCan /></button>
                <button onClick={()=>setUpdateContact(data)}><MdEditSquare/></button>
                <button onClick={()=>setShowMenue(false)}><IoCloseCircle/></button>
        </>):(<button onClick={()=>setShowMenue(true)}><TfiMenuAlt/></button>)
      }
      
    
    </div>
    
    </li>
  )
}

export default ContactItem
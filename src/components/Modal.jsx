
import styles from "./Modal.module.css";
function Modal({setShowModal,functionHandler,state}) {
  return (
    <div className={styles.container}>
        <div className={styles.message}>
            <p>{state.message}</p>
            <p>{state.alert}</p>
        </div>
        <div className={styles.btn}>
          <button onClick={()=>setShowModal("")}>{state.cancelBtn}</button>
          <button onClick={functionHandler}>{state.confirmBtn}</button>
        </div>

    </div>
  )
}

export default Modal
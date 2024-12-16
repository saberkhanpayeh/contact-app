import React from 'react'
import styles from"./Header.module.css"

function Header() {
  return (
    <div className={styles.container}>
        <h1>Contact App</h1>
        <p>
            <a href="#">Wise Coding</a> | Expermential React.js
        </p>
    </div>
  )
}

export default Header
// import React from 'react'


import "../assets/css/AppHeader.css"
import UploadButton from "./UploadButton"


function AppHeader() {

  return (
    <header>
        <h1 className='text-black'>Harris Personal Media Server</h1>
        <UploadButton/>
    </header>
  )
}

export default AppHeader
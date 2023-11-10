import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Back from '../components/Back/Back'
import Input from '../components/Input/Input'
import Chart from '../components/Chart/Chart'

const DisposablePage = () => {
  const [ selectedFile, setSelectedFile ] = useState(null)

  return (
    <>
      <Back />
      {!selectedFile && <Input setSelectedFile={setSelectedFile} />}
      {selectedFile && <Chart selectedFile={selectedFile} />}
    </>
  )
}

export default DisposablePage
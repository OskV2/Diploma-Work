import React, { useState, useEffect, useRef } from 'react'

// Styles
import './Input.scss'

// Components
import Button from '../Button/Button'

// Assets
import cloudIcon from '../../img/upload.svg'
import errorIcon from '../../img/error.svg'
import okIcon from '../../img/ok.svg'

const Input = ({ setSelectedFile }) => {
  const [chosenFile, setChosenFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (dragActive) {
      setError(null);
      setChosenFile(null);
    }
  }, [chosenFile, dragActive, error]);

  function handleFile(files) {
    if (files && files[0]) {
      const file = files[0];
      setChosenFile(file);
    }
  }
  
  // handle drag events
  //this basically changes styling of form when user drags file into form
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  // triggers when file is dropped but i have no idea what happens when i drop multiple files cause it doesnt throw an error and it also doesnt set any file
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length === 1) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.name.endsWith('.xlsx')) {
        handleFile([droppedFile]);
      } else {
        setError('Plik musi być rozszerzenia .xlsx')
      }
    } else if (e.dataTransfer.files.length > 1) {
      setError('Możesz przesłać maksymalnie jeden plik')
    }
  };
  
  // triggers when file is selected with click
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files);
    }
  };

  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const setInputHeader = () => {
    if (chosenFile) {
      return (
        <div className='input__header'>
          <img className='input__img' src={okIcon} alt="Ok icon" />
          <h1 className='input__title input__title--ok'>Wybrany plik: {chosenFile.name}</h1>
        </div>
      )
    } else if (error) {
      return (
        <div className='input__header'>
          <img className='input__img' src={errorIcon} alt="Error icon" />
          <h1 className='input__title input__title--error'>Wystąpił błąd: {error}</h1>
        </div>
      )
    } else {
      return (
        <h1 className='input__title'>Prześlij plik</h1>
      )
    }
  }

  const handleDrawChart = () => {
    if (chosenFile && chosenFile.name.endsWith('.xlsx')) {
      setSelectedFile(chosenFile); // Set the selected file in the parent component
    } else {
      setChosenFile(null)
      setError('Plik musi być rozszerzenia .xlsx')
    }
  };
  
  return (
    <>
    {setInputHeader()}
    <form className='input__form' onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
      <input className='input__input' ref={inputRef} type="file" accept=".xlsx" multiple={false} onChange={handleChange} />
      <label className={dragActive ? "input__label dragging" : "input__label" } data-testid="label-file-upload-test" id="label-file-upload" htmlFor="input-file-upload">
        <div className='input__content'>
          <img src={cloudIcon} alt="Cloud-icon" height="150"/>
          <p>Przeciągnij i upuść plik tutaj lub</p>
          <Button primary={true} onClick={onButtonClick} >Prześlij plik</Button>
        </div> 
      </label>
      { dragActive && <div className='input__drag' onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
    </form>
    <div className="input__controls">
      <Button primary={false} disabled={chosenFile ? false : true} onClick={handleDrawChart}>Rysuj wykres</Button>
    </div>
    </>
  );
}

export default Input
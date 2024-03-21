import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

//  Actions for redux
import { inputActions } from '../../store/input'

// Styles
import './Input.scss'

// Components
import Button from '../Button/Button'

// Assets
import cloudIcon from '../../img/upload.svg'
import errorIcon from '../../img/error.svg'
import okIcon from '../../img/ok.svg'

const Input = () => {
  const dispatch = useDispatch();

  const file = useSelector(state => state.input.file)
  const dragActive = useSelector(state => state.input.dragActive)
  const error = useSelector(state => state.input.error)
  const header = useSelector(state => state.input.header)

  const inputRef = useRef(null);

  function handleFile(passedFile) {
    if (passedFile) {
      dispatch(inputActions.setFile(passedFile))
    }
  }
  
  //  handle drag events
  //  this basically changes styling of form when user drags file into form
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      dispatch(inputActions.setDragActive(true))
    } else if (e.type === "dragleave") {
      dispatch(inputActions.setDragActive(false))
    }
  };
  
  //  triggers when file is dropped
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(inputActions.setDragActive(false))

    if (!e.dataTransfer.files || e.dataTransfer.files.length !==1 ) {
      dispatch(inputActions.setError('Możesz przesłać maksymalnie jeden plik'))  
      return
    }
    console.log('File passed first if statement')
    const droppedFile = e.dataTransfer.files[0];

    if (!droppedFile.name.endsWith('.xlsx')) {
      dispatch(inputActions.setError('Plik musi być rozszerzenia .xlsx'))
      return
    }

    handleFile(droppedFile)
  };
  
  //  triggers when file is selected with click
  const handleChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0]

    if (!file.name.endsWith('.xlsx')) {
      dispatch(inputActions.setError('Plik musi być rozszerzenia .xlsx'))
      dispatch(inputActions.setHeader('error'))
      dispatch(inputActions.setFile(null))
      return
    }

    handleFile(file);
  };

  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const setInputHeader = () => {
    if (header === 'file') {
      return (
        <div className='input__header'>
          <img className='input__img' src={okIcon} alt="Ok icon" />
          <h1 className='input__title input__title--ok'>Wybrany plik: {file.name}</h1>
        </div>
      )
    } else if (header === 'error') {
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

  useEffect(() => {
    if (file) {
      dispatch(inputActions.setHeader('file'));
    } else if (error) {
      dispatch(inputActions.setHeader('error'));
    } else {
      dispatch(inputActions.setHeader('default'));
    }
    setInputHeader()
  }, [file, error]);

  useEffect(() => {
    if (dragActive) {
      dispatch(inputActions.setHeader('default'))
      dispatch(inputActions.setError(null))
      dispatch(inputActions.setFile(null))
    }
  }, [dragActive]);

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
    </>
  );
}

export default Input
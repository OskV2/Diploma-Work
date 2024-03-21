import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Back from '../components/Back/Back';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { parseExcel, convertObject } from '../store/data-actions';
import { inputActions } from '../store/input';

const InputPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const file = useSelector(state => state.input.file)

  const buttonClick = () => {
    parseExcel(file)
    .then(data => {
      dispatch(inputActions.setFileData(convertObject(data)))
    })
    .then(
      navigate("/input/display")
    )
    .catch(error => {
      console.error(error); // Handle error if any
      dispatch(inputActions.setError('Coś poszło nie tak.'))
    });
  }

  return (
    <>
      <Back />
      <Input />
      <div className="input__controls">
        <Button primary={false} disabled={file ? false : true} onClick={buttonClick}>Rysuj wykres</Button>
      </div> 
    </>
  );
};

export default InputPage;
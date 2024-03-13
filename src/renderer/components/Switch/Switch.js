import './Switch.scss';

const Switch = (props) => {
  return (
    <>
      <input
        checked={props.isOn}
        onChange={props.handleToggle}
        className="switch__checkbox"
        id={`switch_${props.id}`}
        type="checkbox"
      />
      <label className="switch__label" htmlFor={`switch_${props.id}`}>
        <p
          className={
            'switch__label__text ' +
            (props.isOn
              ? 'switch__label__text--left'
              : 'switch__label__text--right')
          }
        >
          {props.isOn ? props.textTwoBlack : props.textOneBlack}
        </p>
        <span className="switch__button">
          <p className="switch__button__text">
          {props.isOn ? props.textOneWhite : props.textTwoWhite}
          </p>
        </span>
      </label>
    </>
  );
};

export default Switch;
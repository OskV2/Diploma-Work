import { Switch } from '@headlessui/react'

import './Switch.scss';

const SwitchUI = (props) => {
  return (
    <Switch
      checked={props.enabled}
      onChange={props.onChange}
      className={`switch ${
        props.enabled ? 'switch--enabled' : 'switch--disabled'
      }`}
    >
      <span className="sr-only">{props.sr}</span>
      <span
        aria-hidden="true"
        className={`switch__span ${
          props.enabled ? 'switch__span--enabled' : 'switch__span--disabled'
        }`}
      />
    </Switch>
  );
};

export default SwitchUI;

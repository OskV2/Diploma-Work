import { Dialog } from '@headlessui/react';

import Close from '../../img/close.svg';
import './Modal.scss';

const Modal = (props) => {
  return (
    <>
      <Dialog
        className="modal"
        open={props.isOpen}
        onClose={props.onClose}
        id={props.id}
      >
        <div className='modal__backdrop' aria-hidden="true" />
        <div className="modal__div">
          <Dialog.Panel className="modal__dialog-panel">
            <img
              className="modal__close"
              onClick={props.onClose}
              src={Close}
              alt="Close"
            />
            {props.title && <Dialog.Title className='modal__title'>{props.title}</Dialog.Title>}
            {props.description && <Dialog.Description>{props.description}</Dialog.Description>}
            {props.children}
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default Modal;

import ReactDOM from "react-dom";

import "./Modal.scss";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClose}/>;
};

const ModalOverlay = (props) => {
  return (
    <div className="modal">
      <div className="modal__content">{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, document.getElementById("overlay"))}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, document.getElementById("overlay"))}
    </>
  );
};

export default Modal;

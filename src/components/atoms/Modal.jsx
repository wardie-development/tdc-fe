import PropTypes from "prop-types";
import './styles/Modal.css';

export const Modal = ({onClose, children, title, style={}}) => {
  return (
    <div className='modal'>
      <div className='modal__content' style={style}>
        <div className='contentBox'>
          <p className='contentBox__title'>{title}</p>
        </div>
        {children}
        <p className='contentBox__close' onClick={onClose}>Fechar</p>
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};

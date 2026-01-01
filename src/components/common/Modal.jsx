import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null);

  // 1. Handle keyboard events (ESC key to close) and body scroll lock
  useEffect(() => {
    if (isOpen) {
      // Lock scrolling on the body when the modal is open
      document.body.style.overflow = 'hidden';

      const handleEscape = (event) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      
      return () => {
        // Unlock scrolling and remove event listener when component unmounts or closes
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    } else {
      // Ensure scroll is unlocked if component state changes to closed
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  // Use a Portal to render the modal outside the main DOM flow (usually to body)
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        ref={modalRef} 
        // Stop clicks inside the modal from bubbling up to the overlay's onClick={onClose}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <header className="modal-header">
          <h3 id="modal-title">{title || "Modal"}</h3>
          <button 
            className="modal-close-button" 
            onClick={onClose} 
            aria-label="Close modal"
          >
            &times;
          </button>
        </header>
        
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>,
    // Target element where the modal should be rendered
    // Ensure you have a <div id="modal-root"></div> in your public/index.html
    document.getElementById('modal-root') || document.body 
  );
};

export default Modal;
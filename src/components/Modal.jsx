














import { useEffect, useId, useRef } from 'react';
import {
  ModalOverlay,
  ModalContent,
  ModalClose,
  ModalTitle,
  ModalBody,
} from '../styles/Modal.styles';







const Modal = ({ isOpen, onClose, title, children }) => {


  const contentRef = useRef(null);



  const closeRef = useRef(null);





  const triggerRef = useRef(null);




  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;



    triggerRef.current = document.activeElement;





    const focusTimer = setTimeout(() => {
      closeRef.current?.focus();
    }, 0);





    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {

        onClose();
        return;
      }

      if (e.key !== 'Tab') return;




      const focusable = Array.from(
        contentRef.current?.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {


        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {


        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };


    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);


    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';





      triggerRef.current?.focus();
    };
  }, [isOpen, onClose]);



  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (



    <ModalOverlay onClick={handleOverlayClick} aria-hidden="true">
      {}
      <ModalContent
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        {}
        <ModalClose ref={closeRef} onClick={onClose} aria-label="Close modal">
          &times;
        </ModalClose>

        {}
        <ModalTitle id={titleId}>{title}</ModalTitle>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;

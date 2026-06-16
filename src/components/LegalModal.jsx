import { useEffect } from 'react';
import {
  ModalOverlay,
  ModalContent,
  ModalClose,
  ModalTitle,
  ModalBody,
} from '../styles/Modal.styles';
import TermsOfServiceContent from './TermsOfServiceContent';
import PrivacyPolicyContent from './PrivacyPolicyContent';



const LegalModal = ({ type, onClose }) => {


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);


  if (!['terms', 'privacy'].includes(type)) {
    console.error(`LegalModal: invalid type "${type}". use 'terms' or 'privacy'.`);
    return null;
  }

  const title = type === 'terms' ? 'Terms of Service' : 'Privacy Policy';
  const ContentComponent = type === 'terms' ? TermsOfServiceContent : PrivacyPolicyContent;

  return (
    <ModalOverlay
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalClose onClick={onClose} aria-label={`Close ${title} modal`}>
          &times;
        </ModalClose>
        <ModalTitle id="legal-modal-title">{title}</ModalTitle>
        <ModalBody>
          <ContentComponent />
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LegalModal;

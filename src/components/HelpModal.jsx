















import Modal from './Modal';
import {


  HelpCircleSVG,
} from './SVGs';
import styled from 'styled-components';


const TitleRow = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// muted sub-heading that sits under the modal title (inside ModalBody)
const ModalSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.bodySm};
  color: ${({ theme }) => theme.colors.textTertiary};
  margin: 0 0 1.25rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
`;




const SECTIONS = [
  {
    id: 'security',
    title: 'General Access & Security',
    items: [
      {
        label: 'Session expiry',
        text: 'Tokens expire after 15 minutes; the system prompts you to log in again automatically.',
      },
      {
        label: 'Password storage',
        text: 'Passwords are hashed with bcrypt and are never stored in plain text.',
      },
      { label: 'Transport security', text: 'All data is transmitted over HTTPS.' },
      {
        label: 'Role-Based Access Control (RBAC)',
        text: 'Each user role sees only the modules they are permitted to access.',
      },
      {
        label: 'Credential safety',
        text: 'Never share your login credentials or active session links with others.',
      },
    ],
  },
  {
    id: 'attendees',
    title: 'For Attendees',
    items: [
      {
        label: 'Account creation',
        text: 'Sign up on the Sign Up page using your student email or institutional ID.',
      },
      {
        label: 'Portal',
        text: 'After login, your personalized schedule and registered events appear in the attendee portal.',
      },
      {
        label: 'QR check-in',
        text: 'Each session generates a unique QR code — present it to a Staff facilitator for check-in.',
      },
      { label: 'Attendance status', text: 'Status is recorded as Present, Late, or Absent.' },
      {
        label: 'Notifications',
        text: 'You receive an in-app notification confirming each successful check-in.',
      },
    ],
  },
  {
    id: 'staff',
    title: 'For Staff & Facilitators',
    items: [
      {
        label: 'QR Scanner',
        text: 'Open the QR Scanner page to scan attendee codes in real time.',
      },
      {
        label: 'Camera permissions',
        text: 'Enable camera access in your browser before starting a session.',
      },
      {
        label: 'Manual Override',
        text: 'If a code cannot be read, use Manual Override to log attendance by student ID or name.',
      },
      {
        label: 'Live Feed',
        text: 'Scan results appear instantly in the Live Feed without requiring a page refresh.',
      },
      {
        label: 'Scan feedback',
        text: 'A short audio tone and device vibration confirm each successful or failed scan.',
      },
    ],
  },
  {
    id: 'organizers',
    title: 'For Organizers & Admins',
    items: [
      {
        label: 'Event creation',
        text: 'Create events and add multiple sessions through the Create Event wizard.',
      },
      {
        label: 'Bulk upload',
        text: 'Upload attendee rosters via CSV or Excel (up to 10,000 records per batch).',
      },
      {
        label: 'Analytics',
        text: 'Analytics & Reporting provides session-level and event-level participation metrics.',
      },
      {
        label: 'Attendee Management',
        text: 'Edit, verify, and deactivate user accounts from the Attendee Management page.',
      },
      {
        label: 'Exports & PII',
        text: 'Exports are masked by default; Admin-level access is required to view full PII in reports.',
      },
    ],
  },
  {
    id: 'scope',

    title: 'System Scope & Current Limitations',
    items: [
      {
        label: 'No payments',
        text: 'Payment processing and paid ticketing are not currently supported.',
      },
      {
        label: 'Analytics scope',
        text: 'Advanced predictive analytics and AI-based modeling are out of scope for this release.',
      },
      {
        label: 'Web-only',
        text: 'The system is web-only; native iOS/Android applications are not available at this time.',
      },
      {
        label: 'Support',
        text: 'For technical issues, contact the EMS Development Team at ems-support@balagtas.sti.edu.ph.',
      },
    ],
  },
];


const HelpModal = ({ isOpen, onClose }) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={
      <TitleRow>
        <HelpCircleSVG size={22} aria-hidden="true" />
        Help &amp; Support
      </TitleRow>
    }
  >
    {}
    <ModalSubtitle>Quick reference guide — Event Management System</ModalSubtitle>

    {SECTIONS.map(({ id, title, items }) => (
      <div key={id}>
        {}
        <h4>{title}</h4>
        <ul>
          {items.map(({ label, text }) => (
            <li key={label}>
              <strong>{label}:</strong> {text}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </Modal>
);

export default HelpModal;

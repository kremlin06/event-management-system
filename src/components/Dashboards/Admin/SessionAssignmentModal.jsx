import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Button from '../../Button';
import * as S from '../../../styles/Dashboards/Admin/StepperFormModal.styles';
import { CloseSVG } from '../../SVGs';
import { assignToSessions } from '../../../services/attendee';
import { getSessions } from '../../../services/admin';

/**
 * Modal for assigning selected attendees to one or more sessions.
 *
 * Props:
 *   attendees  — array of { id, fullName, email } objects (pre-selected from list)
 *   eventId    — current event
 *   onClose    — function
 *   onSuccess  — function called after successful assignment
 */
const SessionAssignmentModal = ({ attendees = [], eventId, onClose, onSuccess }) => {
  const [sessions,       setSessions]       = useState([]);
  const [selectedSIds,   setSelectedSIds]   = useState(new Set());
  const [sessionsLoading,setSessionsLoading] = useState(false);
  const [submitting,     setSubmitting]     = useState(false);
  const [error,          setError]          = useState('');

  useEffect(() => {
    if (!eventId) return;
    setSessionsLoading(true);
    getSessions({ eventId, pageSize: 100 })
      .then(data => setSessions(data?.sessions || data?.rows || []))
      .catch(() => {})
      .finally(() => setSessionsLoading(false));
  }, [eventId]);

  // close on Escape
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const toggleSession = (id) => {
    setSelectedSIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleAssign = async () => {
    setError('');
    if (selectedSIds.size === 0) { setError('Select at least one session.'); return; }
    setSubmitting(true);
    try {
      const res = await assignToSessions(
        attendees.map(a => a.id),
        [...selectedSIds],
      );
      onSuccess?.(res);
    } catch (err) {
      setError(err?.response?.data?.error?.message || 'Assignment failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const modal = (
    <S.Overlay onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <S.ModalCard role="dialog" aria-modal="true" aria-labelledby="assign-modal-title"
        style={{ maxWidth: 480 }}>

        <S.ModalHeader>
          <S.ModalTitle>
            <h2 id="assign-modal-title">Assign to Sessions</h2>
            <p>
              {attendees.length} attendee{attendees.length !== 1 ? 's' : ''} selected
            </p>
          </S.ModalTitle>
          <S.CloseBtn onClick={onClose} aria-label="Close">
            <CloseSVG size={16} aria-hidden="true" />
          </S.CloseBtn>
        </S.ModalHeader>

        <S.ModalBody>
          {error && <S.FeedbackBanner $type="error" role="alert">{error}</S.FeedbackBanner>}

          {/* Attendee list (read-only summary) */}
          <S.FormGroup>
            <S.Label>Selected Attendees</S.Label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {attendees.slice(0, 5).map(a => (
                <span key={a.id} style={{
                  fontSize: '0.75rem',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  background: 'var(--bg-tertiary)',
                }}>
                  {a.fullName}
                </span>
              ))}
              {attendees.length > 5 && (
                <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>
                  +{attendees.length - 5} more
                </span>
              )}
            </div>
          </S.FormGroup>

          {/* Session picker */}
          <S.FormGroup>
            <S.Label>Choose Sessions</S.Label>
            {sessionsLoading ? (
              <p style={{ fontSize: '0.875rem', opacity: 0.6 }}>Loading sessions...</p>
            ) : sessions.length === 0 ? (
              <p style={{ fontSize: '0.875rem', opacity: 0.6 }}>No sessions found for this event.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {sessions.map(session => (
                  <label
                    key={session.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      cursor: 'pointer',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: `1px solid ${selectedSIds.has(session.id) ? 'var(--accent)' : 'transparent'}`,
                      transition: 'border-color 0.15s',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSIds.has(session.id)}
                      onChange={() => toggleSession(session.id)}
                      style={{ accentColor: 'inherit' }}
                    />
                    <span style={{ fontSize: '0.875rem' }}>{session.title}</span>
                    {session.schedule && (
                      <span style={{ fontSize: '0.75rem', opacity: 0.6, marginLeft: 'auto' }}>
                        {new Date(session.schedule).toLocaleString('en-US', {
                          month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                        })}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            )}
          </S.FormGroup>
        </S.ModalBody>

        <S.ModalFooter>
          <S.FooterLeft />
          <S.FooterRight>
            <Button variant="secondary" onClick={onClose} disabled={submitting}>Cancel</Button>
            <Button variant="primary" onClick={handleAssign} disabled={submitting || selectedSIds.size === 0}>
              {submitting ? 'Assigning...' : `Assign to ${selectedSIds.size || 0} Session${selectedSIds.size !== 1 ? 's' : ''}`}
            </Button>
          </S.FooterRight>
        </S.ModalFooter>

      </S.ModalCard>
    </S.Overlay>
  );

  return createPortal(modal, document.body);
};

export default SessionAssignmentModal;

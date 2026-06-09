import { useState } from 'react';
import Button from '../../Button';
import * as S from '../../../styles/Dashboards/Admin/AttendeeManagement.styles';
import { createManualAttendee } from '../../../services/attendee';
import { getSessions } from '../../../services/admin';
import { useEffect } from 'react';

const DEPARTMENTS = ['BSIT', 'BSCS', 'BSBA', 'BSTM', 'BSHM', 'BSE', 'BEED', 'Other'];

const INIT = { fullName: '', email: '', studentId: '', department: '', sessionId: '' };

const ManualEntryForm = ({ eventId, onSuccess }) => {
  const [form,       setForm]       = useState(INIT);
  const [sessions,   setSessions]   = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState('');
  const [success,    setSuccess]    = useState('');

  useEffect(() => {
    if (!eventId) return;
    getSessions({ eventId, pageSize: 100 })
      .then(data => setSessions(data?.sessions || data?.rows || []))
      .catch(() => {}); // non-fatal — session select will be empty
  }, [eventId]);

  const setField = (f, v) => setForm(p => ({ ...p, [f]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!eventId) { setError('Please select an event first.'); return; }
    if (!form.fullName.trim()) { setError('Full name is required.'); return; }
    if (!form.email.trim())    { setError('Email is required.'); return; }

    setSubmitting(true);
    try {
      const payload = {
        fullName: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        eventId,
        ...(form.studentId  && { studentId: form.studentId.trim().toUpperCase() }),
        ...(form.department && { department: form.department }),
        ...(form.sessionId  && { sessionId: Number(form.sessionId) }),
      };
      await createManualAttendee(payload);
      setSuccess(`${form.fullName} has been registered successfully.`);
      setForm(INIT);
      onSuccess?.();
    } catch (err) {
      setError(err?.response?.data?.error?.message || 'Failed to add attendee.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error   && <S.FeedbackBanner $type="error"   role="alert">{error}</S.FeedbackBanner>}
      {success && <S.FeedbackBanner $type="success"            >{success}</S.FeedbackBanner>}

      <S.FormRow>
        <S.FormGroup>
          <S.Label htmlFor="me-name">
            Full Name <span className="required" aria-hidden="true">*</span>
          </S.Label>
          <S.Input
            id="me-name"
            type="text"
            placeholder="e.g. Maria Santos"
            value={form.fullName}
            onChange={e => setField('fullName', e.target.value)}
            maxLength={100}
          />
        </S.FormGroup>

        <S.FormGroup>
          <S.Label htmlFor="me-email">
            Email <span className="required" aria-hidden="true">*</span>
          </S.Label>
          <S.Input
            id="me-email"
            type="email"
            placeholder="e.g. delfin.341383@balagtas.sti.edu.ph"
            value={form.email}
            onChange={e => setField('email', e.target.value)}
            maxLength={100}
          />
        </S.FormGroup>
      </S.FormRow>

      <S.FormRow>
        <S.FormGroup>
          <S.Label htmlFor="me-sid">Student ID</S.Label>
          <S.Input
            id="me-sid"
            type="text"
            placeholder="e.g. 341383 or 02000341383"
            value={form.studentId}
            onChange={e => setField('studentId', e.target.value)}
            maxLength={30}
          />
        </S.FormGroup>

        <S.FormGroup>
          <S.Label htmlFor="me-dept">Department</S.Label>
          <S.SelectWrap>
            <S.Select
              id="me-dept"
              value={form.department}
              onChange={e => setField('department', e.target.value)}
            >
              <option value="">No department</option>
              {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
            </S.Select>
          </S.SelectWrap>
        </S.FormGroup>
      </S.FormRow>

      {sessions.length > 0 && (
        <S.FormGroup>
          <S.Label htmlFor="me-session">Assign to Session</S.Label>
          <S.SelectWrap>
            <S.Select
              id="me-session"
              value={form.sessionId}
              onChange={e => setField('sessionId', e.target.value)}
            >
              <option value="">No session assigned</option>
              {sessions.map(s => (
                <option key={s.id} value={s.id}>{s.title}</option>
              ))}
            </S.Select>
          </S.SelectWrap>
        </S.FormGroup>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.625rem' }}>
        <Button
          type="button"
          variant="secondary"
          onClick={() => { setForm(INIT); setError(''); setSuccess(''); }}
          disabled={submitting}
        >
          Clear
        </Button>
        <Button type="submit" variant="primary" disabled={submitting || !eventId}>
          {submitting ? 'Registering...' : 'Register Attendee'}
        </Button>
      </div>
    </form>
  );
};

export default ManualEntryForm;

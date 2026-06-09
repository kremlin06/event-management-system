import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseSVG, PlusSVG, UploadSVG, TrashSVG, CheckmarkSVG } from '../../SVGs';
import Button from '../../Button';
import { createEvent, createSession, getStaff } from '../../../services/admin';
import * as S from '../../../styles/Dashboards/Admin/StepperFormModal.styles';

const STEPS = [
  { id: 1, label: 'Event Details' },
  { id: 2, label: 'Sessions' },
];

const STATUS_OPTIONS = [
  { value: 'Draft',     color: '#6b7280' },
  { value: 'Upcoming',  color: '#3b82f6' },
  { value: 'Ongoing',   color: '#22c55e' },
  { value: 'Completed', color: '#6366f1' },
  { value: 'Cancelled', color: '#ef4444' },
];

const emptySession = () => ({ title: '', schedule: '', capacity: 50, facilitatorId: '' });

const StepperFormModal = ({ onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // step 1 — event form
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    venue: '',
    description: '',
    status: 'Upcoming',
    capacity: 100,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [createdEventId, setCreatedEventId] = useState(null);

  // step 2 — sessions
  const [sessions, setSessions] = useState([emptySession()]);
  const [staff, setStaff] = useState([]);
  const [staffLoading, setStaffLoading] = useState(false);

  // pre-fetch staff so step 2 facilitator dropdown is ready
  useEffect(() => {
    let cancelled = false;
    const fetchStaff = async () => {
      setStaffLoading(true);
      try {
        const data = await getStaff();
        if (!cancelled) setStaff(data?.staff || data || []);
      } catch {
        // non-fatal — facilitator select shows empty list
      } finally {
        if (!cancelled) setStaffLoading(false);
      }
    };
    fetchStaff();
    return () => { cancelled = true; };
  }, []);

  // close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const setEventField = (field, value) =>
    setEventForm((prev) => ({ ...prev, [field]: value }));

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const triggerImageInput = () =>
    document.getElementById('sfm-image-input').click();

  // step 1: create event then advance
  const handleContinue = async () => {
    setError('');
    if (!eventForm.title.trim()) { setError('Event name is required.'); return; }
    if (!eventForm.date)         { setError('Date is required.'); return; }

    setSubmitting(true);
    try {
      const payload = {
        title: eventForm.title.trim(),
        date: eventForm.date,
        status: eventForm.status,
        capacity: Number(eventForm.capacity) || 100,
        ...(eventForm.venue.trim()       && { venue: eventForm.venue.trim() }),
        ...(eventForm.description.trim() && { description: eventForm.description.trim() }),
        // imageUrl deferred — file-upload endpoint not yet configured
      };
      const result = await createEvent(payload);
      setCreatedEventId(result?.event?.id ?? result?.id);
      setStep(2);
    } catch (err) {
      setError(err?.response?.data?.error?.message || 'Failed to create event.');
    } finally {
      setSubmitting(false);
    }
  };

  // session list helpers
  const addSession    = () => setSessions((p) => [...p, emptySession()]);
  const removeSession = (idx) => setSessions((p) => p.filter((_, i) => i !== idx));
  const setSessionField = (idx, field, value) =>
    setSessions((p) => p.map((s, i) => (i === idx ? { ...s, [field]: value } : s)));

  // step 2: create all sessions then call onSuccess
  const handleFinish = async () => {
    setError('');
    for (let i = 0; i < sessions.length; i++) {
      if (!sessions[i].title.trim()) {
        setError(`Session ${i + 1}: title is required.`);
        return;
      }
    }

    setSubmitting(true);
    try {
      await Promise.all(
        sessions.map((s) =>
          createSession({
            eventId: createdEventId,
            title: s.title.trim(),
            capacity: Number(s.capacity) || 50,
            ...(s.schedule      && { schedule: s.schedule }),
            ...(s.facilitatorId && { facilitatorId: Number(s.facilitatorId) }),
          }),
        ),
      );
      onSuccess();
    } catch (err) {
      setError(err?.response?.data?.error?.message || 'Failed to save sessions.');
    } finally {
      setSubmitting(false);
    }
  };

  const stepState = (id) => (id < step ? 'done' : id === step ? 'active' : 'idle');

  const modal = (
    <S.Overlay
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <S.ModalCard role="dialog" aria-modal="true" aria-labelledby="sfm-title">

        {/* Header */}
        <S.ModalHeader>
          <S.ModalTitle>
            <h2 id="sfm-title">
              {step === 1 ? 'Create Event' : 'Add Sessions'}
            </h2>
            <p>
              {step === 1
                ? 'Fill in the event details to get started'
                : 'Add one or more sessions to your event'}
            </p>
          </S.ModalTitle>
          <S.CloseBtn onClick={onClose} aria-label="Close">
            <CloseSVG size={16} aria-hidden="true" />
          </S.CloseBtn>
        </S.ModalHeader>

        {/* Step indicator */}
        <S.StepRow aria-label="Form progress">
          {STEPS.map((s, idx) => (
            <S.StepItem key={s.id}>
              <S.StepCircle $state={stepState(s.id)}>
                {stepState(s.id) === 'done'
                  ? <CheckmarkSVG aria-hidden="true" />
                  : s.id}
              </S.StepCircle>
              <S.StepLabel $state={stepState(s.id)}>{s.label}</S.StepLabel>
              {idx < STEPS.length - 1 && (
                <S.StepConnector $done={step > s.id} />
              )}
            </S.StepItem>
          ))}
        </S.StepRow>

        {/* Body */}
        <S.ModalBody>
          {error && (
            <S.FeedbackBanner $type="error" role="alert">{error}</S.FeedbackBanner>
          )}

          {step === 1 ? (
            /* ── Step 1: Event Details ────────────────────────────────── */
            <>
              <S.FormGroup>
                <S.Label htmlFor="sfm-title-input">
                  Event Name <span className="required" aria-hidden="true">*</span>
                </S.Label>
                <S.Input
                  id="sfm-title-input"
                  type="text"
                  placeholder="e.g. Freshmen Orientation 2026"
                  value={eventForm.title}
                  onChange={(e) => setEventField('title', e.target.value)}
                  maxLength={255}
                  autoFocus
                />
              </S.FormGroup>

              <S.FormRow>
                <S.FormGroup>
                  <S.Label htmlFor="sfm-date">
                    Date <span className="required" aria-hidden="true">*</span>
                  </S.Label>
                  <S.Input
                    id="sfm-date"
                    type="date"
                    value={eventForm.date}
                    onChange={(e) => setEventField('date', e.target.value)}
                  />
                </S.FormGroup>
                <S.FormGroup>
                  <S.Label htmlFor="sfm-capacity">Capacity</S.Label>
                  <S.Input
                    id="sfm-capacity"
                    type="number"
                    min={1}
                    max={100000}
                    value={eventForm.capacity}
                    onChange={(e) => setEventField('capacity', e.target.value)}
                  />
                </S.FormGroup>
              </S.FormRow>

              <S.FormGroup>
                <S.Label htmlFor="sfm-venue">Venue</S.Label>
                <S.Input
                  id="sfm-venue"
                  type="text"
                  placeholder="e.g. Campus Gymnasium"
                  value={eventForm.venue}
                  onChange={(e) => setEventField('venue', e.target.value)}
                  maxLength={500}
                />
              </S.FormGroup>

              <S.FormGroup>
                <S.Label htmlFor="sfm-desc">Description</S.Label>
                <S.TextArea
                  id="sfm-desc"
                  placeholder="Briefly describe the event..."
                  value={eventForm.description}
                  onChange={(e) => setEventField('description', e.target.value)}
                  maxLength={2000}
                />
              </S.FormGroup>

              <S.FormGroup>
                <S.Label>Status</S.Label>
                <S.StatusGrid>
                  {STATUS_OPTIONS.map((opt) => (
                    <S.StatusPill
                      key={opt.value}
                      type="button"
                      $active={eventForm.status === opt.value}
                      $color={opt.color}
                      onClick={() => setEventField('status', opt.value)}
                      aria-pressed={eventForm.status === opt.value}
                    >
                      {opt.value}
                    </S.StatusPill>
                  ))}
                </S.StatusGrid>
              </S.FormGroup>

              <S.FormGroup>
                <S.Label>Cover Image</S.Label>
                {imagePreview ? (
                  <S.ImagePreview>
                    <img src={imagePreview} alt="Event cover preview" />
                    <div className="preview-footer">
                      <span className="preview-name">{imageFile?.name}</span>
                      <button
                        type="button"
                        className="preview-remove"
                        onClick={() => { setImageFile(null); setImagePreview(null); }}
                      >
                        Remove
                      </button>
                    </div>
                  </S.ImagePreview>
                ) : (
                  <S.UploadArea
                    role="button"
                    tabIndex={0}
                    aria-label="Upload cover image"
                    onClick={triggerImageInput}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        triggerImageInput();
                      }
                    }}
                  >
                    <div className="upload-icon">
                      <UploadSVG size={24} aria-hidden="true" />
                    </div>
                    <div className="upload-text">Click to upload a cover image</div>
                    <div className="upload-hint">PNG, JPG, WebP — up to 5 MB</div>
                  </S.UploadArea>
                )}
                <input
                  id="sfm-image-input"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
              </S.FormGroup>
            </>
          ) : (
            /* ── Step 2: Session Builder ──────────────────────────────── */
            <>
              <S.SessionList>
                {sessions.length === 0 ? (
                  <S.EmptySessions>
                    <p>No sessions added yet.</p>
                    <small>Use the button below to add the first session.</small>
                  </S.EmptySessions>
                ) : (
                  sessions.map((session, idx) => (
                    <S.SessionCard key={idx}>
                      <S.SessionCardHeader>
                        <span className="session-number">Session {idx + 1}</span>
                        {sessions.length > 1 && (
                          <S.RemoveSessionBtn
                            type="button"
                            onClick={() => removeSession(idx)}
                            aria-label={`Remove session ${idx + 1}`}
                          >
                            <TrashSVG size={14} aria-hidden="true" />
                          </S.RemoveSessionBtn>
                        )}
                      </S.SessionCardHeader>

                      <S.FormGroup>
                        <S.Label htmlFor={`sfm-s-title-${idx}`}>
                          Title <span className="required" aria-hidden="true">*</span>
                        </S.Label>
                        <S.Input
                          id={`sfm-s-title-${idx}`}
                          type="text"
                          placeholder="e.g. Morning Keynote"
                          value={session.title}
                          onChange={(e) => setSessionField(idx, 'title', e.target.value)}
                          maxLength={255}
                        />
                      </S.FormGroup>

                      <S.FormRow>
                        <S.FormGroup>
                          <S.Label htmlFor={`sfm-s-schedule-${idx}`}>Schedule</S.Label>
                          <S.Input
                            id={`sfm-s-schedule-${idx}`}
                            type="datetime-local"
                            value={session.schedule}
                            onChange={(e) => setSessionField(idx, 'schedule', e.target.value)}
                          />
                        </S.FormGroup>
                        <S.FormGroup>
                          <S.Label htmlFor={`sfm-s-capacity-${idx}`}>Capacity</S.Label>
                          <S.Input
                            id={`sfm-s-capacity-${idx}`}
                            type="number"
                            min={1}
                            max={100000}
                            value={session.capacity}
                            onChange={(e) => setSessionField(idx, 'capacity', e.target.value)}
                          />
                        </S.FormGroup>
                      </S.FormRow>

                      <S.FormGroup>
                        <S.Label htmlFor={`sfm-s-facilitator-${idx}`}>Facilitator</S.Label>
                        <S.SelectWrap>
                        <S.Select
                          id={`sfm-s-facilitator-${idx}`}
                          value={session.facilitatorId}
                          onChange={(e) => setSessionField(idx, 'facilitatorId', e.target.value)}
                          disabled={staffLoading}
                        >
                          <option value="">
                            {staffLoading ? 'Loading...' : 'No facilitator assigned'}
                          </option>
                          {staff.map((member) => (
                            <option key={member.id} value={member.id}>
                              {member.fullName} — {member.role}
                            </option>
                          ))}
                        </S.Select>
                        </S.SelectWrap>
                      </S.FormGroup>
                    </S.SessionCard>
                  ))
                )}
              </S.SessionList>

              <S.AddSessionBtn type="button" onClick={addSession}>
                <PlusSVG size={14} aria-hidden="true" />
                Add Session
              </S.AddSessionBtn>
            </>
          )}
        </S.ModalBody>

        {/* Footer */}
        <S.ModalFooter>
          <S.FooterLeft>
            {step === 2 && (
              <Button
                variant="secondary"
                onClick={() => { setError(''); setStep(1); }}
                disabled={submitting}
              >
                Back
              </Button>
            )}
          </S.FooterLeft>

          <S.FooterRight>
            <Button variant="secondary" onClick={onClose} disabled={submitting}>
              Cancel
            </Button>

            {step === 1 ? (
              <Button variant="primary" onClick={handleContinue} disabled={submitting}>
                {submitting ? 'Creating...' : 'Continue'}
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleFinish}
                disabled={submitting || sessions.length === 0}
              >
                {submitting ? 'Saving...' : 'Save and Finish'}
              </Button>
            )}
          </S.FooterRight>
        </S.ModalFooter>

      </S.ModalCard>
    </S.Overlay>
  );

  return createPortal(modal, document.body);
};

export default StepperFormModal;

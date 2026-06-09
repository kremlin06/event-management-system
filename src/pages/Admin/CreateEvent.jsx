import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '@styles/Dashboards/Admin/CreateEvent.styles';
import { ArrowLeftSVG, UploadSVG } from '@components/SVGs';
import Button from '@components/Button';
// added: real admin api service
import { createEvent } from '@services/admin';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // added: inline feedback state (replaces alert() calls)
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: string }
  // added: local object url for image preview thumbnail
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    // old field name: eventName — renamed to title to match API field
    // eventName: '',
    title: '',
    date: '',
    venue: '',
    description: '',
    status: 'Upcoming',
    // added: capacity field (backend accepts capacity, default 100)
    capacity: 100,
    image: null,
  });

  // clean up the object url when the component unmounts or preview changes
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusChange = (status) => {
    setFormData(prev => ({
      ...prev,
      status
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        // old: alert('Please upload a PNG or JPG file');
        setFeedback({ type: 'error', message: 'Please upload a PNG or JPG file.' });
        return;
      }

      if (file.size > maxSize) {
        // old: alert('File size must be less than 5MB');
        setFeedback({ type: 'error', message: 'File size must be less than 5MB.' });
        return;
      }

      // revoke previous object url to avoid memory leaks
      if (imagePreview) URL.revokeObjectURL(imagePreview);

      // added: create local preview url
      setImagePreview(URL.createObjectURL(file));
      setFeedback(null);

      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleRemoveImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    setFormData(prev => ({ ...prev, image: null }));
    // reset the file input so the same file can be re-selected
    const input = document.getElementById('imageUpload');
    if (input) input.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    // basic client-side validation
    if (!formData.title.trim()) {
      setFeedback({ type: 'error', message: 'Event name is required.' });
      setLoading(false);
      return;
    }
    if (!formData.date) {
      setFeedback({ type: 'error', message: 'Date is required.' });
      setLoading(false);
      return;
    }

    try {
      // old: simulated api call
      // await new Promise(resolve => setTimeout(resolve, 1500));
      // console.log('Event data:', formData);
      // alert('Event created successfully!');

      // added: call real backend endpoint
      await createEvent({
        title: formData.title.trim(),
        description: formData.description.trim() || null,
        date: formData.date,
        venue: formData.venue.trim() || null,
        status: formData.status,
        capacity: parseInt(formData.capacity, 10) || 100,
        // imageUrl: image upload to server requires a multipart endpoint — skipping for now
        imageUrl: null,
      });

      setFeedback({ type: 'success', message: 'Event created successfully.' });

      // navigate after a short delay so the user sees the success message
      setTimeout(() => navigate('/dashboard/events'), 1500);
    } catch (error) {
      console.error('[CreateEvent] Failed to create event:', error);
      // old: alert('Failed to create event. Please try again.');
      const msg = error?.response?.data?.error?.message || 'Failed to create event. Please try again.';
      setFeedback({ type: 'error', message: msg });
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = [
    { value: 'Upcoming', color: '#16a34a', label: 'Upcoming' },
    { value: 'Ongoing', color: '#ea580c', label: 'Ongoing' },
    { value: 'Draft', color: '#64748b', label: 'Draft' },
    { value: 'Completed', color: '#3b82f6', label: 'Completed' },
  ];

  return (
    <S.CreateEventContainer>
      {/* Page Header */}
      <S.PageHeader>
        <S.BackButton onClick={() => navigate(-1)}>
          <ArrowLeftSVG size={18} />
        </S.BackButton>
        <S.PageTitle>
          <h1>Create New Event</h1>
          <p className="breadcrumb">Event › Create New Event</p>
        </S.PageTitle>
      </S.PageHeader>

      <form onSubmit={handleSubmit}>
        <S.FormGrid>
          {/* Main Form */}
          <S.MainForm>
            <S.FormSection>
              <S.SectionTitle>
                Event Information
              </S.SectionTitle>

              <S.FormGroup>
                <S.Label>
                  {/* old name: eventName — now using title to match API */}
                  Event Name <span className="required">*</span>
                </S.Label>
                <S.Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Campus Job Fair 2026"
                  required
                />
              </S.FormGroup>

              <S.FormGroup>
                <S.Label>
                  Date <span className="required">*</span>
                </S.Label>
                <S.Input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </S.FormGroup>

              <S.FormGroup>
                <S.Label>
                  Venue
                </S.Label>
                <S.Input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  placeholder="e.g. STI Gymnasium"
                />
              </S.FormGroup>

              {/* added: capacity field */}
              <S.FormGroup>
                <S.Label>
                  Capacity
                </S.Label>
                <S.Input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  min="1"
                  max="10000"
                  placeholder="100"
                />
              </S.FormGroup>

              <S.FormGroup>
                <S.Label>
                  Description
                </S.Label>
                <S.TextArea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your event..."
                />
              </S.FormGroup>
            </S.FormSection>
          </S.MainForm>

          {/* Sidebar */}
          <S.Sidebar>
            {/* Event Image Upload */}
            <S.FormSection>
              <S.SectionTitle>
                Event Image
                <span className="optional">Optional</span>
              </S.SectionTitle>

              {/* added: show thumbnail preview when an image is selected */}
              {imagePreview ? (
                <S.ImagePreview>
                  <img src={imagePreview} alt="Event image preview" />
                  <div className="preview-label">{formData.image?.name}</div>
                  <button
                    type="button"
                    className="preview-remove"
                    onClick={handleRemoveImage}
                    aria-label="Remove selected image"
                  >
                    Remove
                  </button>
                </S.ImagePreview>
              ) : (
                <S.UploadArea onClick={() => document.getElementById('imageUpload').click()}>
                  <div className="upload-icon">
                    <UploadSVG size={32} />
                  </div>
                  <div className="upload-text">Click to Upload</div>
                  <div className="upload-hint">PNG, JPG up to 5MB</div>
                </S.UploadArea>
              )}

              <input
                type="file"
                id="imageUpload"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </S.FormSection>

            {/* Status Selection */}
            <S.FormSection>
              <S.SectionTitle>
                Status
              </S.SectionTitle>

              <S.StatusGrid>
                {statusOptions.map((status) => (
                  <S.StatusButton
                    key={status.value}
                    type="button"
                    active={formData.status === status.value}
                    onClick={() => handleStatusChange(status.value)}
                  >
                    <span
                      className="status-dot"
                      style={{ background: formData.status === status.value ? status.color : 'transparent' }}
                    />
                    {status.label}
                  </S.StatusButton>
                ))}
              </S.StatusGrid>
            </S.FormSection>

            {/* Inline feedback banner — replaces alert() calls */}
            {feedback && (
              <S.FeedbackBanner $type={feedback.type} role="alert">
                {feedback.message}
              </S.FeedbackBanner>
            )}

            {/* Action Buttons */}
            <S.ActionButtons>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Event'}
              </Button>
            </S.ActionButtons>
          </S.Sidebar>
        </S.FormGrid>
      </form>
    </S.CreateEventContainer>
  );
};

export default CreateEvent;

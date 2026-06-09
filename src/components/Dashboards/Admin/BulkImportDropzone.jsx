import { useState, useRef, useCallback } from 'react';
import Button from '../../Button';
import ErrorTable from './ErrorTable';
import * as S from '../../../styles/Dashboards/Admin/AttendeeManagement.styles';
import { UploadSVG, CloseSVG, CheckCircleSVG, AlertCircleSVG } from '../../SVGs';
import { uploadAttendees } from '../../../services/attendee';

const ACCEPTED_TYPES = new Set([
  'text/csv',
  'application/csv',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
]);
const ACCEPTED_EXT = /\.(csv|xlsx|xls)$/i;
const MAX_BYTES    = 10 * 1024 * 1024; // 10 MB

const BulkImportDropzone = ({ eventId, onSuccess }) => {
  const [file,      setFile]      = useState(null);
  const [dragging,  setDragging]  = useState(false);
  const [progress,  setProgress]  = useState(0);
  const [uploading, setUploading] = useState(false);
  const [result,    setResult]    = useState(null); // upload result object
  const [clientErr, setClientErr] = useState('');
  const inputRef = useRef(null);

  const validate = (f) => {
    if (!f) return 'No file selected.';
    if (!ACCEPTED_TYPES.has(f.type) && !ACCEPTED_EXT.test(f.name))
      return 'Only CSV and Excel files (.csv, .xlsx, .xls) are accepted.';
    if (f.size > MAX_BYTES)
      return `File too large (${(f.size / 1024 / 1024).toFixed(1)} MB). Maximum is 10 MB.`;
    return null;
  };

  const selectFile = (f) => {
    const err = validate(f);
    if (err) { setClientErr(err); return; }
    setClientErr('');
    setResult(null);
    setProgress(0);
    setFile(f);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) selectFile(f);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDragOver  = (e) => { e.preventDefault(); setDragging(true);  };
  const handleDragLeave = ()  => setDragging(false);

  const handleInputChange = (e) => {
    const f = e.target.files?.[0];
    if (f) selectFile(f);
    e.target.value = '';
  };

  const clearFile = () => { setFile(null); setResult(null); setClientErr(''); setProgress(0); };

  const handleUpload = async () => {
    if (!file)    return;
    if (!eventId) { setClientErr('Please select an event first.'); return; }
    setClientErr('');
    setUploading(true);
    setProgress(0);
    try {
      const res = await uploadAttendees(file, eventId, setProgress);
      setResult(res);
      setFile(null);
      if (!res.aborted && res.successCount > 0) onSuccess?.();
    } catch (err) {
      const msg = err?.response?.data?.error?.message || err?.response?.data?.message || 'Upload failed.';
      setResult({ aborted: true, message: msg, warningRows: [], successCount: 0, errorCount: 0, total: 0 });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {clientErr && (
        <S.FeedbackBanner $type="error" role="alert">{clientErr}</S.FeedbackBanner>
      )}

      {/* Drop zone */}
      {!file && (
        <S.DropzoneArea
          $dragging={dragging}
          role="button"
          tabIndex={0}
          aria-label="Upload attendee file. Accepts CSV, XLSX, XLS up to 10 MB."
          onClick={() => inputRef.current?.click()}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inputRef.current?.click(); } }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <S.DropzoneIcon>
            <UploadSVG size={36} aria-hidden="true" />
          </S.DropzoneIcon>
          <S.DropzoneText>Drag and drop your attendee file here</S.DropzoneText>
          <S.DropzoneHint>Accepts .csv, .xlsx, .xls — max 10 MB — up to 10,000 rows</S.DropzoneHint>
          <Button type="button" variant="secondary">Browse Files</Button>
        </S.DropzoneArea>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".csv,.xlsx,.xls"
        style={{ display: 'none' }}
        onChange={handleInputChange}
        aria-hidden="true"
      />

      {/* Selected file chip */}
      {file && !uploading && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
          <S.FileChip>
            <UploadSVG size={14} aria-hidden="true" />
            {file.name}
            <span style={{ fontWeight: 400, opacity: 0.6 }}>
              ({(file.size / 1024).toFixed(0)} KB)
            </span>
          </S.FileChip>
          <S.FileChipRemove onClick={clearFile} aria-label="Remove selected file">
            <CloseSVG size={14} aria-hidden="true" />
          </S.FileChipRemove>
          <Button
            type="button"
            variant="primary"
            onClick={handleUpload}
            disabled={!eventId}
          >
            Upload
          </Button>
        </div>
      )}

      {/* Upload progress */}
      {uploading && (
        <>
          <S.ProgressBar $pct={progress} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} />
          <p style={{ fontSize: '0.75rem', textAlign: 'center', margin: 0 }}>
            Uploading and validating... {progress}%
          </p>
        </>
      )}

      {/* Result summary */}
      {result && (
        <>
          <S.ResultSummary role="status">
            {!result.aborted && (
              <S.ResultChip $color="success">
                <CheckCircleSVG size={14} aria-hidden="true" />
                {result.successCount} registered
              </S.ResultChip>
            )}
            {result.errorCount > 0 && (
              <S.ResultChip $color="error">
                <AlertCircleSVG size={14} aria-hidden="true" />
                {result.errorCount} {result.aborted ? 'errors (upload aborted)' : 'warnings'}
              </S.ResultChip>
            )}
            {result.total > 0 && (
              <S.ResultChip $color="textTertiary">
                {result.total} total rows
              </S.ResultChip>
            )}
            {result.message && (
              <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>{result.message}</span>
            )}
          </S.ResultSummary>

          {result.warningRows?.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <ErrorTable rows={result.warningRows} />
            </div>
          )}

          {/* allow another upload after completion */}
          <div style={{ marginTop: '1rem' }}>
            <Button type="button" variant="secondary" onClick={clearFile}>
              Upload Another File
            </Button>
          </div>
        </>
      )}

      {/* Template hint */}
      {!file && !result && (
        <p style={{ marginTop: '0.75rem', fontSize: '0.75rem', opacity: 0.6, textAlign: 'center' }}>
          Expected columns: <code>fullName, email, studentId (opt), department (opt), sessionTitle (opt)</code>
        </p>
      )}
    </div>
  );
};

export default BulkImportDropzone;

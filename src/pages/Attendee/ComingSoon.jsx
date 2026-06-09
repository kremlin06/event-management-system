// src/pages/Attendee/ComingSoon.jsx
// CREATED: Shared placeholder page for attendee sub-routes (Phase 1)
// Used for: /attendee/schedule, /attendee/events, /attendee/history, /attendee/notifications
// Replace individual instances with real pages in Phase 2
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { ArrowLeftSVG } from '../../components/SVGs';

const ComingSoon = ({
  title    = 'Coming Soon',
  subtitle = 'This feature is being built and will be available soon.',
}) => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      {/* paddingTop accounts for the fixed 64px Navbar */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        paddingTop: '64px',
        background: 'var(--bg-primary)',
        textAlign: 'center',
        gap: '1rem',
        padding: '80px 2rem 2rem',
      }}>
        {/* Back navigation */}
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            fontSize: '0.875rem',
            marginBottom: '1rem',
            padding: '6px 12px',
            borderRadius: '8px',
            alignSelf: 'flex-start',
            transition: 'all 0.15s ease',
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = 'var(--bg-tertiary)'; }}
          onMouseOut={(e)  => { e.currentTarget.style.background = 'none'; }}
        >
          <ArrowLeftSVG size={16} />
          Back
        </button>

        {/* Under-construction icon — OLD: used 🚧 emoji. MODIFIED: replaced with SVG per zero-emoji policy */}
        <div style={{
          width: '56px', height: '56px', borderRadius: '50%',
          background: 'var(--bg-tertiary, #1a1a1a)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '0.5rem',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ color: 'var(--text-secondary)' }}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <h1 style={{
          fontSize: '1.75rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          margin: 0,
        }}>
          {title}
        </h1>

        <p style={{
          fontSize: '0.95rem',
          color: 'var(--text-secondary)',
          maxWidth: '400px',
          margin: 0,
          lineHeight: 1.6,
        }}>
          {subtitle}
        </p>

        <button
          onClick={() => navigate('/attendee/portal')}
          style={{
            marginTop: '1.5rem',
            padding: '10px 24px',
            background: 'var(--accent-primary, #3b82f6)',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: 600,
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => { e.currentTarget.style.opacity = '0.85'; }}
          onMouseOut={(e)  => { e.currentTarget.style.opacity = '1'; }}
        >
          Return to Portal
        </button>
      </div>
    </>
  );
};

export default ComingSoon;

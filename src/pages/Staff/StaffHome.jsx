// src/pages/Staff/StaffHome.jsx
// Staff landing page — the home for users with role 'Staff'.
// Greets the staff member by name, offers the single action they need
// (Start Scanning → /staff/scanner), and provides the Logout path.
//
// Why a separate page:
//   Previously /staff/dashboard rendered the scanner directly.  That meant
//   Staff had no "home" to return to after finishing a session and no safe
//   way to log out without leaving the live scanner running.  Now:
//     /staff/dashboard → StaffHome   (this page)
//     /staff/scanner   → StaffDashboardLayout  (qr scanner + two-pane)
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import ThemeToggle from '../../components/ThemeToggle';
import { CameraSVG, LogOutSVG, BellSVG } from '../../components/SVGs';
import * as S from '../../styles/Staff/StaffDashboard.styles';

const StaffHome = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const firstName = user?.fullName?.split(' ')[0] || 'Staff';
  // initials for the avatar circle — first letter of first + last name
  const initials = (user?.fullName || 'S')
    .split(' ')
    .map(w => w[0]?.toUpperCase() || '')
    .slice(0, 2)
    .join('');

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <S.PageShell>

      {/* Header */}
      <S.PageHeader>
        <S.PageHeaderLeft>
          <S.PageTitle>
            <h1>Event Management</h1>
            <p>Staff Portal</p>
          </S.PageTitle>
        </S.PageHeaderLeft>

        <S.PageHeaderRight>
          <ThemeToggle />
          {/* bell is present but navigation to a notifications page is
              intentionally not wired for Staff (no portal page for them) */}
          <S.HeaderIconBtn aria-label="Notifications" title="Notifications">
            <BellSVG size={16} aria-hidden="true" />
          </S.HeaderIconBtn>
          <S.HomeLogoutBtn onClick={handleLogout} aria-label="Logout">
            <LogOutSVG size={14} aria-hidden="true" />
            Logout
          </S.HomeLogoutBtn>
        </S.PageHeaderRight>
      </S.PageHeader>

      {/* Centered welcome card */}
      <S.HomeBody>
        <S.HomeCard>

          {/* avatar initials circle */}
          <S.HomeAvatar aria-hidden="true">{initials}</S.HomeAvatar>

          <div>
            <S.HomeWelcome>Welcome back, {firstName}</S.HomeWelcome>
          </div>

          <S.HomeRoleBadge>Staff &mdash; Attendance Officer</S.HomeRoleBadge>

          <S.HomeDivider />

          {/* primary CTA — navigate to the scanner */}
          <S.HomeStartBtn
            onClick={() => navigate('/staff/scanner')}
            aria-label="Open QR attendance scanner"
          >
            <CameraSVG size={18} aria-hidden="true" />
            Start Scanning
          </S.HomeStartBtn>

        </S.HomeCard>
      </S.HomeBody>

    </S.PageShell>
  );
};

export default StaffHome;

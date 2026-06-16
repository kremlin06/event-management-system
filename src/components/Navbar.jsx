import {
  Nav,
  NavContainer,
  NavBrand,
  BrandName,
  NavLinks,
  NavLink,
  MobileMenuBtn,
  MobileMenu,
  MobileMenuOverlay,
} from '../styles/Navbar.styles';
import Button from './Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';

import { useState, useEffect } from 'react';

import ThemeToggle from './ThemeToggle';

import { BellSVG } from './SVGs';



const Navbar = ({ onHelpClick } = {}) => {


  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();


  const [menuOpen, setMenuOpen] = useState(false);


  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);


  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // we create a boolean constant. If this is true, we know to hide landing-page
  // specific links (like #features) and show auth-specific buttons instead.
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';



  const isForgotPasswordPage = location.pathname === '/forgot-password';
  const isResetPasswordPage = location.pathname.startsWith('/reset-password');
  const isAuthPage = isLoginPage || isSignupPage || isForgotPasswordPage || isResetPasswordPage;
  const isDashboardPage = location.pathname.startsWith('/dashboard');
  const isEventsPage = location.pathname === '/Admin/events';
  const isCreateEventPage = location.pathname === '/dashboard/events/new';
  const isAnalyticsPage = location.pathname === '/dashboard/analytics';


  const isAttendeePage = location.pathname.startsWith('/attendee');







  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };



  const navItems = (
    <>
      {}
      {}
      {!isAuthPage && !isAuthenticated && (
        <>
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#how-it-works">How it Works</NavLink>
          <NavLink href="#footer-manifesto">Manifesto</NavLink>
          <Button as={Link} variant="primary" to="/login">
            Get Started
          </Button>
        </>
      )}

      {}
      {}
      {isLoginPage && (
        <>
          <NavLink as={Link} to="/">
            Back to Home
          </NavLink>
          {}
          {onHelpClick ? (
            <NavLink
              as="button"
              onClick={onHelpClick}
              style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
            >
              Help
            </NavLink>
          ) : (
            <NavLink href="#help">Help</NavLink>
          )}
        </>
      )}

      {}
      {}
      {}
      {isSignupPage && (
        <>
          <NavLink as={Link} to="/">
            Back to Home
          </NavLink>
          <NavLink as={Link} to="/login">
            Already have an account?
          </NavLink>
        </>
      )}

      {}
      {}
      {(isForgotPasswordPage || isResetPasswordPage) && (
        <NavLink as={Link} to="/login">
          Back to Login
        </NavLink>
      )}

      {}
      {}
      {isAuthenticated && (
        <>
          {}
          {}
          {}
          {isDashboardPage && user?.role !== 'Attendee' && (
            <>
              <NavLink
                as={Link}
                to="/dashboard"
                className={location.pathname === '/dashboard' ? 'active' : ''}
              >
                Dashboard
              </NavLink>
              <NavLink
                as={Link}
                to="/Admin/events"
                className={isEventsPage || isCreateEventPage ? 'active' : ''}
              >
                Events
              </NavLink>
              <NavLink
                as={Link}
                to="/dashboard/analytics"
                className={isAnalyticsPage ? 'active' : ''}
              >
                Analytics
              </NavLink>
            </>
          )}

          {/* Quick Create Event button — admin/staff/organizer on dashboard pages only */}
          {/* OLD: was for all authenticated users on dashboard pages */}
          {/* MODIFIED: guard added so Attendees never see this button */}
          {isDashboardPage && user?.role !== 'Attendee' && (
            <Button as={Link} variant="primary" to="/dashboard/events/new" size="sm">
              + Create Event
            </Button>
          )}

          {}
          {}
          {isAttendeePage && user?.role === 'Attendee' && (
            <>
              <NavLink
                as={Link}
                to="/attendee/portal"
                className={location.pathname === '/attendee/portal' ? 'active' : ''}
              >
                Dashboard
              </NavLink>
              <NavLink
                as={Link}
                to="/attendee/events"
                className={location.pathname === '/attendee/events' ? 'active' : ''}
              >
                Register
              </NavLink>
              <NavLink
                as={Link}
                to="/attendee/qr"
                className={location.pathname === '/attendee/qr' ? 'active' : ''}
              >
                My QR Code
              </NavLink>
              <NavLink
                as={Link}
                to="/attendee/history"
                className={location.pathname === '/attendee/history' ? 'active' : ''}
              >
                History
              </NavLink>
              {/* ADDED: Notifications bell icon link — spec FR-08 */}
              <NavLink
                as={Link}
                to="/attendee/notifications"
                className={location.pathname === '/attendee/notifications' ? 'active' : ''}
                aria-label="Notifications"
                title="Notifications"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <BellSVG size={18} />
              </NavLink>
              {}
              <ThemeToggle />
            </>
          )}

          {}
          {}
          {}
          <NavLink
            as="button"
            onClick={handleLogout}
            aria-label={`Logout from account (${user?.fullName?.split(' ')[0] || 'User'})`}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              color: 'inherit',
              fontSize: 'inherit',
            }}
          >
            {user?.fullName?.split(' ')[0] || 'User'} • Logout
          </NavLink>
        </>
      )}
    </>
  );



  return (
    <Nav>
      <NavContainer>
        {}
        {}
        <NavBrand as={Link} to="/">
          {}
          <BrandName>Event Management System</BrandName>
        </NavBrand>

        {}
        <NavLinks>{navItems}</NavLinks>

        {}
        <MobileMenuBtn
          aria-label="Toggle mobile menu"
          aria-expanded={menuOpen}
          $open={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span></span>
          <span></span>
          <span></span>
        </MobileMenuBtn>
      </NavContainer>

      {}
      <MobileMenuOverlay $open={menuOpen} onClick={() => setMenuOpen(false)} />

      {}
      <MobileMenu
        $open={menuOpen}
        onClick={(e) => {
          if (e.target.closest('a, button')) setMenuOpen(false);
        }}
      >
        {navItems}
      </MobileMenu>
    </Nav>
  );
};

export default Navbar;

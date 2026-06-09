// Unified Staff shell — one persistent sidebar + shared header that wraps every
// staff page (Dashboard, Scan Attendance, Notifications, Attendance History).
//
// accessibility fixes (Phase 6 polish):
//   - MobileDrawer uses the `inert` attribute when closed instead of aria-hidden.
//     aria-hidden on an ancestor of a focused element is spec-forbidden and causes
//     a browser warning; `inert` prevents focus AND hides from the a11y tree at the
//     same time, which is the correct pattern for off-screen drawers.
//   - hamburger button ref is used to restore focus when the drawer closes so the
//     keyboard user's context is preserved.
//
// usage:
//   <StaffLayout title="Live Monitoring" subtitle="...">
//     ...page content...
//   </StaffLayout>

import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import ThemeToggle from '../ThemeToggle';
import Footer from '../Footer';
import { getMyNotifications } from '../../services/notifications';
import {
  ChartBarSVG,
  QrCodeSVG,
  BellSVG,
  TableSVG,
  // LogOutSVG — removed when the staff sidebar footer was aligned with the Admin
  //             sidebar pattern (plain "Logout" text, no icon).
  MenuSVG,
  CloseSVG,
} from '../SVGs';
import * as S from '../../styles/Staff/StaffDashboard.styles';

// the staff navigation map — order matches the design blueprint
const NAV_ITEMS = [
  { to: '/staff/dashboard',     label: 'Dashboard',          Icon: ChartBarSVG  },
  { to: '/staff/scanner',       label: 'Scan Attendance',    Icon: QrCodeSVG    },
  { to: '/staff/notifications', label: 'Notifications',      Icon: BellSVG, badge: true },
  { to: '/staff/history',       label: 'Attendance History', Icon: TableSVG     },
];

const StaffLayout = ({ title, subtitle, children, headerExtras = null }) => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { user, logout } = useAuth();

  const hamburgerRef = useRef(null);

  // mobile drawer open/closed
  const [drawerOpen, setDrawerOpen] = useState(false);
  // unread notification count — powers the bell badge + sidebar nav pill
  const [unread, setUnread] = useState(0);

  // initials for the sidebar user avatar
  const initials = (user?.fullName || 'S')
    .split(' ')
    .map((w) => w[0]?.toUpperCase() || '')
    .slice(0, 2)
    .join('');

  // fetch unread count once per navigation so the badge stays accurate
  // failures are silent — the badge stays at 0
  useEffect(() => {
    let active = true;
    getMyNotifications()
      .then((data) => {
        if (!active) return;
        const list = Array.isArray(data) ? data : [];
        setUnread(list.filter((n) => !n.read).length);
      })
      .catch(() => {});
    return () => { active = false; };
  }, [location.pathname]);

  // lock background scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [drawerOpen]);

  // close the drawer and return focus to the hamburger button so keyboard
  // users don't lose their position after the drawer is dismissed
  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    // defer one tick so the drawer has started to slide out before focus moves
    setTimeout(() => hamburgerRef.current?.focus(), 0);
  }, []);

  const go = useCallback((to) => {
    closeDrawer();
    if (location.pathname !== to) navigate(to);
  }, [navigate, location.pathname, closeDrawer]);

  const handleLogout = useCallback(async () => {
    await logout();
    navigate('/login', { replace: true });
  }, [logout, navigate]);

  // shared nav list — rendered in both the fixed sidebar and the mobile drawer
  const renderNav = () => (
    <S.SidebarNav>
      {NAV_ITEMS.map(({ to, label, Icon, badge }) => (
        <S.SidebarNavItem
          key={to}
          $active={location.pathname === to}
          onClick={() => go(to)}
          aria-current={location.pathname === to ? 'page' : undefined}
        >
          <Icon size={18} aria-hidden="true" />
          {label}
          {badge && unread > 0 && (
            <span className="nav-badge">{unread > 99 ? '99+' : unread}</span>
          )}
        </S.SidebarNavItem>
      ))}
    </S.SidebarNav>
  );

  // shared user/logout footer block.
  // old: showed a blue avatar circle (initials) + name/role in a flex row, then a
  //      "Log out" button with a LogOutSVG icon. that was visually different from the
  //      Admin sidebar which shows just the name, role label, and a plain text "Logout"
  //      button with no icon.
  // new: matches Admin's SidebarFooter pattern exactly — name, role, plain Logout button.
  const renderUser = () => (
    <S.SidebarUser>
      <div className="user-name">{user?.fullName || 'Staff Member'}</div>
      <div className="user-role">{user?.role || 'Staff'}</div>
      <S.SidebarLogout onClick={handleLogout} aria-label="Logout">
        Logout
      </S.SidebarLogout>
    </S.SidebarUser>
  );

  // text-only brand block — the diamond icon was removed per user request (Phase 6 polish)
  const renderBrand = () => (
    <S.SidebarBrand>
      <div>
        <div className="brand-name">Staff</div>
        <div className="brand-sub">Attendance Portal</div>
      </div>
    </S.SidebarBrand>
  );

  return (
    <S.LayoutShell>

      {/* Fixed sidebar (≥1024px) */}
      <S.LayoutSidebar aria-label="Staff navigation">
        {renderBrand()}
        {renderNav()}
        {renderUser()}
      </S.LayoutSidebar>

      {/* Mobile drawer (≤1023px) */}
      {/* overlay — decorative backdrop, aria-hidden is correct here */}
      <S.DrawerOverlay
        $open={drawerOpen}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* drawer — uses `inert` when closed so focus cannot land on hidden content.
          `inert=""` (empty string) adds the attribute; `undefined` removes it.
          this replaces the old `aria-hidden={!drawerOpen}` which caused the
          "Blocked aria-hidden on element with descendant focus" browser warning. */}
      <S.MobileDrawer
        $open={drawerOpen}
        inert={drawerOpen ? undefined : ''}
        aria-label="Staff navigation"
      >
        <S.DrawerClose onClick={closeDrawer} aria-label="Close menu">
          <CloseSVG size={18} />
        </S.DrawerClose>
        {renderBrand()}
        {renderNav()}
        {renderUser()}
      </S.MobileDrawer>

      {/* Main column */}
      <S.LayoutMain>
        <S.LayoutHeader>
          {/* hamburger only shows ≤1023px; ref used to restore focus on drawer close */}
          <S.Hamburger
            ref={hamburgerRef}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={drawerOpen}
          >
            <MenuSVG size={18} />
          </S.Hamburger>

          <S.LayoutTitleBlock>
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </S.LayoutTitleBlock>

          <S.LayoutHeaderRight>
            {headerExtras}
            <ThemeToggle />
            <S.HeaderIconBtn
              aria-label={`Notifications${unread > 0 ? ` — ${unread} unread` : ''}`}
              title="Notifications"
              onClick={() => go('/staff/notifications')}
            >
              <BellSVG size={16} aria-hidden="true" />
              {unread > 0 && <S.BellBadge>{unread > 9 ? '9+' : unread}</S.BellBadge>}
            </S.HeaderIconBtn>
          </S.LayoutHeaderRight>
        </S.LayoutHeader>

        {children}

        {/* reusable marketing footer (Manifesto / Privacy / Terms) */}
        <Footer />
      </S.LayoutMain>

    </S.LayoutShell>
  );
};

export default StaffLayout;

import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import ThemeToggle from '../ThemeToggle';
import Footer from '../Footer';

import StepperFormModal from '../Dashboards/Admin/StepperFormModal';

import NotificationPanel from '../Dashboards/Admin/NotificationPanel';
import { getMyNotifications } from '../../services/notifications';
import { ADMIN_NAV_ITEMS as NAV_ITEMS } from '../../config/adminNav';
import { BellSVG, MenuSVG, CloseSVG } from '../SVGs';
import {
  DashboardShell,
  Sidebar,
  SidebarBrand,
  SidebarNav,
  SidebarNavItem,
  SidebarFooter,
  SidebarLogoutBtn,
  DrawerOverlay,
  MobileDrawer,
  DrawerCloseBtn,
  MainArea,
  DashboardHeader,
  HamburgerBtn,
  HeaderTitle,
  HeaderControls,
  IconBtn,
  NotifDot,
} from '../../styles/Dashboards/Admin/AdminDashboard.styles';



const SidebarContent = ({ currentPath, user, onNavClick, onAction, onLogout }) => (
  <>
    <SidebarBrand>
      <div className="brand-name">Event Management</div>
      <div className="brand-sub">Admin Portal</div>
    </SidebarBrand>

    <SidebarNav aria-label="Dashboard navigation">
      {NAV_ITEMS.filter((item) => !item.roles || item.roles.includes(user?.role)).map((item) => (
        <SidebarNavItem
          key={item.id}
          $active={
            item.route &&
            (currentPath === item.route ||
              (item.id === 'overview' && currentPath === '/admin/dashboard'))
          }
          onClick={() => (item.action ? onAction(item.action) : onNavClick(item.route))}
          aria-current={item.route && currentPath === item.route ? 'page' : undefined}
        >
          {item.icon}
          {item.label}
        </SidebarNavItem>
      ))}
    </SidebarNav>

    <SidebarFooter>
      <div className="user-name">{user?.fullName || 'Admin'}</div>
      <div className="user-role">{user?.role}</div>
      <SidebarLogoutBtn onClick={onLogout} aria-label="Logout">
        Logout
      </SidebarLogoutBtn>
    </SidebarFooter>
  </>
);


const AdminLayout = ({
  title,
  subtitle,
  headerExtras = null,
  onEventCreated,
  children,
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [panelOpen, setPanelOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);


  useEffect(() => {
    let active = true;
    getMyNotifications()
      .then((data) => {
        if (!active) return;
        const list = Array.isArray(data) ? data : [];
        setUnreadCount(list.filter((n) => !n.read).length);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [location.pathname]);



  useEffect(() => {
    setPanelOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  const handleNav = (route) => {
    navigate(route);
    setDrawerOpen(false);
  };

  const handleSidebarAction = (action) => {
    setDrawerOpen(false);
    if (action === 'openCreateModal') setShowCreateModal(true);
  };

  const togglePanel = () => setPanelOpen((o) => !o);
  const closePanel = useCallback(() => setPanelOpen(false), []);


  const handleUnreadChange = useCallback((count) => setUnreadCount(count), []);

  const hasHighPriority = unreadCount > 0;

  // role redirects come after every hook so the hook order stays stable
  if (isAuthenticated && user) {
    if (user.role === 'Attendee') return <Navigate to="/attendee/portal" replace />;
    if (user.role === 'Staff') return <Navigate to="/staff/dashboard" replace />;
  }

  return (
    <DashboardShell>
      {}
      <Sidebar role="navigation" aria-label="Sidebar navigation">
        <SidebarContent
          currentPath={location.pathname}
          user={user}
          onNavClick={handleNav}
          onAction={handleSidebarAction}
          onLogout={handleLogout}
        />
      </Sidebar>

      {}
      <DrawerOverlay $open={drawerOpen} onClick={() => setDrawerOpen(false)} aria-hidden="true" />
      <MobileDrawer $open={drawerOpen} role="dialog" aria-modal="true" aria-label="Navigation menu">
        <DrawerCloseBtn onClick={() => setDrawerOpen(false)} aria-label="Close navigation menu">
          <CloseSVG size={18} />
        </DrawerCloseBtn>
        <SidebarContent
          currentPath={location.pathname}
          user={user}
          onNavClick={handleNav}
          onAction={handleSidebarAction}
          onLogout={handleLogout}
        />
      </MobileDrawer>

      {}
      <MainArea>
        <DashboardHeader>
          <HamburgerBtn
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
          >
            <MenuSVG size={18} />
          </HamburgerBtn>

          <HeaderTitle>
            <p className="header-welcome">{title}</p>
            {subtitle && <p className="header-sub">{subtitle}</p>}
          </HeaderTitle>

          <HeaderControls>
            {headerExtras}
            <ThemeToggle />

            {}
            <IconBtn
              onClick={togglePanel}
              aria-label={
                unreadCount > 0 ? `Notifications — ${unreadCount} unread` : 'Notifications'
              }
              aria-haspopup="dialog"
              aria-expanded={panelOpen}
              title="Notifications"
            >
              <BellSVG size={16} aria-hidden="true" />
              {}
              {hasHighPriority && <NotifDot aria-hidden="true" />}
            </IconBtn>
          </HeaderControls>
        </DashboardHeader>

        {}
        {children}

        <Footer />
      </MainArea>

      {}
      <NotificationPanel
        isOpen={panelOpen}
        onClose={closePanel}
        onUnreadChange={handleUnreadChange}
      />

      {}
      {showCreateModal && (
        <StepperFormModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            onEventCreated?.();
          }}
        />
      )}
    </DashboardShell>
  );
};

export default AdminLayout;

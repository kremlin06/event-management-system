import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/Global.styles';
import ThemeProvider from './contexts/ThemeProvider';
import { useTheme } from './hooks/useTheme';





import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';


import RouteFallback from './components/Shared/RouteFallback';





import ToastContainer from './components/ToastContainer';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import OfflineBanner from './components/Shared/OfflineBanner';















const Onboarding = lazy(() => import('./pages/Onboarding'));


const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));


const Dashboard = lazy(() => import('./pages/Dashboard'));
const CreateEvent = lazy(() => import('./pages/Admin/CreateEvent'));
const Events = lazy(() => import('./pages/Admin/Events'));

const AttendeeManagement = lazy(() => import('./pages/Admin/AttendeeManagement'));

const AnalyticsView = lazy(() => import('./components/Analytics/AnalyticsView'));


const AdminScanner = lazy(() => import('./pages/Admin/AdminScanner'));

const AdminUsers = lazy(() => import('./pages/Admin/AdminUsers'));






const StaffDashboardLayout = lazy(() => import('./components/Staff/StaffDashboardLayout'));
const StaffDashboard = lazy(() => import('./pages/Staff/StaffDashboard'));
const StaffNotifications = lazy(() => import('./pages/Staff/StaffNotifications'));
const StaffAttendanceHistory = lazy(() => import('./pages/Staff/StaffAttendanceHistory'));





const AttendeePortal = lazy(() => import('./pages/AttendeePortal'));
const Schedule = lazy(() => import('./pages/Attendee/Schedule'));
const BrowseEvents = lazy(() => import('./pages/Attendee/BrowseEvents'));
const MyQRCode = lazy(() => import('./pages/Attendee/MyQRCode'));
const AttendanceHistory = lazy(() => import('./pages/Attendee/AttendanceHistory'));
const NotificationsPage = lazy(() => import('./pages/Attendee/NotificationsPage'));










const PageFallback = () => <RouteFallback />;
const AuthFallback = () => <RouteFallback variant="auth" />;
const MarketingFallback = () => <RouteFallback variant="marketing" />;

const AppContent = () => {
  const { theme } = useTheme();


  if (!theme || !theme.transitions) {
    console.log('Theme or theme.transitions is undefined!', theme);
    return <div style={{ background: 'white', height: '100vh' }}>Loading Theme...</div>;
  }


  if (!theme) {
    return <div>Loading theme...</div>;
  }

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      {}
      <ToastContainer />
      {}
      <OfflineBanner />
      <Routes>
        {}
        {}
        <Route
          path="/"
          element={
            <Suspense fallback={<MarketingFallback />}>
              <Onboarding />
            </Suspense>
          }
        />

        {}
        <Route
          path="/login"
          element={
            <Suspense fallback={<AuthFallback />}>
              <Login />
              <Footer />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<AuthFallback />}>
              <Signup />
              <Footer />
            </Suspense>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <Suspense fallback={<AuthFallback />}>
              <ForgotPassword />
              <Footer />
            </Suspense>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <Suspense fallback={<AuthFallback />}>
              <ResetPassword />
              <Footer />
            </Suspense>
          }
        />

        {}
        {}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Suspense fallback={<PageFallback />}>
                <Dashboard />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['Admin', 'Staff', 'Organizer']}>
              <Suspense fallback={<PageFallback />}>
                <Dashboard />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/events/new"
          element={
            <ProtectedRoute>
              <Suspense fallback={<PageFallback />}>
                <CreateEvent />
                <Footer />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/events"
          element={
            <ProtectedRoute>
              <Suspense fallback={<PageFallback />}>
                {}
                <Events />
              </Suspense>
            </ProtectedRoute>
          }
        />

        {}
        <Route
          path="/admin/attendees"
          element={
            <ProtectedRoute allowedRoles={['Admin', 'Organizer']}>
              <Suspense fallback={<PageFallback />}>
                <AttendeeManagement />
              </Suspense>
            </ProtectedRoute>
          }
        />

        {}
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute allowedRoles={['Admin', 'Organizer']}>
              <Suspense fallback={<PageFallback />}>
                <AnalyticsView />
              </Suspense>
            </ProtectedRoute>
          }
        />

        {}
        {}
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <Suspense fallback={<PageFallback />}>
                <AdminUsers />
              </Suspense>
            </ProtectedRoute>
          }
        />

        {}
        {}
        <Route
          path="/admin/scanner"
          element={
            <ProtectedRoute allowedRoles={['Admin', 'Organizer']}>
              <Suspense fallback={<PageFallback />}>
                <AdminScanner />
              </Suspense>
            </ProtectedRoute>
          }
        />

        {}
        {}
        <Route
          path="/staff/dashboard"
          element={
            <ProtectedRoute allowedRoles={['Staff']}>
              <Suspense fallback={<PageFallback />}>
                <StaffDashboard />
              </Suspense>
            </ProtectedRoute>
          }
        />

        {}
        <Route
          path="/staff/notifications"
          element={
            <ProtectedRoute allowedRoles={['Staff']}>
              <Suspense fallback={<PageFallback />}>
                <StaffNotifications />
              </Suspense>
            </ProtectedRoute>
          }
        />

        {}
        <Route
          path="/staff/history"
          element={
            <ProtectedRoute allowedRoles={['Staff']}>
              <Suspense fallback={<PageFallback />}>
                <StaffAttendanceHistory />
              </Suspense>
            </ProtectedRoute>
          }
        />

        {}
        {}
        <Route
          path="/staff/scanner"
          element={
            <ProtectedRoute allowedRoles={['Staff']}>
              <Suspense fallback={<PageFallback />}>
                <StaffDashboardLayout />
              </Suspense>
            </ProtectedRoute>
          }
        />

        {}
        {}
        <Route
          path="/attendee/portal"
          element={
            <ProtectedRoute allowedRoles={['Attendee']}>
              <Suspense fallback={<PageFallback />}>
                <AttendeePortal />
              </Suspense>
            </ProtectedRoute>
          }
        />

        {}
        <Route
          path="/attendee/schedule"
          element={
            <ProtectedRoute allowedRoles={['Attendee']}>
              <Suspense fallback={<PageFallback />}>
                <Schedule />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendee/events"
          element={
            <ProtectedRoute allowedRoles={['Attendee']}>
              <Suspense fallback={<PageFallback />}>
                <BrowseEvents />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendee/qr"
          element={
            <ProtectedRoute allowedRoles={['Attendee']}>
              <Suspense fallback={<PageFallback />}>
                <MyQRCode />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendee/history"
          element={
            <ProtectedRoute allowedRoles={['Attendee']}>
              <Suspense fallback={<PageFallback />}>
                <AttendanceHistory />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendee/notifications"
          element={
            <ProtectedRoute allowedRoles={['Attendee']}>
              <Suspense fallback={<PageFallback />}>
                <NotificationsPage />
              </Suspense>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </StyledThemeProvider>
  );
};

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;

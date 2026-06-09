// src/pages/Admin/AdminScanner.jsx
// Admin/Organizer "Scan Attendance" page (route: /admin/scanner).
//
// this is the Admin-owned scanner. it renders the SAME <AttendanceScanner/>
// workspace the Staff page uses, but inside <AdminLayout/> so admins stay in their
// own dashboard chrome (sidebar + header + footer + ThemeToggle) instead of being
// redirected into the Staff portal — which was the reported bug.
//
// note: the header "Back to Dashboard" button was removed per request — the
// persistent sidebar (Overview) already provides the path back to the dashboard.

import AdminLayout from '../../components/Admin/AdminLayout';
import AttendanceScanner from '../../components/Staff/AttendanceScanner';

const AdminScanner = () => {
  return (
    <AdminLayout
      title="Attendance Scanner"
      subtitle="Scan QR codes or manually record attendance for a session"
    >
      <AttendanceScanner />
    </AdminLayout>
  );
};

export default AdminScanner;

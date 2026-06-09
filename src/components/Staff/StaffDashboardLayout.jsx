// Staff "Scan Attendance" page (route: /staff/scanner).
//
// Phase 7: the scanner UI was extracted into the layout-agnostic
// <AttendanceScanner/> workspace so it can be reused inside BOTH the Staff portal
// shell (here) and the Admin dashboard shell (src/pages/Admin/AdminScanner.jsx).
// this file is now just the Staff wrapper: it drops the workspace into
// <StaffLayout/> so it shares the persistent staff sidebar + header.
//
// old: this component held all the scanner markup (session picker, two panes,
//      manual override, live feed, bottom nav) inline — that lived in git history
//      and now lives in components/Staff/AttendanceScanner.jsx.

import StaffLayout from './StaffLayout';
import AttendanceScanner from './AttendanceScanner';

const StaffDashboardLayout = () => (
  <StaffLayout
    title="Attendance Scanner"
    subtitle="Scan QR codes or manually record attendance for a session"
  >
    <AttendanceScanner />
  </StaffLayout>
);

export default StaffDashboardLayout;

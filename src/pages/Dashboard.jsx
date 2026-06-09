// src/pages/Dashboard.jsx
// Admin/Organizer Dashboard — body content for the shared <AdminLayout> shell.
//
// Phase 7 refactor: the sidebar + hamburger drawer + sticky header + footer +
// role guard + "Create Event" modal were extracted into <AdminLayout>
// (src/components/Admin/AdminLayout.jsx) so the new admin-owned Scan Attendance
// page can share the EXACT same chrome instead of borrowing the Staff portal
// layout. this file now only provides the dashboard's own body: the 4 MetricCards,
// the session bar chart (US-18) and the paginated activity table.
//
// the relocated shell code (NAV_ITEMS, SidebarContent, header/drawer markup) was
// not deleted — it now lives in <AdminLayout>; see that file for reference.
//
// OLD imports (Phase 1/2 version — kept for reference):
// import * as S from '../styles/Dashboard.styles';
// import StatCard from '../components/Dashboards/Shared/StatCard';
// import QuickActionMenu from '../components/Dashboards/Admin/QuickActionMenu';
// import AttendanceOverview from '../components/Dashboards/Admin/AttendanceOverview';

import { useAuth } from '../contexts/useAuth';
import { useAdminDashboard } from '@hooks/dashboards/useAdminDashboard';
// added Phase 7: shared admin shell (sidebar + header + footer + create modal)
import AdminLayout from '../components/Admin/AdminLayout';
import StatCard from '../components/Dashboards/Shared/StatCard';
import SessionBarChart from '../components/Dashboards/Admin/SessionBarChart';
import ActivityTableComponent from '../components/Dashboards/Admin/ActivityTable';

import {
  CalendarSVG,
  UsersSVG,
  EventSVG,
  ChartBarSVG,
} from '../components/SVGs';

import {
  HeaderDateChip,
  DashboardContent,
  MetricGrid,
  SectionCard,
  CardHeader,
  CardTitle,
  CardSubtitle,
  ChartScrollWrapper,
  ChartInner,
} from '../styles/Dashboards/Admin/AdminDashboard.styles';

// Dashboard
const Dashboard = () => {
  const { user } = useAuth();

  const {
    stats,
    notifications,
    loading,
    sessionAttendance,
    activityLog,
    activityLogTotal,
    activityLogPage,
    setActivityLogPage,
    activityLogPageSize,
    refresh,            // re-fetch stats + sessions + events after a create-event save
  } = useAdminDashboard();

  // note: the role guard (Attendee/Staff → their own home) now lives in
  // <AdminLayout>, so it is not duplicated here.

  const firstName = user?.fullName?.split(' ')[0] || 'Admin';

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  });

  // old: hasHighPriorityNotif drove a notifDot prop on AdminLayout.
  // AdminLayout now manages its own unread count + dot internally via
  // getMyNotifications, so this prop is no longer needed here.

  // 4 MetricCards from Admin Dashboard spec (loaded from useAdminDashboard → getAdminStats)
  const metricCards = [
    {
      label: 'Total Events',
      value: loading ? '–' : stats?.totalEvents ?? 0,
      icon: <EventSVG size={20} />,
      color: '#3b82f6',
      trend: stats?.weekOverWeekGrowth || '+0%',
    },
    {
      label: 'Active Attendees',
      value: loading ? '–' : stats?.activeAttendees ?? 0,
      icon: <UsersSVG size={20} />,
      color: '#22c55e',
      trend: '+8%',
    },
    {
      label: 'Participation Rate',
      value: loading ? '–' : stats?.participationRate ?? '0%',
      icon: <ChartBarSVG size={20} />,
      color: '#8b5cf6',
      trend: stats?.monthOverMonthGrowth || '+0%',
    },
    {
      label: 'Total Sessions',
      value: loading ? '–' : stats?.totalSessions ?? 0,
      icon: <CalendarSVG size={20} />,
      color: '#f59e0b',
      trend: 'Live',
    },
  ];

  return (
    <AdminLayout
      title={`Welcome back, ${firstName}`}
      subtitle="Here's what's happening with your campus events today"
      onEventCreated={refresh}
      headerExtras={
        <HeaderDateChip aria-label={`Today is ${currentDate}`}>
          <CalendarSVG size={12} aria-hidden="true" />
          {currentDate}
        </HeaderDateChip>
      }
    >
      <DashboardContent>

        {/* 4 MetricCards */}
        <MetricGrid aria-label="Key metrics">
          {metricCards.map((card) => (
            <StatCard key={card.label} loading={loading} {...card} />
          ))}
        </MetricGrid>

        {/* Session Attendance Bar Chart (US-18) */}
        <SectionCard aria-labelledby="session-chart-title">
          <CardHeader>
            <div>
              <CardTitle id="session-chart-title">
                <ChartBarSVG size={18} aria-hidden="true" />
                Attendance per Session
              </CardTitle>
              <CardSubtitle>Check-in counts across all active sessions</CardSubtitle>
            </div>
          </CardHeader>

          {/* Horizontal scroll on mobile */}
          <ChartScrollWrapper>
            <ChartInner>
              <SessionBarChart
                data={sessionAttendance}
                loading={loading}
              />
            </ChartInner>
          </ChartScrollWrapper>
        </SectionCard>

        {/* Recent Activity Table (D4 + D3, paginated) */}
        <SectionCard aria-labelledby="activity-table-title">
          <CardHeader>
            <div>
              <CardTitle id="activity-table-title">Recent Activity</CardTitle>
              <CardSubtitle>
                Attendance log (D4) and registrations (D3)
                {!['Admin'].includes(user?.role) && (
                  <span style={{ marginLeft: 8, color: '#f59e0b', fontSize: '0.7rem' }}>
                    PII masked — Admin only
                  </span>
                )}
              </CardSubtitle>
            </div>
          </CardHeader>

          <ActivityTableComponent
            data={activityLog}
            total={activityLogTotal}
            page={activityLogPage}
            pageSize={activityLogPageSize}
            onPageChange={setActivityLogPage}
            hasExportPermission={user?.role === 'Admin'}
            loading={loading}
          />
        </SectionCard>

      </DashboardContent>
    </AdminLayout>
  );
};

export default Dashboard;

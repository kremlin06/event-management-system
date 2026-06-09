
// Attendee Registration & Management — FR-04 (bulk/manual ingestion) + FR-05 (session assignment)
// Blueprint 6 — admin sidebar shell, segmented control, PaginatedTable + mobile card stacks
//
// ingestion : "Manual Entry" (US-06) | "Bulk Upload" (US-07, up to 10,000 rows)
// roster    : search, status filter, checkbox selection, PII masking (NFR-02 — backend-enforced)
// mobile    : table hidden at ≤414px → expandable AttendeeCard stacks to avoid horizontal scroll
// assignment: "Assign Sessions" button → SessionAssignmentModal (US-08 / US-09)

import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import ThemeToggle from '../../components/ThemeToggle';
import Footer from '../../components/Footer';
import StatusBadge from '../../components/StatusBadge';
import ManualEntryForm from '../../components/Dashboards/Admin/ManualEntryForm';
import BulkImportDropzone from '../../components/Dashboards/Admin/BulkImportDropzone';
import SessionAssignmentModal from '../../components/Dashboards/Admin/SessionAssignmentModal';
// added: 2-step event + session creation wizard, opened in place from the sidebar
import StepperFormModal from '../../components/Dashboards/Admin/StepperFormModal';
import {
  UsersSVG, SearchSVG, EventSVG, ChartBarSVG, ChartSVG, QrCodeSVG,
  PlusSVG, MenuSVG, CloseSVG, ArrowRightSVG,
} from '../../components/SVGs';

// admin shell — shared styled components with Dashboard + Events
import {
  DashboardShell,
  Sidebar, SidebarBrand, SidebarNav, SidebarNavItem, SidebarFooter, SidebarLogoutBtn,
  DrawerOverlay, MobileDrawer, DrawerCloseBtn,
  MainArea, DashboardHeader, HamburgerBtn, HeaderTitle, HeaderControls,
  DashboardContent,
} from '../../styles/Dashboards/Admin/AdminDashboard.styles';

import * as S from '../../styles/Dashboards/Admin/AttendeeManagement.styles';
import { getAdminEvents } from '../../services/admin';
import { getAttendees } from '../../services/attendee';

// Sidebar nav items — same set as Dashboard.jsx and Events.jsx
// "create" dispatches 'openCreateModal' so the wizard opens in place on this page
const NAV_ITEMS = [
  { id: 'overview',  label: 'Overview',        icon: <ChartSVG    size={16} />, route: '/dashboard' },
  { id: 'events',    label: 'Events',           icon: <EventSVG    size={16} />, route: '/dashboard/events' },
  { id: 'attendees', label: 'Attendees',        icon: <UsersSVG    size={16} />, route: '/admin/attendees', roles: ['Admin', 'Organizer'] },
  { id: 'analytics', label: 'Analytics',        icon: <ChartBarSVG size={16} />, route: '/admin/analytics', roles: ['Admin', 'Organizer'] },
  // old: route was '/staff/scanner' (dropped admins into the staff portal shell);
  //      now points to the admin-owned scanner page.
  { id: 'scan',      label: 'Scan Attendance',  icon: <QrCodeSVG   size={16} />, route: '/admin/scanner',   roles: ['Admin', 'Organizer', 'Staff'] },
  // old: route '/dashboard' navigated away to Overview just to open the modal —
  //      that's the "page jumped back to Overview" bug. now opens the wizard here.
  { id: 'create',    label: 'Create Event',     icon: <PlusSVG     size={16} />, action: 'openCreateModal', roles: ['Admin', 'Organizer'] },
];

const TAB_MANUAL = 'manual';
const TAB_BULK   = 'bulk';
const PAGE_SIZE  = 20;

// Helpers
const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';

// backend masks organizer-visible emails: "jo***@domain.com"
// use this to add a visual indicator without re-masking on the frontend
const isPIIMasked = (email) => typeof email === 'string' && email.includes('***');

// Component
const AttendeeManagement = () => {
  const { user, logout }               = useAuth();
  const navigate                        = useNavigate();
  const location                        = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const hamburgerRef                    = useRef(null);

  // mobile drawer
  const [drawerOpen, setDrawerOpen] = useState(false);

  // event selection — persist to URL so refreshing restores the context
  const [events,        setEvents]        = useState([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventId, setEventId] = useState(() => {
    const p = searchParams.get('eventId');
    return p ? Number(p) : '';
  });

  // ingestion mode
  const [activeTab, setActiveTab] = useState(TAB_MANUAL);

  // attendee list
  const [attendees,    setAttendees]    = useState([]);
  const [total,        setTotal]        = useState(0);
  const [page,         setPage]         = useState(1);
  const [listLoading,  setListLoading]  = useState(false);
  const [searchQ,      setSearchQ]      = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // checkbox selection for bulk session assignment
  const [selected,         setSelected]         = useState(new Set());
  const [showAssignModal,  setShowAssignModal]   = useState(false);

  // mobile card expander — Set of expanded registrationIds
  const [expandedCards, setExpandedCards] = useState(new Set());

  // create-event wizard (opened from the sidebar "Create Event")
  const [showCreateModal, setShowCreateModal] = useState(false);

  // load events for the selector dropdown
  // extracted into a callback so the create-event modal can refresh it on success
  const loadEvents = useCallback(() => {
    setEventsLoading(true);
    getAdminEvents({ pageSize: 200 })
      .then((data) =>
        setEvents(Array.isArray(data) ? data : (data?.events || data?.rows || []))
      )
      .catch(() => {})
      .finally(() => setEventsLoading(false));
  }, []);

  useEffect(() => { loadEvents(); }, [loadEvents]);

  // fetch attendee roster whenever context changes
  const fetchAttendees = useCallback(async () => {
    if (!eventId) { setAttendees([]); setTotal(0); return; }
    setListLoading(true);
    try {
      const data = await getAttendees(eventId, {
        page,
        pageSize: PAGE_SIZE,
        ...(statusFilter && { status: statusFilter }),
        ...(searchQ.trim() && { q: searchQ.trim() }),
      });
      setAttendees(data?.attendees || []);
      setTotal(data?.total || 0);
    } catch {
      setAttendees([]);
    } finally {
      setListLoading(false);
    }
  }, [eventId, page, statusFilter, searchQ]);

  useEffect(() => { fetchAttendees(); }, [fetchAttendees]);

  // lock body scroll during mobile drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  // event selector
  const handleEventChange = (e) => {
    const id = e.target.value ? Number(e.target.value) : '';
    setEventId(id);
    setPage(1);
    setSelected(new Set());
    setExpandedCards(new Set());
    if (id) setSearchParams({ eventId: String(id) });
    else    setSearchParams({});
  };

  // drawer helpers
  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    // restore focus to hamburger button so keyboard users keep their context
    setTimeout(() => hamburgerRef.current?.focus(), 0);
  }, []);

  const handleNav = (route) => { navigate(route); closeDrawer(); };

  // sidebar action dispatcher — opens the Create Event wizard in place
  const handleSidebarAction = (action) => {
    closeDrawer();
    if (action === 'openCreateModal') setShowCreateModal(true);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  // pagination
  const totalPages = Math.ceil(total / PAGE_SIZE);

  // checkbox selection
  const toggleSelect = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === attendees.length) setSelected(new Set());
    else setSelected(new Set(attendees.map((a) => a.attendee.id)));
  };

  const selectedAttendees = attendees
    .filter((a) => selected.has(a.attendee.id))
    .map((a) => ({ id: a.attendee.id, fullName: a.attendee.fullName, email: a.attendee.email }));

  // mobile card toggler
  const toggleCard = (registrationId) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      next.has(registrationId) ? next.delete(registrationId) : next.add(registrationId);
      return next;
    });
  };

  // sidebar render helper (desktop sidebar + mobile drawer share this markup)
  const renderSidebarContent = () => (
    <>
      <SidebarBrand>
        <div className="brand-name">Event Management</div>
        <div className="brand-sub">Admin Portal</div>
      </SidebarBrand>

      <SidebarNav aria-label="Dashboard navigation">
        {NAV_ITEMS
          .filter((item) => !item.roles || item.roles.includes(user?.role))
          .map((item) => (
            <SidebarNavItem
              key={item.id}
              $active={item.route && location.pathname === item.route}
              onClick={() => (item.action ? handleSidebarAction(item.action) : handleNav(item.route))}
              aria-current={item.route && location.pathname === item.route ? 'page' : undefined}
            >
              {item.icon}
              {item.label}
            </SidebarNavItem>
          ))}
      </SidebarNav>

      <SidebarFooter>
        <div className="user-name">{user?.fullName || 'Admin'}</div>
        <div className="user-role">{user?.role}</div>
        <SidebarLogoutBtn onClick={handleLogout} aria-label="Logout">
          Logout
        </SidebarLogoutBtn>
      </SidebarFooter>
    </>
  );

  // render
  return (
    <DashboardShell>

      {/* Fixed sidebar (≥1440px) */}
      <Sidebar role="navigation" aria-label="Sidebar navigation">
        {renderSidebarContent()}
      </Sidebar>

      {/* Mobile drawer */}
      <DrawerOverlay $open={drawerOpen} onClick={closeDrawer} aria-hidden="true" />
      <MobileDrawer
        $open={drawerOpen}
        inert={drawerOpen ? undefined : ''}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <DrawerCloseBtn onClick={closeDrawer} aria-label="Close navigation menu">
          <CloseSVG size={18} />
        </DrawerCloseBtn>
        {renderSidebarContent()}
      </MobileDrawer>

      {/* Main column */}
      <MainArea>

        {/* sticky page header */}
        <DashboardHeader>
          <HamburgerBtn
            ref={hamburgerRef}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            aria-haspopup="dialog"
          >
            <MenuSVG size={18} />
          </HamburgerBtn>

          <HeaderTitle>
            <p className="header-welcome">Attendee Management</p>
            <p className="header-sub">Register, import, and assign attendees to sessions</p>
          </HeaderTitle>

          <HeaderControls>
            <ThemeToggle />
          </HeaderControls>
        </DashboardHeader>

        <DashboardContent>

          {/* Event context selector */}
          <S.EventSelectorRow>
            <S.EventSelectorLabel htmlFor="am-event-select">Event</S.EventSelectorLabel>
            <S.EventSelect
              id="am-event-select"
              value={eventId}
              onChange={handleEventChange}
              disabled={eventsLoading}
            >
              <option value="">{eventsLoading ? 'Loading events...' : 'Select an event'}</option>
              {events.map((ev) => (
                <option key={ev.id} value={ev.id}>{ev.title ?? ev.name}</option>
              ))}
            </S.EventSelect>
          </S.EventSelectorRow>

          {/* Add Attendees card (Manual Entry | Bulk Upload) */}
          <S.SectionCard aria-label="Add attendees">
            <S.CardHeader>
              <div>
                <h2>Add Attendees</h2>
                <p>Register individually or import a spreadsheet (up to 10,000 records, CSV or Excel)</p>
              </div>
            </S.CardHeader>

            <S.CardBody>
              {/* Apple-style segmented control */}
              <S.SegmentedControl role="tablist" aria-label="Add attendee mode">
                <S.SegTab
                  role="tab"
                  $active={activeTab === TAB_MANUAL}
                  aria-selected={activeTab === TAB_MANUAL}
                  onClick={() => setActiveTab(TAB_MANUAL)}
                >
                  Manual Entry
                </S.SegTab>
                <S.SegTab
                  role="tab"
                  $active={activeTab === TAB_BULK}
                  aria-selected={activeTab === TAB_BULK}
                  onClick={() => setActiveTab(TAB_BULK)}
                >
                  Bulk Upload
                </S.SegTab>
              </S.SegmentedControl>

              <div role="tabpanel">
                {activeTab === TAB_MANUAL ? (
                  // US-06: manual form — Full Name, Email, Student ID, Department, Session
                  <ManualEntryForm
                    eventId={eventId}
                    onSuccess={() => { setPage(1); fetchAttendees(); }}
                  />
                ) : (
                  // US-07: drag-and-drop dropzone — CSV/Excel up to 10,000 rows
                  // server validates ≥95% of malformed records before persistence
                  <BulkImportDropzone
                    eventId={eventId}
                    onSuccess={() => { setPage(1); fetchAttendees(); }}
                  />
                )}
              </div>
            </S.CardBody>
          </S.SectionCard>

          {/* Registered Attendees roster (shown only when an event is selected) */}
          {eventId && (
            <S.SectionCard aria-labelledby="attendee-list-title">

              {/* card header: title + count + PII notice + status filter */}
              <S.CardHeader>
                <div>
                  <h2 id="attendee-list-title">
                    Registered Attendees
                    {!listLoading && total > 0 && (
                      <S.TotalChip aria-label={`${total} attendees`}>{total.toLocaleString()}</S.TotalChip>
                    )}
                  </h2>
                  <p>
                    {user?.role !== 'Admin' && (
                      <S.PIINotice aria-label="Email partially masked for privacy">
                        Email masked — Admin only
                      </S.PIINotice>
                    )}
                    {listLoading
                      ? 'Loading...'
                      : `${total.toLocaleString()} attendee${total !== 1 ? 's' : ''} registered`}
                  </p>
                </div>

                {/* status filter — right side of card header */}
                <S.StatusFilterSelectWrap>
                  <S.StatusFilterSelect
                    value={statusFilter}
                    onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                    aria-label="Filter by registration status"
                  >
                    <option value="">All statuses</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                  </S.StatusFilterSelect>
                </S.StatusFilterSelectWrap>
              </S.CardHeader>

              {/* search bar + "Assign Sessions" button */}
              <S.ListToolbar>
                <S.SearchWrap>
                  <SearchSVG size={15} aria-hidden="true" />
                  <S.SearchInput
                    type="search"
                    placeholder="Search name, email, or student ID..."
                    value={searchQ}
                    onChange={(e) => { setSearchQ(e.target.value); setPage(1); }}
                    aria-label="Search attendees"
                  />
                </S.SearchWrap>

                {selected.size > 0 && (
                  <S.AssignBtn
                    type="button"
                    onClick={() => setShowAssignModal(true)}
                    aria-label={`Assign ${selected.size} selected attendees to sessions`}
                  >
                    Assign Sessions ({selected.size})
                  </S.AssignBtn>
                )}
              </S.ListToolbar>

              {/* bulk action bar — appears when checkboxes are checked */}
              {selected.size > 0 && (
                <S.BulkBar>
                  <S.Checkbox
                    checked={selected.size === attendees.length && attendees.length > 0}
                    onChange={toggleSelectAll}
                    aria-label="Select all visible attendees"
                  />
                  <span>{selected.size} selected</span>
                  <S.ClearSelectionBtn onClick={() => setSelected(new Set())}>
                    Clear
                  </S.ClearSelectionBtn>
                </S.BulkBar>
              )}
              {/*
  
                  Desktop table (sticky header, hidden at ≤414px)
                  PII: email and studentId are already masked by the backend for
                  non-Admin roles. Frontend shows the backend-returned value and
                  adds a monospace "masked" style to make it visually distinct.
               */}
              <S.TableWrapper>
                <S.Table aria-label="Registered attendees">
                  <S.Thead>
                    <tr>
                      <S.Th style={{ width: 36 }}>
                        <S.Checkbox
                          checked={attendees.length > 0 && selected.size === attendees.length}
                          onChange={toggleSelectAll}
                          aria-label="Select all attendees on this page"
                        />
                      </S.Th>
                      <S.Th scope="col">Name</S.Th>
                      <S.Th scope="col">Email</S.Th>
                      {user?.role === 'Admin' && <S.Th scope="col">Student ID</S.Th>}
                      <S.Th scope="col">Department</S.Th>
                      <S.Th scope="col">Session</S.Th>
                      <S.Th scope="col">Status</S.Th>
                      <S.Th scope="col">Registered</S.Th>
                    </tr>
                  </S.Thead>
                  <tbody>
                    {listLoading ? (
                      // skeleton rows while fetching
                      Array.from({ length: 5 }).map((_, i) => (
                        <S.Tr key={i}>
                          <S.Td colSpan={user?.role === 'Admin' ? 8 : 7} aria-hidden="true">
                            <S.RowSkeleton />
                          </S.Td>
                        </S.Tr>
                      ))
                    ) : attendees.length === 0 ? (
                      <tr>
                        <S.Td colSpan={user?.role === 'Admin' ? 8 : 7}>
                          <S.ListEmptyState>
                            <UsersSVG size={28} aria-hidden="true" />
                            <p>No attendees found.</p>
                            <small>Use the form above to add attendees to this event.</small>
                          </S.ListEmptyState>
                        </S.Td>
                      </tr>
                    ) : (
                      attendees.map((row) => (
                        <S.Tr key={row.registrationId}>
                          <S.Td>
                            <S.Checkbox
                              checked={selected.has(row.attendee.id)}
                              onChange={() => toggleSelect(row.attendee.id)}
                              aria-label={`Select ${row.attendee.fullName}`}
                            />
                          </S.Td>
                          <S.Td>
                            <S.NameCell>
                              {row.attendee.fullName}
                              {row.attendee.isStub && <S.StubTag>stub</S.StubTag>}
                            </S.NameCell>
                          </S.Td>
                          <S.Td>
                            {isPIIMasked(row.attendee.email)
                              ? <S.MaskedValue>{row.attendee.email}</S.MaskedValue>
                              : row.attendee.email}
                          </S.Td>
                          {user?.role === 'Admin' && (
                            <S.Td>{row.attendee.studentId || '—'}</S.Td>
                          )}
                          <S.Td>{row.attendee.department || '—'}</S.Td>
                          <S.Td>{row.session?.title || '—'}</S.Td>
                          <S.Td><StatusBadge status={row.status} /></S.Td>
                          <S.Td>{fmtDate(row.registeredAt)}</S.Td>
                        </S.Tr>
                      ))
                    )}
                  </tbody>
                </S.Table>

                {totalPages > 1 && (
                  <S.Pagination>
                    <S.PaginationInfo>
                      {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} of {total.toLocaleString()}
                    </S.PaginationInfo>
                    <S.PaginationControls>
                      <S.PageBtn
                        onClick={() => setPage((p) => p - 1)}
                        disabled={page === 1}
                        aria-label="Previous page"
                      >
                        &lsaquo;
                      </S.PageBtn>
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter((n) => n === 1 || n === totalPages || Math.abs(n - page) <= 1)
                        .reduce((acc, n, idx, arr) => {
                          if (idx > 0 && arr[idx - 1] !== n - 1) acc.push('…');
                          acc.push(n);
                          return acc;
                        }, [])
                        .map((item, idx) =>
                          item === '…' ? (
                            <S.PageBtn key={`e${idx}`} disabled style={{ cursor: 'default' }}>…</S.PageBtn>
                          ) : (
                            <S.PageBtn
                              key={item}
                              $active={item === page}
                              aria-current={item === page ? 'page' : undefined}
                              onClick={() => setPage(item)}
                            >
                              {item}
                            </S.PageBtn>
                          )
                        )}
                      <S.PageBtn
                        onClick={() => setPage((p) => p + 1)}
                        disabled={page === totalPages}
                        aria-label="Next page"
                      >
                        &rsaquo;
                      </S.PageBtn>
                    </S.PaginationControls>
                  </S.Pagination>
                )}
              </S.TableWrapper>

              {/*
                  Mobile card stacks (≤414px only, hidden on desktop via CSS)
                  Each card shows Name + Status in the collapsed header row.
                  Tapping the chevron expands to show Email, Dept, Session, Date.
                  Prevents horizontal scroll — satisfies the Blueprint 6 mobile spec.
               */}
              {!listLoading && attendees.length > 0 && (
                <S.MobileCardList aria-label="Registered attendees (mobile)">
                  {attendees.map((row) => {
                    const isExpanded = expandedCards.has(row.registrationId);
                    return (
                      <S.AttendeeCard key={row.registrationId}>
                        <S.CardRowMain>
                          <S.Checkbox
                            checked={selected.has(row.attendee.id)}
                            onChange={() => toggleSelect(row.attendee.id)}
                            aria-label={`Select ${row.attendee.fullName}`}
                          />

                          <S.CardNameBlock>
                            <S.CardAttendeeName>
                              {row.attendee.fullName}
                              {row.attendee.isStub && <S.StubTag>stub</S.StubTag>}
                            </S.CardAttendeeName>
                            <StatusBadge status={row.status} />
                          </S.CardNameBlock>

                          <S.CardExpandBtn
                            onClick={() => toggleCard(row.registrationId)}
                            aria-expanded={isExpanded}
                            aria-label={isExpanded ? 'Collapse attendee details' : 'Expand attendee details'}
                          >
                            <S.ExpandIcon $rotated={isExpanded}>
                              <ArrowRightSVG size={13} aria-hidden="true" />
                            </S.ExpandIcon>
                          </S.CardExpandBtn>
                        </S.CardRowMain>

                        {isExpanded && (
                          <S.CardExpanded>
                            <S.CardDetail>
                              <S.CardDetailLabel>Email</S.CardDetailLabel>
                              <S.CardDetailValue>
                                {isPIIMasked(row.attendee.email)
                                  ? <S.MaskedValue>{row.attendee.email}</S.MaskedValue>
                                  : row.attendee.email}
                              </S.CardDetailValue>
                            </S.CardDetail>

                            {user?.role === 'Admin' && (
                              <S.CardDetail>
                                <S.CardDetailLabel>Student ID</S.CardDetailLabel>
                                <S.CardDetailValue>{row.attendee.studentId || '—'}</S.CardDetailValue>
                              </S.CardDetail>
                            )}

                            <S.CardDetail>
                              <S.CardDetailLabel>Department</S.CardDetailLabel>
                              <S.CardDetailValue>{row.attendee.department || '—'}</S.CardDetailValue>
                            </S.CardDetail>

                            <S.CardDetail>
                              <S.CardDetailLabel>Session</S.CardDetailLabel>
                              <S.CardDetailValue>{row.session?.title || '—'}</S.CardDetailValue>
                            </S.CardDetail>

                            <S.CardDetail>
                              <S.CardDetailLabel>Registered</S.CardDetailLabel>
                              <S.CardDetailValue>{fmtDate(row.registeredAt)}</S.CardDetailValue>
                            </S.CardDetail>
                          </S.CardExpanded>
                        )}
                      </S.AttendeeCard>
                    );
                  })}

                  {/* simplified prev/next only pagination for mobile */}
                  {totalPages > 1 && (
                    <S.Pagination>
                      <S.PaginationInfo>
                        Page {page} of {totalPages} ({total.toLocaleString()} total)
                      </S.PaginationInfo>
                      <S.PaginationControls>
                        <S.PageBtn onClick={() => setPage((p) => p - 1)} disabled={page === 1} aria-label="Previous page">
                          &lsaquo;
                        </S.PageBtn>
                        <S.PageBtn onClick={() => setPage((p) => p + 1)} disabled={page === totalPages} aria-label="Next page">
                          &rsaquo;
                        </S.PageBtn>
                      </S.PaginationControls>
                    </S.Pagination>
                  )}
                </S.MobileCardList>
              )}

              {/* empty state for mobile view */}
              {!listLoading && attendees.length === 0 && (
                <S.MobileCardList>
                  <S.ListEmptyState>
                    <UsersSVG size={28} aria-hidden="true" />
                    <p>No attendees found.</p>
                    <small>Use the form above to add attendees to this event.</small>
                  </S.ListEmptyState>
                </S.MobileCardList>
              )}

            </S.SectionCard>
          )}

        </DashboardContent>

        <Footer />
      </MainArea>

      {/* Session Assignment Modal (US-08 / US-09)
          opens when "Assign Sessions" is clicked with ≥1 attendee selected
          POST /api/admin/registrations/assign — bulkCreate SessionAssignment rows
      */}
      {showAssignModal && (
        <SessionAssignmentModal
          attendees={selectedAttendees}
          eventId={eventId}
          onClose={() => setShowAssignModal(false)}
          onSuccess={() => {
            setShowAssignModal(false);
            setSelected(new Set());
            fetchAttendees();
          }}
        />
      )}

      {/*  Create Event wizard (opened from the sidebar "Create Event") 
          old: the sidebar item navigated to /dashboard to open this modal there;
          now it opens in place here. onSuccess refreshes the event selector. */}
      {showCreateModal && (
        <StepperFormModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            loadEvents();
          }}
        />
      )}

    </DashboardShell>
  );
};

export default AttendeeManagement;

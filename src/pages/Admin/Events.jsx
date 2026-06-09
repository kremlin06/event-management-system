// src/pages/Admin/Events.jsx
// Event & Session Management — Master-Detail layout
// Phase 7 rebuild — replaces old flat table with mock data
//
// left panel : scrollable event list (real API, search, status filter)
// right panel: selected event metadata (glassmorphism card) + sessions list
// create     : StepperFormModal (existing 2-step wizard)
// edit       : inline EditEventModal → updateEvent()
// delete     : styled ConfirmModal (cascade-deletes sessions in DB)

import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import ThemeToggle from '../../components/ThemeToggle';
import Footer from '../../components/Footer';
import StepperFormModal from '../../components/Dashboards/Admin/StepperFormModal';
import { getAdminEvents, getSessions, updateEvent, deleteEvent } from '../../services/admin';

import {
  SearchSVG,
  PlusSVG,
  EditSVG,
  TrashSVG,
  CalendarSVG,
  LocationSVG,
  ClockSVG,
  UsersSVG,
  EventSVG,
  ChartBarSVG,
  ChartSVG,
  QrCodeSVG,
  MenuSVG,
  CloseSVG,
  AlertCircleSVG,
  ArrowLeftSVG,
} from '../../components/SVGs';

// admin shell components — shared with Dashboard
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
  DashboardContent,
} from '../../styles/Dashboards/Admin/AdminDashboard.styles';

// events-specific master-detail styles
import * as S from '../../styles/Dashboards/Admin/Events.styles';

// Admin sidebar nav — same items as Dashboard.jsx
// "create" dispatches openCreateModal instead of navigating
const NAV_ITEMS = [
  { id: 'overview',  label: 'Overview',        icon: <ChartSVG    size={16} />, route: '/dashboard' },
  { id: 'events',    label: 'Events',           icon: <EventSVG    size={16} />, route: '/dashboard/events' },
  { id: 'attendees', label: 'Attendees',        icon: <UsersSVG    size={16} />, route: '/admin/attendees', roles: ['Admin', 'Organizer'] },
  { id: 'analytics', label: 'Analytics',        icon: <ChartBarSVG size={16} />, route: '/admin/analytics', roles: ['Admin', 'Organizer'] },
  // old: route was '/staff/scanner' (dropped admins into the staff portal shell);
  //      now points to the admin-owned scanner page.
  { id: 'scan',      label: 'Scan Attendance',  icon: <QrCodeSVG   size={16} />, route: '/admin/scanner',   roles: ['Admin', 'Organizer', 'Staff'] },
  { id: 'create',    label: 'Create Event',     icon: <PlusSVG     size={16} />, action: 'openCreateModal', roles: ['Admin', 'Organizer'] },
];

// Date helpers
const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';

const fmtTime = (d) =>
  d ? new Date(d).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '—';

// Events page component
const Events = () => {
  const { user, logout } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const hamburgerRef = useRef(null);

  // mobile drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);

  // events list
  const [events, setEvents]             = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [searchTerm, setSearchTerm]     = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // selection + sessions
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [sessions, setSessions]           = useState([]);
  const [loadingSessions, setLoadingSessions] = useState(false);

  // mobile: true = show detail panel, false = show list panel
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  // create modal
  const [showCreateModal, setShowCreateModal] = useState(false);

  // edit modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editForm, setEditForm]           = useState({});
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [editError, setEditError]         = useState('');

  // delete confirm modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget]       = useState(null);
  const [deleting, setDeleting]               = useState(false);

  // fetch all events (called on mount and after create/edit/delete)
  const fetchEvents = useCallback(async () => {
    setLoadingEvents(true);
    try {
      const data = await getAdminEvents({ pageSize: 100 });
      // api may return array or { events: [...] }
      setEvents(Array.isArray(data) ? data : (data?.events ?? []));
    } catch {
      setEvents([]);
    } finally {
      setLoadingEvents(false);
    }
  }, []);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  // fetch sessions whenever the selected event changes
  useEffect(() => {
    if (!selectedEvent) { setSessions([]); return; }
    let active = true;
    setLoadingSessions(true);
    getSessions({ eventId: selectedEvent.id, pageSize: 100 })
      .then((data) => {
        if (!active) return;
        setSessions(Array.isArray(data) ? data : (data?.sessions ?? []));
      })
      .catch(() => { if (active) setSessions([]); })
      .finally(() => { if (active) setLoadingSessions(false); });
    return () => { active = false; };
  }, [selectedEvent?.id]);

  // lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  // derived: filtered event list
  const filteredEvents = events.filter((ev) => {
    const q = searchTerm.toLowerCase();
    const matchSearch = !q
      || (ev.title  ?? ev.name ?? '').toLowerCase().includes(q)
      || (ev.venue  ?? '').toLowerCase().includes(q);
    const matchStatus = statusFilter === 'all'
      || (ev.status ?? '').toLowerCase() === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  // handlers
  const handleSelectEvent = (ev) => {
    setSelectedEvent(ev);
    setMobileDetailOpen(true);
  };

  const handleNav = (route) => {
    navigate(route);
    setDrawerOpen(false);
  };

  const handleSidebarAction = (action) => {
    setDrawerOpen(false);
    if (action === 'openCreateModal') setShowCreateModal(true);
  };

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    setTimeout(() => hamburgerRef.current?.focus(), 0);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  // open edit modal, pre-populate form with selected event data
  const openEditModal = () => {
    if (!selectedEvent) return;
    setEditForm({
      title: selectedEvent.title       ?? selectedEvent.name ?? '',
      date: selectedEvent.date        ? selectedEvent.date.slice(0, 10) : '',
      venue: selectedEvent.venue       ?? '',
      description: selectedEvent.description ?? '',
      status: selectedEvent.status      ?? 'Upcoming',
      capacity: selectedEvent.capacity    ?? 100,
    });
    setEditError('');
    setEditModalOpen(true);
  };

  // submit edit form → updateEvent(id, data)
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEvent) return;
    setEditSubmitting(true);
    setEditError('');
    try {
      const res = await updateEvent(selectedEvent.id, editForm);
      // api may return the updated event directly or wrapped in { event: {...} }
      const updatedEvent = res?.event ?? { ...selectedEvent, ...editForm };
      setEvents((prev) => prev.map((ev) => ev.id === selectedEvent.id ? updatedEvent : ev));
      setSelectedEvent(updatedEvent);
      setEditModalOpen(false);
    } catch (err) {
      setEditError(err?.response?.data?.message ?? 'Failed to save changes. Please try again.');
    } finally {
      setEditSubmitting(false);
    }
  };

  // open delete confirm modal
  const openDeleteModal = () => {
    if (!selectedEvent) return;
    setDeleteTarget(selectedEvent);
    setDeleteModalOpen(true);
  };

  // confirm delete → deleteEvent(id) — backend cascade-deletes sessions
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteEvent(deleteTarget.id);
      setEvents((prev) => prev.filter((ev) => ev.id !== deleteTarget.id));
      if (selectedEvent?.id === deleteTarget.id) {
        setSelectedEvent(null);
        setMobileDetailOpen(false);
      }
      setDeleteModalOpen(false);
      setDeleteTarget(null);
    } catch {
      // non-fatal — stay on page so user can retry
    } finally {
      setDeleting(false);
    }
  };

  // shared sidebar content (desktop sidebar + mobile drawer)
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
              onClick={() => item.action ? handleSidebarAction(item.action) : handleNav(item.route)}
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
      <DrawerOverlay
        $open={drawerOpen}
        onClick={closeDrawer}
        aria-hidden="true"
      />
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
            <p className="header-welcome">Events</p>
            <p className="header-sub">Manage and monitor all campus events</p>
          </HeaderTitle>

          <HeaderControls>
            <ThemeToggle />
          </HeaderControls>
        </DashboardHeader>

        {/* Master-Detail layout */}
        <DashboardContent>
          <S.EventsMasterDetail>

            {/* Left panel — event list */}
            <S.EventsListPanel $mobileDetailOpen={mobileDetailOpen}>

              {/* panel header: title + count + create btn */}
              <S.ListPanelTop>
                <S.ListPanelTitle>
                  <EventSVG size={15} aria-hidden="true" />
                  All Events
                  <S.ListCount>{filteredEvents.length}</S.ListCount>
                </S.ListPanelTitle>
                {['Admin', 'Organizer'].includes(user?.role) && (
                  <S.PanelCreateBtn
                    onClick={() => setShowCreateModal(true)}
                    aria-label="Create new event"
                  >
                    <PlusSVG size={13} />
                    New
                  </S.PanelCreateBtn>
                )}
              </S.ListPanelTop>

              {/* search */}
              <S.ListSearchBar>
                <SearchSVG size={15} aria-hidden="true" />
                <S.ListSearchInput
                  type="text"
                  placeholder="Search events or venues..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    // reset selection when search changes
                    setSelectedEvent(null);
                    setMobileDetailOpen(false);
                  }}
                  aria-label="Search events"
                />
                {searchTerm && (
                  <S.ClearSearchBtn onClick={() => setSearchTerm('')} aria-label="Clear search">
                    <CloseSVG size={13} />
                  </S.ClearSearchBtn>
                )}
              </S.ListSearchBar>

              {/* status filter */}
              <S.ListFilterRow>
                <S.ListFilterSelect
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  aria-label="Filter by status"
                >
                  <option value="all">All Status</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="draft">Draft</option>
                  <option value="cancelled">Cancelled</option>
                </S.ListFilterSelect>
              </S.ListFilterRow>

              {/* scrollable event list */}
              <S.EventsListScroll>
                {loadingEvents ? (
                  // skeleton placeholders while fetching
                  Array.from({ length: 5 }).map((_, i) => (
                    <S.EventListSkeleton key={i} />
                  ))
                ) : filteredEvents.length === 0 ? (
                  <S.ListEmptyState>
                    <SearchSVG size={30} aria-hidden="true" />
                    <p>No events found</p>
                    <span>Try adjusting your search or status filter</span>
                  </S.ListEmptyState>
                ) : (
                  filteredEvents.map((ev) => (
                    <S.EventListItem
                      key={ev.id}
                      $active={selectedEvent?.id === ev.id}
                      onClick={() => handleSelectEvent(ev)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && handleSelectEvent(ev)}
                      aria-pressed={selectedEvent?.id === ev.id}
                    >
                      <S.ELIName>{ev.title ?? ev.name}</S.ELIName>
                      <S.ELIStatusRow>
                        <S.ELIDate>
                          <CalendarSVG size={11} aria-hidden="true" />
                          {fmtDate(ev.date)}
                        </S.ELIDate>
                        <S.ELIBadge $status={ev.status}>{ev.status}</S.ELIBadge>
                      </S.ELIStatusRow>
                      {ev.venue && (
                        <S.ELIVenue>
                          <LocationSVG size={11} aria-hidden="true" />
                          {ev.venue}
                        </S.ELIVenue>
                      )}
                    </S.EventListItem>
                  ))
                )}
              </S.EventsListScroll>

            </S.EventsListPanel>

            {/* Right panel — event detail */}
            <S.EventsDetailPanel $mobileDetailOpen={mobileDetailOpen}>
              {!selectedEvent ? (
                // placeholder when nothing is selected
                <S.EmptySelection>
                  <EventSVG size={44} aria-hidden="true" />
                  <h3>Select an Event</h3>
                  <p>Choose an event from the list to view its details and sessions</p>
                </S.EmptySelection>
              ) : (
                <S.DetailScrollArea>

                  {/* ← back to list — mobile only */}
                  <S.MobileBackBtn
                    onClick={() => { setMobileDetailOpen(false); setSelectedEvent(null); }}
                    aria-label="Back to event list"
                  >
                    <ArrowLeftSVG size={15} />
                    Events
                  </S.MobileBackBtn>

                  {/* event metadata card */}
                  <S.DetailEventCard>
                    <S.DetailCardTop>
                      <S.DetailEventTitle>{selectedEvent.title ?? selectedEvent.name}</S.DetailEventTitle>
                      <S.DetailStatusBadge $status={selectedEvent.status}>
                        {selectedEvent.status}
                      </S.DetailStatusBadge>
                    </S.DetailCardTop>

                    {/* 2-column metadata grid */}
                    <S.DetailMeta>
                      <S.DetailMetaItem>
                        <CalendarSVG size={14} aria-hidden="true" />
                        <div>
                          <S.DetailMetaLabel>Date</S.DetailMetaLabel>
                          <S.DetailMetaValue>{fmtDate(selectedEvent.date)}</S.DetailMetaValue>
                        </div>
                      </S.DetailMetaItem>

                      <S.DetailMetaItem>
                        <LocationSVG size={14} aria-hidden="true" />
                        <div>
                          <S.DetailMetaLabel>Venue</S.DetailMetaLabel>
                          <S.DetailMetaValue>{selectedEvent.venue || '—'}</S.DetailMetaValue>
                        </div>
                      </S.DetailMetaItem>

                      <S.DetailMetaItem>
                        <UsersSVG size={14} aria-hidden="true" />
                        <div>
                          <S.DetailMetaLabel>Capacity</S.DetailMetaLabel>
                          <S.DetailMetaValue>
                            {selectedEvent.capacity != null ? selectedEvent.capacity.toLocaleString() : '—'}
                          </S.DetailMetaValue>
                        </div>
                      </S.DetailMetaItem>

                      <S.DetailMetaItem>
                        <ClockSVG size={14} aria-hidden="true" />
                        <div>
                          <S.DetailMetaLabel>Sessions</S.DetailMetaLabel>
                          <S.DetailMetaValue>
                            {loadingSessions ? '...' : sessions.length}
                          </S.DetailMetaValue>
                        </div>
                      </S.DetailMetaItem>
                    </S.DetailMeta>

                    {selectedEvent.description && (
                      <S.DetailDescription>{selectedEvent.description}</S.DetailDescription>
                    )}

                    {/* edit / delete — admin and organizer only */}
                    {['Admin', 'Organizer'].includes(user?.role) && (
                      <S.DetailActions>
                        <S.DetailActionBtn $variant="edit" onClick={openEditModal}>
                          <EditSVG size={14} aria-hidden="true" />
                          Edit Event
                        </S.DetailActionBtn>
                        <S.DetailActionBtn $variant="delete" onClick={openDeleteModal}>
                          <TrashSVG size={14} aria-hidden="true" />
                          Delete
                        </S.DetailActionBtn>
                      </S.DetailActions>
                    )}
                  </S.DetailEventCard>

                  {/* sessions list */}
                  <S.SessionsSection aria-labelledby="sessions-heading">
                    <S.SessionsSectionTitle id="sessions-heading">
                      <ClockSVG size={15} aria-hidden="true" />
                      Sessions
                      <span>{loadingSessions ? '...' : sessions.length}</span>
                    </S.SessionsSectionTitle>

                    {loadingSessions ? (
                      Array.from({ length: 2 }).map((_, i) => (
                        <S.SessionSkeleton key={i} />
                      ))
                    ) : sessions.length === 0 ? (
                      <S.SessionEmptyState>
                        <ClockSVG size={26} aria-hidden="true" />
                        <p>No sessions yet</p>
                        <span>Sessions are created through the event wizard</span>
                      </S.SessionEmptyState>
                    ) : (
                      sessions.map((session) => (
                        <S.SessionCard key={session.id}>
                          <S.SessionCardTitle>{session.title}</S.SessionCardTitle>
                          <S.SessionCardMeta>
                            <S.SessionMetaItem>
                              <CalendarSVG size={12} aria-hidden="true" />
                              {fmtDate(session.schedule)}
                            </S.SessionMetaItem>
                            <S.SessionMetaItem>
                              <ClockSVG size={12} aria-hidden="true" />
                              {fmtTime(session.schedule)}
                            </S.SessionMetaItem>
                            <S.SessionMetaItem>
                              <UsersSVG size={12} aria-hidden="true" />
                              Capacity: {session.capacity ?? '—'}
                            </S.SessionMetaItem>
                            {session.facilitator?.fullName && (
                              <S.SessionMetaItem>
                                <UsersSVG size={12} aria-hidden="true" />
                                {session.facilitator.fullName}
                              </S.SessionMetaItem>
                            )}
                          </S.SessionCardMeta>
                        </S.SessionCard>
                      ))
                    )}
                  </S.SessionsSection>

                </S.DetailScrollArea>
              )}
            </S.EventsDetailPanel>

          </S.EventsMasterDetail>
        </DashboardContent>

        <Footer />
      </MainArea>

          Create Event Modal — StepperFormModal (2-step wizard: event + sessions)
          onSuccess re-fetches the events list so the new event appears immediately
      ──────────────────────────────────────────────────────────────────────── */}
      {showCreateModal && (
        <StepperFormModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            fetchEvents();
          }}
        />
      )}

          Edit Event Modal — simple form (no session editing)
          calls updateEvent(id, editForm) on submit
      ──────────────────────────────────────────────────────────────────────── */}
      {editModalOpen && (
        <>
          <S.ModalOverlay onClick={() => !editSubmitting && setEditModalOpen(false)} />
          <S.ModalCard
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-modal-title"
          >
            <S.ModalHeader>
              <S.ModalTitle id="edit-modal-title">
                <EditSVG size={16} aria-hidden="true" />
                Edit Event
              </S.ModalTitle>
              <S.ModalCloseBtn
                onClick={() => !editSubmitting && setEditModalOpen(false)}
                aria-label="Close edit modal"
              >
                <CloseSVG size={16} />
              </S.ModalCloseBtn>
            </S.ModalHeader>

            <form onSubmit={handleEditSubmit}>
              <S.ModalBody>
                {editError && (
                  <S.FormError role="alert">
                    <AlertCircleSVG size={14} aria-hidden="true" />
                    {editError}
                  </S.FormError>
                )}

                <S.FormGrid>
                  {/* title — full width */}
                  <S.FormGroup style={{ gridColumn: '1 / -1' }}>
                    <S.FormLabel htmlFor="edit-title">Event Title</S.FormLabel>
                    <S.FormInput
                      id="edit-title"
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
                      placeholder="Enter event title"
                      required
                    />
                  </S.FormGroup>

                  <S.FormGroup>
                    <S.FormLabel htmlFor="edit-date">Date</S.FormLabel>
                    <S.FormInput
                      id="edit-date"
                      type="date"
                      value={editForm.date}
                      onChange={(e) => setEditForm((f) => ({ ...f, date: e.target.value }))}
                      required
                    />
                  </S.FormGroup>

                  <S.FormGroup>
                    <S.FormLabel htmlFor="edit-status">Status</S.FormLabel>
                    <S.FormSelect
                      id="edit-status"
                      value={editForm.status}
                      onChange={(e) => setEditForm((f) => ({ ...f, status: e.target.value }))}
                    >
                      <option value="Draft">Draft</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </S.FormSelect>
                  </S.FormGroup>

                  <S.FormGroup>
                    <S.FormLabel htmlFor="edit-venue">Venue</S.FormLabel>
                    <S.FormInput
                      id="edit-venue"
                      type="text"
                      value={editForm.venue}
                      onChange={(e) => setEditForm((f) => ({ ...f, venue: e.target.value }))}
                      placeholder="Event venue"
                      required
                    />
                  </S.FormGroup>

                  <S.FormGroup>
                    <S.FormLabel htmlFor="edit-capacity">Capacity</S.FormLabel>
                    <S.FormInput
                      id="edit-capacity"
                      type="number"
                      min="1"
                      value={editForm.capacity}
                      onChange={(e) => setEditForm((f) => ({ ...f, capacity: Number(e.target.value) }))}
                    />
                  </S.FormGroup>

                  {/* description — full width */}
                  <S.FormGroup style={{ gridColumn: '1 / -1' }}>
                    <S.FormLabel htmlFor="edit-description">Description</S.FormLabel>
                    <S.FormTextarea
                      id="edit-description"
                      value={editForm.description}
                      onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
                      placeholder="Event description (optional)"
                      rows={3}
                    />
                  </S.FormGroup>
                </S.FormGrid>
              </S.ModalBody>

              <S.ModalFooter>
                <S.ModalCancelBtn
                  type="button"
                  onClick={() => !editSubmitting && setEditModalOpen(false)}
                  disabled={editSubmitting}
                >
                  Cancel
                </S.ModalCancelBtn>
                <S.ModalSubmitBtn type="submit" disabled={editSubmitting}>
                  {editSubmitting ? 'Saving...' : 'Save Changes'}
                </S.ModalSubmitBtn>
              </S.ModalFooter>
            </form>
          </S.ModalCard>
        </>
      )}

          Delete Confirm Modal
          backend cascade-deletes sessions assigned to this event
      ──────────────────────────────────────────────────────────────────────── */}
      {deleteModalOpen && deleteTarget && (
        <>
          <S.ModalOverlay onClick={() => !deleting && setDeleteModalOpen(false)} />
          <S.ConfirmModalCard
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-delete-title"
          >
            <S.ConfirmIconArea>
              <TrashSVG size={28} aria-hidden="true" />
            </S.ConfirmIconArea>

            <S.ConfirmTitle id="confirm-delete-title">Delete Event?</S.ConfirmTitle>
            <S.ConfirmMessage>
              <strong>{deleteTarget.title ?? deleteTarget.name}</strong> and all its sessions
              will be permanently deleted. This cannot be undone.
            </S.ConfirmMessage>

            <S.ConfirmActions>
              <S.ModalCancelBtn
                onClick={() => !deleting && setDeleteModalOpen(false)}
                disabled={deleting}
              >
                Cancel
              </S.ModalCancelBtn>
              <S.ConfirmDeleteBtn onClick={handleDeleteConfirm} disabled={deleting}>
                <TrashSVG size={13} aria-hidden="true" />
                {deleting ? 'Deleting...' : 'Delete Event'}
              </S.ConfirmDeleteBtn>
            </S.ConfirmActions>
          </S.ConfirmModalCard>
        </>
      )}

    </DashboardShell>
  );
};

export default Events;

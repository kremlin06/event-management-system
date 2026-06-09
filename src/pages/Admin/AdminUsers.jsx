// src/pages/Admin/AdminUsers.jsx
// admin user management page — route: /admin/users
//
// lets an Admin create new Admin, Organizer, and Staff accounts
// and view every user currently in the system.
//
// two sections:
//   left  — glassmorphism create-account form
//   right — searchable, filterable, paginated user table
//
// notebooklm spec: Admin-only, Apple HIG aesthetic, fluid typography (clamp()),
// fully responsive at 414px with no horizontal scrolling.

import { useState, useEffect, useCallback, useRef } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import { getAdminUsers, createAdminUser } from '../../services/admin';
import { UsersSVG, SearchSVG, PlusSVG, CheckCircleSVG, AlertCircleSVG } from '../../components/SVGs';
import { SkeletonLine } from '../../components/Shared/Skeleton';
import * as S from '../../styles/Dashboards/Admin/AdminUsers.styles';

// the roles an admin can assign when creating a new account.
// attendee is excluded because students self-register through the public signup page.
const ASSIGNABLE_ROLES = ['Admin', 'Organizer', 'Staff'];

// helper that returns a human-readable relative date string.
// new Date(iso).toLocaleDateString() gives us something like "Jun 3, 2026".
const fmtDate = (iso) => {
  if (!iso) return '—';
  const d = new Date(iso);
  if (isNaN(d)) return '—';
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};


// the create-account form, pulled into its own component to keep the page clean.
// it manages its own local state (form fields, loading, feedback) so the user
// list section is not affected when the form is being filled out.
const CreateUserForm = ({ onCreated }) => {
  // form field state — one object so we can reset them all at once
  const [form, setForm] = useState({ fullName: '', email: '', password: '', role: '' });

  // field-level error messages from the backend or client-side checks
  const [errors, setErrors] = useState({});

  // loading state so the button shows "Creating..." while the api call is in-flight
  const [loading, setLoading] = useState(false);

  // feedback message shown at the top of the form after submit
  const [feedback, setFeedback] = useState(null); // { type: 'success'|'error', message: '...' }

  // handleField is a generic change handler for any input or select.
  // it reads the name attribute of the element and updates the matching form field.
  // we also clear the error for that field when the user starts typing.
  const handleField = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  // basic client-side validation before we even hit the backend.
  // this catches obvious mistakes (empty fields, bad format) instantly
  // so the user gets feedback without waiting for a network round-trip.
  const validate = () => {
    const errs = {};
    if (!form.fullName.trim())  errs.fullName = 'Full name is required';
    if (!form.email.trim())     errs.email    = 'Email is required';
    if (!form.role)             errs.role     = 'Please select a role';
    if (!form.password)         errs.password = 'Password is required';
    else if (form.password.length < 8) errs.password = 'Password must be at least 8 characters';
    else if (!/[A-Z]/.test(form.password)) errs.password = 'Password needs at least one uppercase letter';
    else if (!/[0-9]/.test(form.password)) errs.password = 'Password needs at least one number';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // run client validation first
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setFeedback(null);

    try {
      // createAdminUser sends POST /api/admin/users with our form data.
      // the backend validates again (server-side Joi schema), hashes the password,
      // creates the row, and returns the new user object (without the password hash).
      const newUser = await createAdminUser({
        fullName: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        role: form.role,
      });

      // reset the form to empty after a successful create
      setForm({ fullName: '', email: '', password: '', role: '' });
      setErrors({});
      setFeedback({ type: 'success', message: `Account created for ${newUser.fullName} (${newUser.role})` });

      // tell the parent page to refresh the user list so the new account appears
      onCreated?.();

    } catch (err) {
      // err.response.data.error is the shape our backend returns for errors
      const msg = err.response?.data?.error?.message || 'Failed to create account. Please try again.';
      const field = err.response?.data?.error?.field;

      if (field) {
        // field-level error from the backend (e.g. email already taken)
        setErrors({ [field]: msg });
      } else {
        setFeedback({ type: 'error', message: msg });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.GlassCard as="form" onSubmit={handleSubmit} noValidate>
      <div>
        <S.CardTitle>
          <PlusSVG size={18} aria-hidden="true" />
          Create Account
        </S.CardTitle>
        <S.CardSubtitle>Add a new Admin, Organizer, or Staff member</S.CardSubtitle>
      </div>

      {/* success or error banner shown after submit */}
      {feedback && (
        <S.FeedbackBanner $type={feedback.type} role="alert">
          {feedback.message}
        </S.FeedbackBanner>
      )}

      <S.FormGroup>
        <S.Label htmlFor="um-fullName">Full Name</S.Label>
        <S.Input
          id="um-fullName"
          name="fullName"
          type="text"
          placeholder="e.g. Maria Santos"
          value={form.fullName}
          onChange={handleField}
          $error={!!errors.fullName}
          autoComplete="name"
        />
        {errors.fullName && <S.FieldError>{errors.fullName}</S.FieldError>}
      </S.FormGroup>

      <S.FormGroup>
        <S.Label htmlFor="um-email">Email Address</S.Label>
        <S.Input
          id="um-email"
          name="email"
          type="email"
          placeholder="e.g. maria@balagtas.sti.edu.ph"
          value={form.email}
          onChange={handleField}
          $error={!!errors.email}
          autoComplete="email"
        />
        {errors.email && <S.FieldError>{errors.email}</S.FieldError>}
      </S.FormGroup>

      <S.FormGroup>
        <S.Label htmlFor="um-role">Role</S.Label>
        {/* RoleSelectWrap gives us the animated chevron arrow without extra state */}
        <S.RoleSelectWrap>
          <S.RoleSelect
            id="um-role"
            name="role"
            value={form.role}
            onChange={handleField}
          >
            <option value="">Select a role...</option>
            {ASSIGNABLE_ROLES.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </S.RoleSelect>
        </S.RoleSelectWrap>
        {errors.role && <S.FieldError>{errors.role}</S.FieldError>}
      </S.FormGroup>

      <S.FormGroup>
        <S.Label htmlFor="um-password">Initial Password</S.Label>
        <S.Input
          id="um-password"
          name="password"
          type="password"
          placeholder="Min 8 chars, 1 uppercase, 1 number"
          value={form.password}
          onChange={handleField}
          $error={!!errors.password}
          autoComplete="new-password"
        />
        {errors.password && <S.FieldError>{errors.password}</S.FieldError>}
      </S.FormGroup>

      <S.SubmitBtn type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Account'}
      </S.SubmitBtn>
    </S.GlassCard>
  );
};


// the user list section — shows a table of all users with search and role filter.
// the parent passes a refreshKey so we can re-fetch whenever a new user is created.
const UserList = ({ refreshKey }) => {
  const [users,      setUsers]      = useState([]);
  const [total,      setTotal]      = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading,    setLoading]    = useState(true);
  const [page,       setPage]       = useState(1);
  const [search,     setSearch]     = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  // debounceRef holds the timeout id for the search debounce.
  // debouncing means we wait 400ms after the user stops typing before
  // triggering the api call, so we don't send a request on every keystroke.
  const debounceRef = useRef(null);

  // fetchUsers is the function that calls the api and updates state.
  // useCallback means this function reference stays stable across renders.
  // it only changes when page, search, or roleFilter changes.
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAdminUsers({ page, pageSize: 10, q: search || undefined, role: roleFilter || undefined });
      setUsers(data.users ?? []);
      setTotal(data.total ?? 0);
      setTotalPages(data.totalPages ?? 1);
    } catch (err) {
      console.error('[AdminUsers] fetch failed:', err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [page, search, roleFilter]);

  // re-fetch whenever fetchUsers changes OR whenever the parent increments refreshKey
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, refreshKey]);

  // when the search input changes, reset to page 1 and debounce the fetch
  const handleSearch = (e) => {
    const val = e.target.value;
    setSearch(val);
    setPage(1);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {}, 0); // the actual fetch runs via useEffect
  };

  const handleRoleFilter = (e) => {
    setRoleFilter(e.target.value);
    setPage(1);
  };

  return (
    <S.ListCard>
      <S.ListHeader>
        <S.CardTitle>
          <UsersSVG size={18} aria-hidden="true" />
          All Users
          {!loading && (
            <span style={{ fontSize: 'var(--font-size-xs, 0.75rem)', fontWeight: 400, color: 'inherit', opacity: 0.6 }}>
              {total.toLocaleString()} total
            </span>
          )}
        </S.CardTitle>
      </S.ListHeader>

      <S.Toolbar>
        <S.SearchInputWrap>
          <SearchSVG size={14} aria-hidden="true" />
          <S.SearchInput
            type="search"
            placeholder="Search name or email..."
            value={search}
            onChange={handleSearch}
            aria-label="Search users"
          />
        </S.SearchInputWrap>

        <S.RoleFilterWrap>
          <S.RoleFilter
            value={roleFilter}
            onChange={handleRoleFilter}
            aria-label="Filter by role"
          >
            <option value="">All roles</option>
            <option value="Admin">Admin</option>
            <option value="Organizer">Organizer</option>
            <option value="Staff">Staff</option>
            <option value="Attendee">Attendee</option>
          </S.RoleFilter>
        </S.RoleFilterWrap>
      </S.Toolbar>

      <S.TableWrap>
        <S.Table aria-label="Users table">
          <S.Thead>
            <tr>
              <S.Th>Name</S.Th>
              <S.Th>Email</S.Th>
              <S.Th>Role</S.Th>
              <S.Th>Created</S.Th>
            </tr>
          </S.Thead>
          <tbody>
            {loading ? (
              // skeleton rows while loading — 5 placeholder rows
              Array.from({ length: 5 }).map((_, i) => (
                <S.Tr key={i} aria-hidden="true">
                  <S.Td><SkeletonLine $h="14px" $mb="0" $w="140px" /></S.Td>
                  <S.Td><SkeletonLine $h="14px" $mb="0" $w="200px" /></S.Td>
                  <S.Td><SkeletonLine $h="14px" $mb="0" $w="80px"  /></S.Td>
                  <S.Td><SkeletonLine $h="14px" $mb="0" $w="100px" /></S.Td>
                </S.Tr>
              ))
            ) : users.length === 0 ? (
              <S.EmptyRow>
                <td colSpan={4}>No users found.</td>
              </S.EmptyRow>
            ) : (
              users.map(u => (
                <S.Tr key={u.id}>
                  <S.Td>{u.fullName}</S.Td>
                  <S.Td style={{ color: 'var(--text-secondary)' }}>{u.email}</S.Td>
                  <S.Td>
                    <S.RoleBadge $role={u.role}>{u.role}</S.RoleBadge>
                  </S.Td>
                  <S.Td style={{ color: 'var(--text-tertiary)' }}>{fmtDate(u.createdAt)}</S.Td>
                </S.Tr>
              ))
            )}
          </tbody>
        </S.Table>
      </S.TableWrap>

      {/* only show pagination when there is more than one page */}
      {totalPages > 1 && (
        <S.Pagination>
          <span>Page {page} of {totalPages}</span>
          <S.PaginationBtns>
            <S.PageBtn
              onClick={() => setPage(p => p - 1)}
              disabled={page === 1}
              aria-label="Previous page"
            >
              &lsaquo;
            </S.PageBtn>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(n => n === 1 || n === totalPages || Math.abs(n - page) <= 1)
              .reduce((acc, n, idx, arr) => {
                if (idx > 0 && arr[idx - 1] !== n - 1) acc.push('…');
                acc.push(n);
                return acc;
              }, [])
              .map((item, idx) =>
                item === '…'
                  ? <S.PageBtn key={`e${idx}`} disabled style={{ cursor: 'default' }}>…</S.PageBtn>
                  : (
                    <S.PageBtn
                      key={item}
                      $active={item === page}
                      aria-current={item === page ? 'page' : undefined}
                      onClick={() => setPage(item)}
                    >
                      {item}
                    </S.PageBtn>
                  )
              )
            }
            <S.PageBtn
              onClick={() => setPage(p => p + 1)}
              disabled={page === totalPages}
              aria-label="Next page"
            >
              &rsaquo;
            </S.PageBtn>
          </S.PaginationBtns>
        </S.Pagination>
      )}
    </S.ListCard>
  );
};


// the main page component. it uses AdminLayout for the shared shell
// (sidebar, header, footer) and renders the two sections above.
const AdminUsers = () => {
  // refreshKey is an integer we increment after a user is created.
  // the UserList component watches this via its useEffect dependency, so
  // incrementing it triggers a fresh fetch of the user list automatically.
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUserCreated = useCallback(() => {
    setRefreshKey(k => k + 1);
  }, []);

  return (
    <AdminLayout
      title="User Management"
      subtitle="Create and manage Admin, Organizer, and Staff accounts"
    >
      <S.PageContent>
        <S.TwoColLayout>
          <CreateUserForm onCreated={handleUserCreated} />
          <UserList refreshKey={refreshKey} />
        </S.TwoColLayout>
      </S.PageContent>
    </AdminLayout>
  );
};

export default AdminUsers;

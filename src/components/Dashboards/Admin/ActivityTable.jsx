// src/components/Dashboards/Admin/ActivityTable.jsx
// ADDED: Paginated activity table from D4 (Attendance) + D3 (Registration) — Phase 3
// PII masking: studentName/email are blurred unless hasExportPermission === true
import {
  ActivityTable as Table,
  AThead, ATh, ATbody, ATr, ATd,
  ActivityCardStack, ActivityMobileCard,
  Badge, MaskedCell,
  PaginationRow, PaginationInfo, PaginationBtns, PageBtn,
} from '../../../styles/Dashboards/Admin/AdminDashboard.styles';

// Helpers

const formatTime = (iso) => {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  }) + ' ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

const maskName = (name) => {
  if (!name) return '—';
  const [first, ...rest] = name.split(' ');
  return `${first} ${rest.map(() => '****').join(' ')}`;
};

const maskEmail = (email) => {
  if (!email) return '—';
  const [user, domain] = email.split('@');
  return `${user.slice(0, 2)}****@${domain}`;
};

// Component

const ActivityTableComponent = ({
  data = [],
  total = 0,
  page = 1,
  pageSize = 10,
  onPageChange,
  hasExportPermission = false,
  loading = false,
}) => {
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize + 1;
  const end   = Math.min(page * pageSize, total);

  const renderName  = (name)  => hasExportPermission ? name  || '—' : <MaskedCell title="PII masked — Admin only">{maskName(name)}</MaskedCell>;
  const renderEmail = (email) => hasExportPermission ? email || '—' : <MaskedCell title="PII masked — Admin only">{maskEmail(email)}</MaskedCell>;

  // Page numbers to show (max 5 around current)
  const pageNumbers = [];
  const delta = 2;
  for (let i = Math.max(1, page - delta); i <= Math.min(totalPages, page + delta); i++) {
    pageNumbers.push(i);
  }

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-tertiary)' }}>
        Loading activity log...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>
        No activity records found.
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <Table aria-label="Activity log">
        <AThead>
          <tr>
            <ATh>ID</ATh>
            <ATh>Student</ATh>
            <ATh>Email</ATh>
            <ATh>Event</ATh>
            <ATh>Session</ATh>
            <ATh>Action</ATh>
            <ATh>Status</ATh>
            <ATh>Time</ATh>
          </tr>
        </AThead>
        <ATbody>
          {data.map((row) => (
            <ATr key={row.id}>
              <ATd>
                <Badge $variant="source" $type={row.source}>
                  {row.id}
                </Badge>
              </ATd>
              <ATd style={{ fontWeight: 500 }}>{renderName(row.studentName)}</ATd>
              <ATd style={{ color: 'var(--text-secondary)' }}>{renderEmail(row.email)}</ATd>
              <ATd>{row.event}</ATd>
              <ATd style={{ color: 'var(--text-tertiary)' }}>{row.session || '—'}</ATd>
              <ATd>{row.action}</ATd>
              <ATd>
                <Badge $variant="status" $type={row.status}>
                  {row.status}
                </Badge>
              </ATd>
              <ATd style={{ color: 'var(--text-tertiary)', whiteSpace: 'nowrap', fontSize: '0.8rem' }}>
                {formatTime(row.timestamp)}
              </ATd>
            </ATr>
          ))}
        </ATbody>
      </Table>

      {/* Mobile card stack */}
      <ActivityCardStack>
        {data.map((row) => (
          <ActivityMobileCard key={row.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Badge $variant="source" $type={row.source}>{row.id}</Badge>
              <Badge $variant="status" $type={row.status}>{row.status}</Badge>
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>
              {renderName(row.studentName)}
            </div>
            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
              {row.event}{row.session ? ` — ${row.session}` : ''}
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>
              {row.action} · {formatTime(row.timestamp)}
            </div>
          </ActivityMobileCard>
        ))}
      </ActivityCardStack>

      {/* Pagination */}
      {totalPages > 1 && (
        <PaginationRow>
          <PaginationInfo>
            Showing {start}–{end} of {total} records
          </PaginationInfo>

          <PaginationBtns role="navigation" aria-label="Pagination">
            <PageBtn
              onClick={() => onPageChange(1)}
              disabled={page === 1}
              aria-label="First page"
            >
              «
            </PageBtn>
            <PageBtn
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
              aria-label="Previous page"
            >
              ‹
            </PageBtn>

            {pageNumbers.map((n) => (
              <PageBtn
                key={n}
                onClick={() => onPageChange(n)}
                $active={n === page}
                aria-label={`Page ${n}`}
                aria-current={n === page ? 'true' : undefined}
              >
                {n}
              </PageBtn>
            ))}

            <PageBtn
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
              aria-label="Next page"
            >
              ›
            </PageBtn>
            <PageBtn
              onClick={() => onPageChange(totalPages)}
              disabled={page === totalPages}
              aria-label="Last page"
            >
              »
            </PageBtn>
          </PaginationBtns>
        </PaginationRow>
      )}
    </>
  );
};

export default ActivityTableComponent;

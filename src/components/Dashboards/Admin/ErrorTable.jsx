import { useState } from 'react';
import Papa from 'papaparse';
import Button from '../../Button';
import * as S from '../../../styles/Dashboards/Admin/AttendeeManagement.styles';

const PAGE_SIZE = 10;

/**
 * Paginated error table for bulk upload failures.
 * rows: [{ row, email, studentId, field, error }]
 */
const ErrorTable = ({ rows = [] }) => {
  const [page, setPage] = useState(1);

  const totalPages  = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const start       = (page - 1) * PAGE_SIZE;
  const visibleRows = rows.slice(start, start + PAGE_SIZE);

  const handleExport = () => {
    const csv = Papa.unparse(rows.map(r => ({
      'Row #': r.row,
      'Email': r.email,
      'Student ID': r.studentId,
      'Field': r.field,
      'Error': r.error,
    })));
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `upload-errors-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>
          {rows.length} row{rows.length !== 1 ? 's' : ''} with errors
        </span>
        <Button type="button" variant="secondary" onClick={handleExport}>
          Export Errors as CSV
        </Button>
      </div>

      <S.TableWrapper>
        <S.Table role="table" aria-label="Upload error report">
          <S.Thead>
            <tr role="row">
              <S.Th scope="col">Row</S.Th>
              <S.Th scope="col">Email</S.Th>
              <S.Th scope="col">Student ID</S.Th>
              <S.Th scope="col">Field</S.Th>
              <S.Th scope="col">Error</S.Th>
            </tr>
          </S.Thead>
          <tbody>
            {visibleRows.map((r, i) => (
              <S.Tr key={start + i} role="row">
                <S.Td>{r.row}</S.Td>
                <S.Td>{r.email || '—'}</S.Td>
                <S.Td>{r.studentId || '—'}</S.Td>
                <S.Td style={{ fontStyle: 'italic', opacity: 0.8 }}>{r.field || '—'}</S.Td>
                <S.ErrorCell>{r.error}</S.ErrorCell>
              </S.Tr>
            ))}
          </tbody>
        </S.Table>

        {totalPages > 1 && (
          <S.Pagination>
            <S.PaginationInfo>
              Showing {start + 1}–{Math.min(start + PAGE_SIZE, rows.length)} of {rows.length}
            </S.PaginationInfo>
            <S.PaginationControls>
              <S.PageBtn
                onClick={() => setPage(p => Math.max(1, p - 1))}
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
                  item === '…' ? (
                    <S.PageBtn key={`ellipsis-${idx}`} disabled style={{ cursor: 'default' }}>…</S.PageBtn>
                  ) : (
                    <S.PageBtn
                      key={item}
                      $active={item === page}
                      aria-current={item === page ? 'page' : undefined}
                      onClick={() => setPage(item)}
                    >
                      {item}
                    </S.PageBtn>
                  ),
                )}
              <S.PageBtn
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                aria-label="Next page"
              >
                &rsaquo;
              </S.PageBtn>
            </S.PaginationControls>
          </S.Pagination>
        )}
      </S.TableWrapper>
    </div>
  );
};

export default ErrorTable;

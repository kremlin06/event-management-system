import api from './api';

export const getOverview = (filters = {}) =>
  api.get('/admin/analytics/overview', { params: filters }).then(r => r.data);

export const getSessionAnalytics = (filters = {}) =>
  api.get('/admin/analytics/sessions', { params: filters }).then(r => r.data);

export const getReportPreview = (params = {}) =>
  api.get('/admin/reports/preview', { params }).then(r => r.data);

// returns a Blob for browser-triggered download
export const exportReport = async (params = {}) => {
  const res = await api.get('/admin/reports/export', {
    params,
    responseType: 'blob',
  });

  // extract filename from Content-Disposition or build a fallback
  const disposition = res.headers['content-disposition'] || '';
  const match       = disposition.match(/filename="?([^";\s]+)"?/);
  const filename    = match ? match[1] : `ems-report.${params.format || 'csv'}`;

  // trigger browser download without navigating away
  const url = URL.createObjectURL(new Blob([res.data]));
  const a   = document.createElement('a');
  a.href    = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export default { getOverview, getSessionAnalytics, getReportPreview, exportReport };

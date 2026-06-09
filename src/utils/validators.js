// Individual field validators
// Each returns an error string on failure, or null on success.
// Keep these in sync with the Joi schemas in backend/middleware/validate.js.

export const validateFullName = (value) => {
  if (!value?.trim()) return 'Full name is required';
  if (value.trim().length < 2) return 'Name must be at least 2 characters';
  if (value.trim().length > 100) return 'Name must be 100 characters or fewer';
  return null;
};

export const validateEmail = (value, options = {}) => {
  const { requireCampusDomain = false } = options;
  if (!value?.trim()) return 'Campus email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Must be a valid email address';
  // old: checked for 'sti' anywhere in the email — too loose (accepted any @sti.edu.ph domain).
  // new: requires the exact school domain balagtas.sti.edu.ph
  // format: firstname.studentid@balagtas.sti.edu.ph
  if (requireCampusDomain && !value.toLowerCase().endsWith('@balagtas.sti.edu.ph')) {
    return 'Please use your official campus email (e.g. delfin.341383@balagtas.sti.edu.ph)';
  }
  return null;
};

export const validateStudentId = (value) => {
  if (!value?.trim()) return 'Student ID is required';

  const trimmed = value.trim();

  // old: accepted "STI-BAL-2024-00123" campus prefix format — that was the assumed
  //      format before the actual school format was confirmed. removed.
  // old formatCampus = /^(STI-)?[A-Z]{2,4}-?\d{4}-?\d{3,6}$/i;

  // actual school format — numeric only, no dashes, no prefix letters.
  //   short form: 6 digits  (e.g. 341383 — as it appears in the campus email)
  //   full form: 11 digits (e.g. 02000341383 — the full school-issued number)
  const formatNumeric = /^\d{6,11}$/;

  if (!formatNumeric.test(trimmed)) {
    return 'Invalid Student ID — must be 6–11 digits (e.g. 341383 or 02000341383)';
  }
  return null;
};

export const validateDepartment = (value, allowed = []) => {
  if (!value) return 'Please select your department';
  if (allowed.length && !allowed.includes(value)) return 'Invalid department selection';
  return null;
};

export const validatePassword = (value) => {
  if (!value) return 'Password is required';
  // Minimum 8 characters (matches backend Joi schema).
  // No frontend max — backend accepts up to 128 characters.
  if (value.length < 8)     return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
  if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
  return null;
};

export const validateConfirmPassword = (password, confirm) => {
  if (!confirm) return 'Please confirm your password';
  if (password !== confirm) return 'Passwords do not match';
  return null;
};

// Full form validator
// Calls every individual validator and collects all field errors.
// Returns an object; empty object = form is valid.
//
// NOTE: The `data` parameter has been removed. It was an old stale argument
// that defaulted to {} and caused these two bugs:
//   - `errors.email` was always pre-set to 'Invalid email' (data.email is always undefined)
//   - `errors.password` was always pre-set to '…at least 6 characters' (same reason)
// Those lines have been deleted. All validation now flows through the proper
// per-field validators below.

export const validateSignupForm = (formData, options = {}) => {
  const errors = {};

  const fullNameErr = validateFullName(formData.fullName);
  if (fullNameErr) errors.fullName = fullNameErr;

  const emailErr = validateEmail(formData.email, options);
  if (emailErr) errors.email = emailErr;

  const studentIdErr = validateStudentId(formData.studentId);
  if (studentIdErr) errors.studentId = studentIdErr;

  const deptErr = validateDepartment(formData.department, options.allowedDepartments);
  if (deptErr) errors.department = deptErr;

  const passErr = validatePassword(formData.password);
  if (passErr) errors.password = passErr;

  const confirmErr = validateConfirmPassword(formData.password, formData.confirmPassword);
  if (confirmErr) errors.confirmPassword = confirmErr;

  if (!formData.agreeToTerms) {
    errors.agreeToTerms = 'You must agree to the Terms of Service and Privacy Policy';
  }

  return errors;
};

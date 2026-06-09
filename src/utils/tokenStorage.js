// src/utils/tokenStorage.js
// centralised access-token storage helpers.
//
// "Remember Me" behaviour:
//   rememberMe = true  → localStorage   (persists across browser restarts)
//   rememberMe = false → sessionStorage (cleared when the tab / browser closes)
//
// the HTTP-only refresh token cookie is always managed by the backend — we never
// touch it in JavaScript. what we control here is only the SHORT-LIVED access
// token (15 min default) and the cached user object.
//
// all reads check localStorage first, then sessionStorage, so the interceptor in
// api.js and the initAuth in AuthContext work identically regardless of which
// storage was used at login time.

const TOKEN_KEY = 'authToken';
const USER_KEY  = 'user';

// token

/** returns the stored access token from whichever storage holds it */
export const getToken = () =>
  localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);

/**
 * persist the access token in the correct storage.
 * also clears the other storage so stale tokens never co-exist.
 * @param {string} token - the raw JWT access token
 * @param {boolean} rememberMe - true → localStorage, false → sessionStorage
 */
export const setToken = (token, rememberMe) => {
  if (rememberMe) {
    localStorage.setItem(TOKEN_KEY, token);
    sessionStorage.removeItem(TOKEN_KEY);
  } else {
    sessionStorage.setItem(TOKEN_KEY, token);
    localStorage.removeItem(TOKEN_KEY);
  }
};

// user cache

/** returns the cached user object from whichever storage holds it */
export const getCachedUser = () => {
  const raw = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
  try { return raw ? JSON.parse(raw) : null; }
  catch { return null; }
};

/**
 * cache the user object alongside the token in the same storage.
 * @param {object} user
 * @param {boolean} rememberMe
 */
export const setCachedUser = (user, rememberMe) => {
  const str = JSON.stringify(user);
  if (rememberMe) {
    localStorage.setItem(USER_KEY, str);
    sessionStorage.removeItem(USER_KEY);
  } else {
    sessionStorage.setItem(USER_KEY, str);
    localStorage.removeItem(USER_KEY);
  }
};

// clear

/**
 * wipe all auth data from both storages.
 * called on logout (explicit) and on session-expired force-logout.
 */
export const clearTokenStorage = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
};

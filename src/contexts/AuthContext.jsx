import { createContext, useState, useEffect, useCallback } from 'react';
import { getCurrentUser, logoutApi } from '../services/auth';
import {
  getToken,
  setToken,
  setCachedUser,
  clearTokenStorage,
} from '../utils/tokenStorage';

// creating the auth context with null default value
// this will be replaced by the provider's value when components consume it
// the null default is intentional, so useAuth() throws if used outside provider
const AuthContext = createContext(null);

// the provider component that wraps our app and supplies auth state to all children
// this is where we manage the global auth state, so any component can access it
export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [loading, setLoading] = useState(true);
   const [sessionExpired, setSessionExpired] = useState(false); // tracks whether the session expired mid-use (vs. never logged in). 
   // used to show a "session expired" toast on the login page.

   // effect that runs once on mount to check if user is already authenticated
   // this is the "remember me" logic, but using localStorage instead of cookies
   useEffect(() => {
      const initAuth = async () => {
         // old: localStorage.getItem('authToken') — only checked one storage.
         // now: getToken() checks localStorage (rememberMe) then sessionStorage
         //      so both session-only and persistent tokens are detected on reload.
         const token = getToken();
         if (!token) {
            setLoading(false);
            return;
         }

         try {
            // calling api to get current user, this will fail if token is expired/invalid
            const userData = await getCurrentUser();
            // if successful, set user state and mark as authenticated
            setUser(userData);
            setIsAuthenticated(true);
         } catch {
            // token is bad — clear from both storages and stay logged out.
            // old: only cleared localStorage; now uses clearTokenStorage().
            clearTokenStorage();
         } finally {
         // done checking, set loading to false so app can render
         // this prevents flickering or wrong redirects on page load
            setLoading(false);
         }
      };
      initAuth();
   }, []); // empty deps array = run once on mount, like componentDidMount

   /* 
      api.js fires this event when a 401 refresh cycle fails (token fully expired).
      we sync context state here so the UI reflects the logged-out state before the redirect kicks in.
   */
   useEffect(() => {
      const handleSessionExpired = () => {
         setUser(null);
         setIsAuthenticated(false);
         setSessionExpired(true);
      };

      window.addEventListener('auth:session-expired', handleSessionExpired);
      return () => window.removeEventListener('auth:session-expired', handleSessionExpired);
   }, []);

   // login — called after a successful authentication response.
   // added: rememberMe param (default false) routes tokens to the correct storage:    //   true  → localStorage   (persists across browser restarts for 30 days via the
   //            backend's persistent HTTP-only refresh cookie)
   //   false → sessionStorage (cleared when the tab or browser closes; backend issues
   //            a session-only HTTP-only refresh cookie)
   //
   // old: always wrote to localStorage regardless of the checkbox state.
   const login = useCallback((accessToken, userData, rememberMe = false) => {
      setToken(accessToken, rememberMe);
      setCachedUser(userData, rememberMe);
      setUser(userData);
      setIsAuthenticated(true);
      setSessionExpired(false);
   }, []);

   // logout function, clears everything and calls backend to invalidate token
   // async because we might need to wait for backend confirmation
   const logout = useCallback(async () => {
      try {
         // logoutApi calls clearTokenStorage() which wipes both localStorage
         // and sessionStorage, then POSTs /auth/logout so the backend clears
         // the HTTP-only refresh token cookie (persistent or session).
         await logoutApi();
      } finally {
         setUser(null);
         setIsAuthenticated(false);
         // the component handles the redirect so any page can customise the destination.
      }
   }, []);

   // function to update user profile data without re-fetching from backend
   // useful for optimistic updates or after editing profile
   // const updateProfile = (updatedData) => {
   //    // spreading previous user data with new updates, immutable update pattern
   //    setUser(prev => prev ? { ...prev, ...updatedData } : null);
   // };

   // called after profile edits so the navbar / dashboard reflect changes
   // without requiring a full re-login.
   const updateUser = useCallback((updatedFields) => {
      setUser((prev) => {
         const merged = { ...prev, ...updatedFields };
         localStorage.setItem('user', JSON.stringify(merged));
         return merged;
      });
   }, []);

   const value = {
      user,
      isAuthenticated,
      loading,
      sessionExpired,
      login,
      logout,
      updateUser,
   };

   // returning the context provider with all the auth stuff in the value object
   // any component wrapped by this provider can now use useAuth() to get these values
   return (
      <AuthContext.Provider value={value}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthContext;


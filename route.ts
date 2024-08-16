/**
 * An Array of rotues that are arcesible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = [
  "/",
  "/about",
  "/events",
  "/rank",
  "/events/*",
  "/profile/*",
  "/404",
];

/**
 * An Array of rotues that are arcesible to the authenticated user
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */

export const authRoutes = ["/auth/login", "/auth/register"];

/**
 * The Prefix for API authentication routes
 * Routes for api authentication will be prefixed with this
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/profile";
export const DEFAULT_USERNAME_REDIRECT = "/auth/username";

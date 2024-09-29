import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  protectedRoute, // Pastikan ini daftar route yang perlu dilindungi
} from "./route";

export default async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const session = await auth(); // Mendapatkan sesi pengguna
  const isLoggedIn = !!session?.user;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // Jika ini adalah route otentikasi (login/register), redirect jika sudah login
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)); // Arahkan ke default jika sudah login
    }
    return NextResponse.next(); // Biarkan user masuk ke halaman auth
  }

  // Cek apakah ini route yang dilindungi
  const isProtectedRoute = protectedRoute.includes(nextUrl.pathname);

  // Jika ini route yang dilindungi dan user belum login, redirect ke /auth/login
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl)); // Redirect ke halaman login
  }

  return NextResponse.next(); // Lanjutkan ke route yang diminta jika sudah login
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|otf|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/event/:slug*", // Route untuk event atau halaman lain yang perlu middleware
  ],
};

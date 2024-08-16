import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./route";


export default async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const session = await auth();
  const isLoggedIn = !!session?.user;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  const matchRoute = (route: string, pathname: string) => {
    const regex = new RegExp(`^${route.replace("*", ".*")}$`);
    return regex.test(pathname);
  };

  const isPublicRoute = publicRoutes.some((route) => {
    const isMatch = matchRoute(route, nextUrl.pathname);
    return isMatch;
  });
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  return NextResponse.next(); // Lanjutkan ke route yang diminta
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|otf|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/event/:slug*",
  ],
};

import { NextRequest, NextResponse } from "next/server";

const AUTH_REQUIRED_PATHS = [
  "/home",
  "/meetings",
  "/settings",
  "/uploads",
  "/integrations",
  "/upgrade",
  "more",
];
const NO_AUTH_REQUIRED_PATHS = ["/", "login"];

export default function proxy(req: NextRequest) {
  const customToken = req.cookies.get("jwtToken");
  const pathname = req.nextUrl.pathname;

  const isAuthenticated = Boolean(customToken);

  // Redirect logged in user
  if (isAuthenticated && NO_AUTH_REQUIRED_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // Redirect not logged in user
  if (!isAuthenticated && AUTH_REQUIRED_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect non-authenticated users from any random route
  if (!isAuthenticated && !NO_AUTH_REQUIRED_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect authenticated users from random routes
  if (isAuthenticated && !AUTH_REQUIRED_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|.*\\..*).*)"],
};

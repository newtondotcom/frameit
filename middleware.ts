import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith("/auth")

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
      return null
    }

    if (!isAuth && req.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL(`/auth/signin?callbackUrl=${req.nextUrl.pathname}`, req.url))
    }
    return null
  },
  {
    callbacks: {
      async authorized() {
        // This is a no-op, we handle the authorization in the middleware function
        return true
      },
    },
  },
)

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
}


import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  callbacks: {
    async authorized() {
      // This is a no-op, we handle the authorization in the middleware function
      return true;
    },
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};

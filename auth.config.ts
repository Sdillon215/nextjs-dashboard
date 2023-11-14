import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    providers: [],
    // * You can use the pages option to specify the route for custom sign-in,
    // * sign-out, and error pages. It is not required, but if you don't provide it,
    // * NextAuth.js will use its default sign-in, sign-out, and error pages.
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
    },
} satisfies NextAuthConfig;
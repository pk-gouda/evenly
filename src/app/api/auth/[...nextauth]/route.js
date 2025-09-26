// src/app/api/auth/[...nextauth]/route.js

// Quick sanity log (dev only) to prove envs are loaded
if (process.env.NODE_ENV !== "production") {
  console.log(
    "[OAuth env check]",
    (process.env.GOOGLE_CLIENT_ID || "").slice(0, 20),
    (process.env.GOOGLE_CLIENT_SECRET || "").slice(0, 6),
    process.env.NEXTAUTH_URL
  );
}


import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Use your app secret (must exist in .env.local)
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.name = profile.name ?? token.name;
        token.picture = profile.picture ?? token.picture;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.name = token.name ?? session.user.name;
        session.user.image = token.picture ?? session.user.image;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

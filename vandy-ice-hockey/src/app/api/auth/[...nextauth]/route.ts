import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url === baseUrl + "/api/auth/signout") {
        return process.env.NEXT_PUBLIC_BASE_URL || baseUrl;
      }
      // For sign-in, redirect to the desired page but prevent looping
      if (url === baseUrl + "/loadingPage") {
        return baseUrl + "/loadingPage";
      }
      return baseUrl;
    }
  }
});

export { handler as GET, handler as POST };

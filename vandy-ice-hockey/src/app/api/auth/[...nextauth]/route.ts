import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      //TODO: change this so it parses the .env
      clientSecret: "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"
      // clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
});

export { handler as GET, handler as POST };
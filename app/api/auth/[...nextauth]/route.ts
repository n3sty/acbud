import NextAuth from "next-auth";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token, user }) {
      if (session.user && session.user.name) {
        session.user.username = session.user.name
          .split(" ")
          .join("")
          .toLocaleLowerCase();

        session.user.id = token.sub as string;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      const userExists = await checkIfUserExists();

      console.log("Base URL: ", baseUrl)
      console.log("url: ", url)

      if (userExists) {
        // Redirect to existing user page
        if (url.startsWith("/")) return `${baseUrl}${url}`
        else if (new URL(url).origin === baseUrl) return url
        return baseUrl
      } else {
      // Redirect to new user page
      return `${baseUrl}/new-user`;
      }
    },
  },
});

export { handler as GET, handler as POST };


function checkIfUserExists() {
  // throw new Error("Function not implemented.");
  return true
}


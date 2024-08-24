import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

import { db } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Github, Google],

  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      const userRef = doc(db, "users", user.id as string);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        // Create user in database
        await setDoc(userRef, {
          name: user.name,
          id: user.id,
          email: user.email,
          image: user.image,
          provider: account?.provider,
          createdAt: new Date(),
        });
      }
      return true;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },

    async session({ session, token }) {
      const userRef = doc(db, "users", token.id as string);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        session.user.email = userData.email;
        session.user.userProvider = userData.provider;
        session.user.id = userData.id;
        session.user.name = userData.name;
        session.user.image = userData.image;
      } else {
        throw new Error("User not found in database");
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },
  },
});

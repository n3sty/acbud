import { db } from "@/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { NextAuthOptions } from "next-auth";
import { v4 as uuidv4 } from "uuid";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  pages: { signIn: "/auth/signin" },

  callbacks: {
    async signIn({ user, account }) {
      const userCollection = collection(db, "users");
      const userDoc = doc(userCollection, user.email as string);

      const userSnapshot = await getDoc(userDoc);

      if (!userSnapshot.exists()) {
        // Generate a unique id for the user
        const userId = uuidv4();

        await setDoc(userDoc, {
          id: userId,
          name: user.name,
          email: user.email,
          image: user.image,
          provider: account?.provider,
          createdAt: new Date(),
        });
      }

      // const userRef = doc(db, "users", user.id as string);
      // const docSnap = await getDoc(userRef);

      // if (!docSnap.exists()) {
      //   // Create user in database
      //   await setDoc(userRef, {
      //     name: user.name,
      //     id: user.id,
      //     email: user.email,
      //     image: user.image,
      //     provider: account?.provider,
      //     createdAt: new Date(),
      //   });
      // }

      return true;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },

    async session({ session, token }) {
      const usersCollection = collection(db, "users");
      const userDoc = doc(usersCollection, session.user.email as string);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        session.user.id = userSnapshot.data().id;
      }

      // const userRef = doc(db, "users", token.id as string);
      // const docSnap = await getDoc(userRef);

      // if (docSnap.exists()) {
      //   const userData = docSnap.data();
      //   session.user.email = userData.email;
      //   session.user.userProvider = userData.provider;
      //   session.user.id = userData.id;
      //   session.user.name = userData.name;
      //   session.user.image = userData.image;
      // } else {
      //   throw new Error("User not found in database");
      // }

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
} satisfies NextAuthOptions;

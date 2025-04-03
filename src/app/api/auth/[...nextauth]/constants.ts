import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import SlackProvider from "next-auth/providers/slack";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/modules/lib/prisma-client/prisma-client";


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    SlackProvider({
      clientId: process.env.SLACK_CLIENT_ID!,
      clientSecret: process.env.SLACK_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async jwt({token, account, user}) {
      if (account && user) {
        token.id = user.id; // Ensure token.id is set to the user's ID
        token.createdAt = token.createdAt || new Date().toISOString(); // Store as ISO string
      }
      if (account?.provider === "github") {
        token.accessToken = account.access_token;
        const response = await fetch("https://api.github.com/user/emails", {
          headers: {
            Authorization: `Bearer ${account.access_token}`,
          }
        });
        const emails = await response.json();
        const primaryEmail = emails.find((email: any) => email.primary);
        token.emailVerified = primaryEmail?.verified || false;
      }
      return token;
    },
    async session({session, token}) {
      if (token) {
        session.user.id = token.id as string; // Use token.id
        session.user.createdAt = token.createdAt as Date; // Pass ISO string to session

        // Check if the user already exists in the database
        const existingUser = await prisma.user.findUnique({
          where: { id: token.id as string },
        });

        if (!existingUser) {
          let githubUserName = "Unknown"; // Default name in case of failure
          if (token.accessToken) {
            const response = await fetch("https://api.github.com/user", {
              headers: {
                Authorization: `Bearer ${token.accessToken}`,
              }
            });
            const githubUser = await response.json();
            githubUserName = githubUser;
          }

          // Create the user only if they don't already exist
          await prisma.user.create({
            data: {
              id: token.id as string,
              name: token.name, // Add the GitHub user's name
              createdAt: new Date(),
              image: token.picture,
              bio: token.sub,
              email: token.email,
            },
          });
        }

        if (token.accessToken) {
          const response = await fetch("https://api.github.com/user", {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            }
          });
          const githubUser = await response.json();
          session.user.description = githubUser.bio;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    signOut: "/auth/logout",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  }
};

export default NextAuth(authOptions);

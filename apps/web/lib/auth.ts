import {
  DefaultSession,
  DefaultUser,
  NextAuthOptions,
  Session,
} from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";
import prisma from "@repo/db/client";
import { importJWK, JWTPayload, SignJWT } from "jose";
import { randomUUID } from "crypto";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
    } & DefaultSession["user"];
    jwtToken?: string;
  }

  interface User extends DefaultUser {
    id?: string;
    jwtToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    accessToken?: string;
    jwtToken?: string;
  }
}

const generateJWT = async (payload: JWTPayload) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  const jwt = await new SignJWT({
    ...payload,
    iat: Math.floor(Date.now() / 1000),
    jti: randomUUID(),
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("365d")
    .sign(secret);
  return jwt;
};

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      try {
        if (!user.email) return false;
        const createdUser = await prisma.user.upsert({
          where: {
            email: user.email,
          },
          update: {},
          create: {
            email: user.email,
            name: user.name ?? user.email.split("@")[0],
            image: user.image,
          },
        });
        const payload = { id: createdUser.id };
        const jwt = await generateJWT(payload);
        const cookieStore = await cookies();
        cookieStore.set("jwtToken", jwt, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7,
          secure: true,
          sameSite: "lax",
          path: "/",
        });
        user.jwtToken = jwt;
      } catch (error) {
        console.log(error);
      }
      return true;
    },
    async jwt({ token, user, account }) {
      const newToken: JWT = token;
      if (account && user) {
        newToken.accessToken = account.access_token;
        newToken.id = user.id;
        newToken.jwtToken = user.jwtToken || newToken.jwtToken;
      }
      return newToken;
    },
    async session({ session, token }) {
      const newSession: Session = session;
      if (token) {
        session.user.id = token.id;
        session.jwtToken = token.jwtToken;
      }
      return newSession;
    },
  },
} satisfies NextAuthOptions;

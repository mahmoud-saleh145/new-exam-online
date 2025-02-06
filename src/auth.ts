import { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import FacebookProvider from "next-auth/providers/facebook";
import { JSON_HEADER } from "@/lib/constants/api.constants";
import AppError from "./lib/utils/app-error";



export const options: NextAuthOptions = {
    pages: {
        signIn: '/login',
        error: '/login',
        signOut: '/auth/signout',
    },
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),

        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),

        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID as string,
            clientSecret: process.env.TWITTER_CLIENT_SECRET as string
        }),

        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                const baseUrl = process.env.API + 'api/v1/auth/signin';

                const res = await fetch(baseUrl, {
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }
                    ),
                    headers: {
                        ...JSON_HEADER
                    },
                    method: 'POST',
                    cache: 'no-cache',
                })
                const result: APIResponse<LoginResponse> = await res.json()

                if (typeof result === 'object' && !('code' in result)) {

                    return {
                        token: result.token,
                        id: result.user._id,
                        ...result.user,
                    }

                }

                throw new AppError(result.message, result.code)
            }
        })

    ],
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.token = user.token
                token._id = user._id
                token.username = user.username
                token.firstName = user.firstName
                token.lastName = user.lastName
                token.email = user.email
                token.phone = user.phone
                token.role = user.role
                token.isVerified = user.isVerified
                token.createdAt = user.createdAt
                token.passwordResetCode = user.passwordResetCode
                token.passwordResetExpires = user.passwordResetExpires
                token.resetCodeVerified = user.resetCodeVerified
                token.passwordChangedAt = user.passwordChangedAt
            }
            return token
        },
        session: ({ session, token }) => {
            session._id = token._id
            session.username = token.username
            session.firstName = token.firstName
            session.lastName = token.lastName
            session.email = token.email
            session.phone = token.phone
            session.role = token.role
            session.isVerified = token.isVerified
            session.createdAt = token.createdAt
            session.passwordResetCode = token.passwordResetCode
            session.passwordResetExpires = token.passwordResetExpires
            session.resetCodeVerified = token.resetCodeVerified
            session.passwordChangedAt = token.passwordChangedAt
            return session
        }
    }
}



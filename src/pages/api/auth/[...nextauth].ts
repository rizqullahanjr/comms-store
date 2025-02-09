import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import jwt from 'jsonwebtoken'
import { compare } from 'bcrypt'

import { signIn, signInWithGoogle } from '@/services/auth/services'
import { IUsers } from '@/types/database'

const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string
                    password: string
                }
                const user = await signIn(email)
                if (user) {
                    const passwordConfirm = await compare(
                        password,
                        user.password ?? ''
                    )
                    if (passwordConfirm) {
                        return user
                    }
                    return null
                } else {
                    return null
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || ''
        })
    ],
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/auth/login'
    },
    callbacks: {
        async jwt({ token, account, user }) {
            if (account?.provider === 'credentials') {
                token.id = user.id
                token.fullname = user.name
                token.email = user.email
                token.image = user.image
                token.phone = user.phone
                token.role = user.role
            }

            if (account?.provider == 'google') {
                await signInWithGoogle(user, (data: IUsers) => {
                    token.id = data?.id
                    token.fullname = data?.fullname
                    token.email = data?.email
                    token.image = data?.image
                    token.phone = data?.phone
                    token.role = data?.role
                })
            }

            return token
        },

        async session({ session, token }) {
            if ('id' in token) {
                session.user.id = token.id as string
            }

            if ('name' in token) {
                session.user.name = token.name
            }

            if ('email' in token) {
                session.user.email = token.email
            }

            if ('image' in token) {
                session.user.image = token.image as string
            }

            if ('phone' in token) {
                session.user.phone = token.phone as string
            }

            if ('role' in token) {
                session.user.role = token.role as string
            }

            session.accessToken = jwt.sign(
                token,
                process.env.NEXTAUTH_SECRET || '',
                {
                    algorithm: 'HS256'
                }
            )

            return session
        }
    }
}

export default NextAuth(authOptions)

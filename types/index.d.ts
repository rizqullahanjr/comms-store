import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
    interface Session {
        user: {
            id?: string
            phone?: string | null
            role?: string
        } & DefaultSession['user']
        accessToken: string
    }

    interface User {
        id?: string
        phone?: string | null
        role?: string
    }

    interface JWT {
        id?: string
        phone?: string | null
        role?: string
    }
}

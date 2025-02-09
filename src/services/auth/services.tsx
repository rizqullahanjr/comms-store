/* eslint-disable @typescript-eslint/no-explicit-any */
import { addData, retrieveDataByField } from '@/lib/firebase/service'
import { IUsers } from '@/types/database'
import bcrypt from 'bcrypt'
import { User } from 'next-auth'

/* eslint-disable @typescript-eslint/no-unsafe-function-type */
export async function signUp(
    userData: {
        email: string
        fullname: string
        password: string
        phone: string
        role?: string
        created_at?: Date
        updated_at?: Date
        image?: string
        carts?: []
    },
    callback: Function
) {
    const data = await retrieveDataByField('users', 'email', userData.email)

    if (data) {
        callback(false)
    } else {
        if (!userData.role) {
            userData.role = 'member'
        }
        userData.image = ''
        userData.password = await bcrypt.hash(userData.password, 10)
        userData.created_at = new Date()
        userData.updated_at = new Date()
        userData.carts = []
        await addData('users', userData, (result: boolean) => {
            callback(result)
        })
    }
}

export async function signIn(email: string) {
    const user = await retrieveDataByField('users', 'email', email)

    if (user) {
        return user
    }

    return null
}

export async function signInWithGoogle(data: User, callback: Function) {
    const user = await retrieveDataByField('users', 'email', data.email!)

    if (user && user.type === 'google') {
        return callback(user)
    }

    const userData: IUsers = {
        fullname: data.name!,
        email: data.email!,
        image: data.image!,
        type: 'google',
        password: null,
        phone: null,
        role: 'member',
        created_at: new Date(),
        updated_at: new Date()
    }

    await addData('users', userData, (status: boolean, res: any) => {
        userData.id = res.path.replace('users/', '')
        if (status) {
            return callback(userData)
        }
    })
}

export async function loginWithGoogle(
    data: {
        id?: string
        email: string
        role?: string
        password?: string
        image: string
        created_at?: Date
        updated_at?: Date
        carts?: []
    },
    callback: Function
) {
    const user = await retrieveDataByField('users', 'email', data.email)

    if (user) {
        callback(user)
    } else {
        data.role = 'member'
        data.created_at = new Date()
        data.updated_at = new Date()
        data.password = ``
        data.carts = []
        await addData('users', data, (status: boolean, res: any) => {
            data.id = res.path.replace('users/', '')
            if (status) {
                callback(data)
            }
        })
    }
}

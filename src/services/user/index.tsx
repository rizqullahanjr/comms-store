/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from '@/lib/axios/instance'

const endpoint = {
    users: '/api/user',
    profile: '/api/user/profile',
    cart: '/api/user/cart',
    transaction: '/api/user/transaction'
}

const userServices = {
    getAllUsers: () => instance.get(endpoint.users),
    getAllTransactions: () => instance.get(endpoint.transaction),
    updateUser: (id: string, data: any) =>
        instance.put(`${endpoint.users}/${id}`, { data }),
    deleteUser: (id: string) => instance.delete(`${endpoint.users}/${id}`),
    getProfile: () => instance.get(endpoint.profile),
    updateProfile: (data: any) => instance.put(`${endpoint.profile}`, { data }),
    getCart: () => instance.get(endpoint.cart),
    addToCart: (data: any) => instance.put(`${endpoint.cart}`, { data }),
    updateCart: (data: any) => instance.put(`${endpoint.cart}`, { data })
}

export default userServices

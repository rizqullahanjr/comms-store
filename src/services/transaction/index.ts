/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from '@/lib/axios/instance'

const endpoint = {
    transaction: '/api/transaction'
}

const transactionService = {
    generateTransaction: async (data: any) =>
        instance.post(endpoint.transaction, data),
    getTransaction: (order_id: string) =>
        instance.get(`${endpoint.transaction}?order_id=${order_id}`)
}

export default transactionService

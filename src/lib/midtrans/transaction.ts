/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import snap from './init'

const createTransaction = async (params: any, callback: Function) => {
    snap.createTransaction(params).then(
        (transaction: { token: string; redirect_url: string }) => {
            return callback(transaction)
        }
    )
}

const getTransaction = async (order_id: string, callback: Function) => {
    snap.transaction.status(order_id).then((res: any) => {
        return callback(res)
    })
}

export { createTransaction, getTransaction }

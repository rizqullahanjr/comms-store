/* eslint-disable @typescript-eslint/no-explicit-any */
import { retrieveDataById, updateData } from '@/lib/firebase/service'
import { createTransaction, getTransaction } from '@/lib/midtrans/transaction'

import { response } from '@/utils/responseApi'
import { verify } from '@/utils/verifyToken'
import { randomUUID } from 'crypto'
import { arrayUnion } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    status: boolean
    statusCode: number
    message: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'GET') {
        const order_id = req.query.order_id?.toString()
        verify(req, res, false, async (decoded: { id: string }) => {
            getTransaction(order_id ?? '', async (resT: any) => {
                const user: any = await retrieveDataById('users', decoded.id)

                const transactions = user.transactions.map((data: any) => {
                    if (data.order_id === order_id) {
                        return {
                            ...data,
                            status: resT.transaction_status
                        }
                    }
                    return {
                        ...data
                    }
                })

                const data = { transactions }

                await updateData(
                    'users',
                    decoded.id,
                    data,
                    (result: boolean) => {
                        if (result) {
                            return response(res, true, 200, 'success', resT)
                        } else {
                            response(res, false, 400, 'failed', {})
                        }
                    }
                )
            })
        })
    }

    if (req.method === 'POST') {
        const payload = req.body
        const orderId = randomUUID()

        verify(req, res, false, async (decoded: { id: string }) => {
            const user: any = await retrieveDataById('users', decoded.id)

            const trasactionData = {
                transaction_details: {
                    order_id: orderId,
                    gross_amount: payload.transaction.total
                },
                credit_card: {
                    secure: true
                },
                customer_details: {
                    first_name: user.fullname,
                    email: user.email,
                    phone: user.phone ?? ''
                }
            }

            createTransaction(trasactionData, async (transaction: any) => {
                const address = payload.transaction.address
                delete address.isMain

                const newTransaction = {
                    ...payload.transaction,
                    address: address,
                    token: transaction.token,
                    redirect_url: transaction.redirect_url,
                    status: 'pending',
                    order_id: orderId
                }

                const data = {
                    carts: [],
                    transactions: arrayUnion(newTransaction)
                }

                await updateData(
                    'users',
                    decoded.id,
                    data,
                    (result: boolean) => {
                        if (result) {
                            return response(
                                res,
                                true,
                                200,
                                'success',
                                transaction
                            )
                        } else {
                            response(res, false, 400, 'failed', {})
                        }
                    }
                )
            })
        })
    }
}

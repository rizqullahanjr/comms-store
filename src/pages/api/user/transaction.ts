/* eslint-disable @typescript-eslint/no-explicit-any */
import { retrieveData } from '@/lib/firebase/service'
import type { NextApiRequest, NextApiResponse } from 'next'
import { verify } from '@/utils/verifyToken'
import { response } from '@/utils/responseApi'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        verify(req, res, true, async () => {
            const users = await retrieveData('users')
            const data: any[] = []

            users.forEach((user: any) =>
                user.transactions.map((transaction: any) => {
                    data.push({
                        ...transaction,
                        user: {
                            fullname: user.fullname,
                            image: user.image
                        }
                    })
                })
            )

            response(res, true, 200, 'success', data)
        })
    } else {
        response(res, false, 405, 'Method Not Allowed')
    }
}

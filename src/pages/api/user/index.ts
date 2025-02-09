/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteData, retrieveData, updateData } from '@/lib/firebase/service'
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
            const data = users.map((user: any) => {
                delete user.password
                return user
            })
            response(res, true, 200, 'success', data)
        })
    } else if (req.method === 'PUT') {
        verify(req, res, true, async () => {
            const { user }: any = req.query
            const { data } = req.body

            await updateData('users', user[1], data, (result: boolean) => {
                response(
                    res,
                    result,
                    result ? 200 : 400,
                    result ? 'success' : 'failed'
                )
            })
        })
    } else if (req.method === 'DELETE') {
        verify(req, res, true, async () => {
            const { user }: any = req.query

            await deleteData('users', user[1], (result: boolean) => {
                response(
                    res,
                    result,
                    result ? 200 : 400,
                    result ? 'success' : 'failed'
                )
            })
        })
    } else {
        response(res, false, 405, 'Method Not Allowed')
    }
}

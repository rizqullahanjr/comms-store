/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteData, updateData } from '@/lib/firebase/service'
import type { NextApiRequest, NextApiResponse } from 'next'
import { verify } from '@/utils/verifyToken'
import { response } from '@/utils/responseApi'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === 'PUT') {
        verify(req, res, true, async () => {
            const { id } = req.query
            const { data } = req.body
            await updateData('users', `${id}`, data, (result: boolean) => {
                response(
                    res,
                    result,
                    result ? 200 : 400,
                    result ? 'success' : 'failed',
                )
            })
        })
    } else if (req.method === 'DELETE') {
        verify(req, res, true, async () => {
            const { id } = req.query

            await deleteData('users', `${id}`, (result: boolean) => {
                response(
                    res,
                    result,
                    result ? 200 : 400,
                    result ? 'success' : 'failed',
                )
            })
        })
    } else {
        response(res, false, 405, 'Method Not Allowed')
    }
}

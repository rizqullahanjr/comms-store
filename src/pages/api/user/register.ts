import type { NextApiRequest, NextApiResponse } from 'next'
import { signUp } from '@/services/auth/services'
import { response } from '@/utils/responseApi'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        await signUp(req.body, (status: boolean) => {
            response(
                res,
                status,
                status ? 200 : 400,
                status ? 'success' : 'failed'
            )
        })
    } else {
        response(res, false, 405, 'Method Not Allowed')
    }
}

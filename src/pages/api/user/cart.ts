/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next'
import { retrieveDataById, updateData } from '@/lib/firebase/service'
import { verify } from '@/utils/verifyToken'
import { response } from '@/utils/responseApi'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        verify(req, res, false, async (decoded: {id:string}) => {
            const user: any = await retrieveDataById('users', decoded.id)
            if (user) {
                user.id = decoded.id
                response(res, true, 200, 'success', user.carts)
            } else {
                response(res, false, 404, 'Not Found', [])
            }
        })
    } else if (req.method === 'PUT') {
        const { data } = req.body
        verify(req, res, false, async (decoded: {id:string}) =>{
            await updateData('users', decoded.id, data, (result: boolean) => {
                if (result) {
                    response(res, true, 200, 'success', data)
                } else {
                    response(res, false, 400, 'failed', [])
                }
            })
        })
    }
}

export const config = {
    api: {
        externalResolver: true
    }
}
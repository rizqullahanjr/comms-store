/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next'
import { retrieveDataById, updateData } from '@/lib/firebase/service'
import { compare, hash } from 'bcrypt'
import { verify } from '@/utils/verifyToken'
import { response } from '@/utils/responseApi'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        verify(req, res, false, async (decoded: { id: string }) => {
            const profile: any = await retrieveDataById('users', decoded.id)
            if (profile) {
                profile.id = decoded.id
                response(res, true, 200, 'success', profile)
            } else {
                response(res, false, 404, 'Not Found', {})
            }
        })
    } else if (req.method === 'PUT') {
        const { data } = req.body
        verify(req, res, false, async (decoded: { id: string }) => {
            if (data.password) {
                const passwordConfirm = await compare(
                    data.oldPassword,
                    data.encryptedPassword,
                )
                if (!passwordConfirm) {
                    response(res, false, 400, 'failed', {})
                }
                delete data.oldPassword
                delete data.encryptedPassword
                data.password = await hash(data.password, 10)
            }
            await updateData('users', decoded.id, data, (result: boolean) => {
                if (result) {
                    response(res, true, 200, 'success', data)
                } else {
                    response(res, false, 400, 'failed', {})
                }
            })
        })
    }
}

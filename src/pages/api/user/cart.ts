/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { retrieveDataById, updateData } from '@/lib/firebase/service'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const token = req.headers.authorization?.split(' ')[1]
        if (token) {
            jwt.verify(
                token,
                process.env.NEXTAUTH_SECRET || '',
                async (err: any, decoded: any) => {
                    if (decoded) {
                        const user: any = await retrieveDataById('users', decoded.id)
                        if (user) {
                            user.id = decoded.id
                            return res.status(200).json({
                                status: true,
                                statusCode: 200,
                                message: 'success',
                                data: user.carts,
                            })
                        } else {
                            return res.status(404).json({
                                status: false,
                                statusCode: 404,
                                message: 'Not Found',
                                data: [],
                            })
                        }
                    } else {
                        res.status(403).json({
                            status: false,
                            statusCode: 403,
                            message: 'Unauthorized',
                            data: [],
                        })
                    }
                },
            )
        }
    } else if (req.method === 'PUT') {
        const { data } = req.body
        const token = req.headers.authorization?.split(' ')[1] || ''
        jwt.verify(
            token,
            process.env.NEXTAUTH_SECRET || '',
            async (err: any, decoded: any) => {
                if (decoded) {
                    await updateData('users', decoded.id, data, (result: boolean) => {
                        if (result) {
                            res.status(200).json({
                                status: true,
                                statusCode: 200,
                                message: 'success',
                            })
                        } else {
                            res.status(400).json({
                                status: false,
                                statusCode: 400,
                                message: 'failed',
                            })
                        }
                    })
                } else {
                    res.status(403).json({
                        status: false,
                        statusCode: 403,
                        message: 'unauthorized',
                    })
                }
            },
        )
    }
}

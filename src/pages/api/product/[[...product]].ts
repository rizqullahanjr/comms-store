/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    addData,
    deleteData,
    retrieveData,
    retrieveDataById,
    updateData
} from '@/lib/firebase/service'
import type { NextApiRequest, NextApiResponse } from 'next'
import { verify } from '@/utils/verifyToken'
import { response } from '@/utils/responseApi'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        const { product }: any = req.query
        if (product && product[0]) {
            const data = await retrieveDataById('products', product[0])
            response(res, true, 200, 'success', data)
        } else {
            const data = await retrieveData('products')
            response(res, true, 200, 'success', data)
        }
    } else if (req.method === 'POST') {
        verify(req, res, true, async () => {
            // eslint-disable-next-line prefer-const
            let data = req.body
            data.created_at = new Date()
            data.updated_at = new Date()
            data.price = parseInt(data.price)
            data.stock.forEach((stock: any) => {
                stock.qty = parseInt(stock.qty)
            })
            await addData('products', data, (status: boolean, result: any) => {
                if (status) {
                    response(res, true, 200, 'success', { id: result.id })
                } else {
                    response(res, false, 400, 'failed')
                }
            })
        })
    } else if (req.method === 'PUT') {
        const { product }: any = req.query
        const { data } = req.body
        verify(req, res, true, async () => {
            await updateData(
                'products',
                product[0],
                data,
                (status: boolean) => {
                    response(
                        res,
                        status,
                        status ? 200 : 400,
                        status ? 'success' : 'failed'
                    )
                }
            )
        })
    } else if (req.method === 'DELETE') {
        const { product }: any = req.query
        verify(req, res, true, async () => {
            await deleteData('products', product[0], (status: boolean) => {
                response(
                    res,
                    status,
                    status ? 200 : 400,
                    status ? 'success' : 'failed'
                )
            })
        })
    } else {
        response(res, false, 405, 'Method Not Allowed')
    }
}

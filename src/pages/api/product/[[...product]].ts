/* eslint-disable @typescript-eslint/no-explicit-any */
import { retrieveData } from '@/lib/firebase/service'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const data = await retrieveData('products')
        res.status(200).json({ status: true, message: 'success', data })
    }
}

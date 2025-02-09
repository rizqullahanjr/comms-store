import { response } from '@/utils/responseApi'
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
    response(res, true, 200, 'success')
}

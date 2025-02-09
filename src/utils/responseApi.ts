/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiResponse } from 'next'

export const response = (
    res: NextApiResponse,
    status: boolean,
    statusCode: number,
    message: string,
    data?: any
) => {
    res.status(statusCode).json({
        status: status,
        statusCode: statusCode,
        message: message,
        data
    })
}

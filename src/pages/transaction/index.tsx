/* eslint-disable react-hooks/exhaustive-deps */
import TransactionView from '@/components/views/transaction'
import transactionService from '@/services/transaction'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const TransactionsPage = () => {
    const { query, isReady } = useRouter()

    const getTransaction = async () => {
        const { data } = await transactionService.getTransaction(
            query.order_id as string
        )
        console.log(data)
    }
    useEffect(() => {
        if (isReady) {
            getTransaction()
        }
    }, [isReady])

    return (
        <>
            <Head>
                <title>Transaction | Comms Store</title>
            </Head>

            <TransactionView />
        </>
    )
}

export default TransactionsPage

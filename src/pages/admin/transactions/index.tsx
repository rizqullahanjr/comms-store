/* eslint-disable @typescript-eslint/no-explicit-any */
import TransactionsAdminView from '@/components/views/admin/Transactions'
import userServices from '@/services/user'
import { useEffect, useState } from 'react'

const AdminTransactionsPage = () => {
    const [transactions, setTransactions] = useState([])

    const getAllTransactions = async () => {
        const { data } = await userServices.getAllTransactions()

        setTransactions(data.data)
    }

    useEffect(() => {
        getAllTransactions()
    }, [])

    return <TransactionsAdminView transactions={transactions} />
}

export default AdminTransactionsPage

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */

import AdminLayout from '@/components/layouts/AdminLayout'
import styles from './Transactions.module.scss'

type PropTypes = {
    transactions: any[]
}

const TransactionsAdminView = (props: PropTypes) => {
    const { transactions } = props

    return (
        <>
            <AdminLayout>
                <div className={styles.users}>
                    <h1>Transactions Lists</h1>
                    <table className={styles.users__table}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Fullname</th>
                                <th>Order Id</th>
                                <th>Total</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(
                                (transaction: any, index: number) => (
                                    <tr key={transaction.order_id}>
                                        <td>{index + 1}</td>
                                        <td>{transaction.user.fullname}</td>
                                        <td>{transaction.order_id}</td>
                                        <td>{transaction.total}</td>
                                        <td>{transaction.status}</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </AdminLayout>
        </>
    )
}

export default TransactionsAdminView

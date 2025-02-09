/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */

import AdminLayout from '@/components/layouts/AdminLayout'
import styles from './Transactions.module.scss'
import convertIDR from '@/utils/currency'
import Button from '@/components/ui/Button'
import { useState } from 'react'
import ModalDetails from './ModalDetails'

type PropTypes = {
    transactions: any[]
}

const TransactionsAdminView = (props: PropTypes) => {
    const { transactions } = props

    const [detail, setDetail] = useState(null)

    return (
        <>
            <AdminLayout>
                <div className={styles.orders}>
                    <h1>Transactions Lists</h1>
                    <table className={styles.orders__table}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Fullname</th>
                                <th>Order Id</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(
                                (transaction: any, index: number) => (
                                    <tr key={transaction.order_id}>
                                        <td>{index + 1}</td>
                                        <td>{transaction.user.fullname}</td>
                                        <td>{transaction.order_id}</td>
                                        <td>{convertIDR(transaction.total)}</td>
                                        <td>{transaction.status}</td>
                                        <td>
                                            <div
                                                className={
                                                    styles.orders__table__actions
                                                }
                                            >
                                                <Button
                                                    type='button'
                                                    className={
                                                        styles.orders__table__actions__detail
                                                    }
                                                    onClick={() =>
                                                        setDetail(transaction)
                                                    }
                                                >
                                                    <i className='bx bx-purchase-tag'></i>
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
                {detail && (
                    <ModalDetails
                        data={detail}
                        onClose={() => setDetail(null)}
                    />
                )}
            </AdminLayout>
        </>
    )
}

export default TransactionsAdminView

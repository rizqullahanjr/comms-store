/* eslint-disable @typescript-eslint/no-explicit-any */
import MemberLayout from '@/components/layouts/MemberLayout'
import styles from './Orders.module.scss'
import Button from '@/components/ui/Button'
import Script from 'next/script'
import { useState } from 'react'
import ModalDetails from './ModalDetails'
import convertIDR from '@/utils/currency'

type PropType = {
    users: any
}

const OrdersMemberView = (props: PropType) => {
    const { users } = props

    const [detail, setDetail] = useState(null)

    const handlePayment = (token: string) => {
        window.snap.pay(token)
    }

    return (
        <MemberLayout>
            <Script
                src='https://app.sandbox.midtrans.com/snap/snap.js'
                data-client-key={
                    process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY ?? ''
                }
            />
            <div className={styles.orders}>
                <h1>My Orders</h1>
                <table className={styles.orders__table}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Qty</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.transactions?.map((data: any, i: number) => (
                            <tr key={data.order_id}>
                                <td>{i + 1}</td>
                                <td>{data?.items[0].name}</td>
                                <td>{data?.items[0].qty}</td>
                                <td>{convertIDR(data.total)}</td>
                                <td>{data.status}</td>
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
                                            onClick={() => setDetail(data)}
                                        >
                                            <i className='bx bx-purchase-tag'></i>
                                        </Button>
                                        <Button
                                            type='button'
                                            className={
                                                styles.orders__table__actions__pay
                                            }
                                            onClick={() =>
                                                data.status != 'settlement' &&
                                                handlePayment(data.token)
                                            }
                                            disabled={
                                                data.status == 'settlement'
                                            }
                                        >
                                            <i className='bx bx-money'></i>
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {detail && (
                <ModalDetails data={detail} onClose={() => setDetail(null)} />
            )}
        </MemberLayout>
    )
}

export default OrdersMemberView

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react'
import styles from './Modal.module.scss'
import Image from 'next/image'
import convertIDR from '@/utils/currency'

type PropTypes = {
    onClose: any
    data: any
}

const ModalDetails = (props: PropTypes) => {
    const { onClose, data } = props

    const ref: any = useRef()
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClose()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [onClose])
    return (
        <div className={styles.modal}>
            <div className={styles.modal__main} ref={ref}>
                <h2>Detail Order</h2>
                <div className={styles.modal__main__order}>
                    {data.items.map((v: any) => (
                        <div
                            key={v.id}
                            className={styles.modal__main__order__list}
                        >
                            <Image
                                src={v.image ?? '/default-product.png'}
                                alt={v.name}
                                height={120}
                                width={120}
                            />
                            <div
                                className={
                                    styles.modal__main__order__list__detail
                                }
                            >
                                <h3>{v.name}</h3>
                                <div>Type: {v.type}</div>
                                <div>Qty: {v.qty}</div>
                                <div>Total: {convertIDR(v.price ?? 0)}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <h3>Shipping Address</h3>
                    <h4>{data.address.recipient}</h4>
                    {data.address.addressline} ({data.address.note})
                    <div>No Telp: +{data.address.phone}</div>
                </div>
            </div>
        </div>
    )
}

export default ModalDetails

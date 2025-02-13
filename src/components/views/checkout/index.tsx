/* eslint-disable react-hooks/exhaustive-deps */
// components/views/cart/index.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Product } from '@/types/product.type'
import styles from './Checkout.module.scss'
import Image from 'next/image'
import convertIDR from '@/utils/currency'
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import Modal from './Modal'
import Script from 'next/script'
import transactionService from '@/services/transaction'

declare global {
    interface Window {
        snap: any
    }
}

type Proptypes = {
    profile: any
    products: Product[]
    setProfile: Dispatch<SetStateAction<any>>
}

const CheckoutView = (props: Proptypes) => {
    const { profile, products, setProfile } = props
    const [modalAddress, setModalAddress] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(0)

    const getAddressIndex = () => {
        return profile?.address?.filter((v: any, i: any) => {
            if (v.isMain) {
                setSelectedAddress(i)
            }
        })
    }

    // Get product by ID
    const getProduct = (id: string) => {
        const product = products.find(product => product.id === id)
        return product
    }

    // Calculate total price, tax, and shipping cost
    const calculateSummary = () => {
        const totalPrice = profile?.carts?.reduce(
            (acc: number, item: { id: string; qty: number }) => {
                const product = getProduct(item.id)
                return acc + (product ? product.price * item.qty : 0)
            },
            0
        )

        const tax = totalPrice * 0.1 // 10% tax
        const shippingCost = 0 // Placeholder for shipping cost

        return {
            totalPrice,
            tax,
            shippingCost,
            grandTotal: totalPrice + tax + shippingCost
        }
    }

    const { totalPrice, tax, shippingCost, grandTotal } = calculateSummary()

    const handleCheckout = async () => {
        const { data } = await transactionService.generateTransaction({
            transaction: {
                items: profile?.carts,
                address: profile.address[selectedAddress],
                total: grandTotal.toFixed(0)
            }
        })

        window.snap.pay(data.data.token)
    }

    useEffect(() => {
        getAddressIndex()
    }, [])

    return (
        <>
            <Script
                src='https://app.sandbox.midtrans.com/snap/snap.js'
                data-client-key={
                    process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY ?? ''
                }
            />
            profile && (
            <div className={styles.checkout}>
                <div className={styles.checkout__main}>
                    <h1 className={styles.checkout__main__title}>
                        Checkout Page
                    </h1>
                    {profile?.address && profile.address.length > 0 ? (
                        <div className={styles.checkout__main__address}>
                            <h3
                                className={
                                    styles.checkout__main__address__title
                                }
                            >
                                {profile?.address[selectedAddress].addressline}{' '}
                                ({profile?.address[selectedAddress].note})
                            </h3>
                            <div
                                className={
                                    styles.checkout__main__address__selected
                                }
                            >
                                <h4>
                                    {
                                        profile?.address[selectedAddress]
                                            .recipient
                                    }{' '}
                                    - {profile?.address[selectedAddress].phone}
                                </h4>
                            </div>
                            <Button
                                className={
                                    styles.checkout__main__address__button
                                }
                                type='button'
                                onClick={() => setModalAddress(true)}
                            >
                                Change Address
                            </Button>
                        </div>
                    ) : (
                        <div className={styles.checkout__main__address}>
                            <Button
                                className={
                                    styles.checkout__main__address__button
                                }
                                type='button'
                                onClick={() => setModalAddress(true)}
                            >
                                Add Address
                            </Button>
                        </div>
                    )}
                    <div className={styles.checkout__main__list}>
                        {profile?.carts?.map(
                            (item: {
                                id: string
                                type: string
                                qty: number
                                name: string
                            }) => {
                                const product = getProduct(item.id)
                                const totalPrice = product
                                    ? product.price * item.qty
                                    : 0

                                return (
                                    <Fragment key={`${item.id}-${item.type}`}>
                                        <div
                                            className={
                                                styles.checkout__main__list__item
                                            }
                                        >
                                            <div
                                                className={
                                                    styles.checkout__main__list__item__image
                                                }
                                            >
                                                <Image
                                                    src={
                                                        product?.image ??
                                                        '/default-product.png'
                                                    } // Fallback image
                                                    alt={`${item.id}-${item.type}`}
                                                    width={150}
                                                    height={150}
                                                />
                                            </div>
                                            <div
                                                className={
                                                    styles.checkout__main__list__item__info
                                                }
                                            >
                                                <h3
                                                    className={
                                                        styles.checkout__main__list__item__info__title
                                                    }
                                                >
                                                    {product?.name}
                                                </h3>
                                                <p
                                                    className={
                                                        styles.checkout__main__list__item__info__category
                                                    }
                                                >
                                                    {product?.category}
                                                </p>
                                                <div
                                                    className={
                                                        styles.checkout__main__list__item__info__data
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styles.checkout__main__list__item__info__data__variant
                                                        }
                                                    >
                                                        <h4>Variant</h4>
                                                        {item.type}
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.checkout__main__list__item__info__data__qty
                                                        }
                                                    >
                                                        <h4>Quantity</h4>
                                                        {item.qty}
                                                    </div>
                                                </div>
                                            </div>
                                            <h4
                                                className={
                                                    styles.checkout__main__list__item__price
                                                }
                                            >
                                                {convertIDR(totalPrice)}
                                            </h4>
                                        </div>
                                    </Fragment>
                                )
                            }
                        )}
                    </div>
                </div>
                <div className={styles.checkout__summary}>
                    <h1 className={styles.checkout__summary__title}>Summary</h1>
                    <div className={styles.checkout__summary__details}>
                        <div
                            className={styles.checkout__summary__details__item}
                        >
                            <span>Total Price</span>
                            <span>{convertIDR(totalPrice)}</span>
                        </div>
                        <div
                            className={styles.checkout__summary__details__item}
                        >
                            <span>Tax (10%)</span>
                            <span>{convertIDR(tax)}</span>
                        </div>
                        <div
                            className={styles.checkout__summary__details__item}
                        >
                            <span>Shipping Cost</span>
                            <span>{convertIDR(shippingCost)}</span>
                        </div>
                        <div
                            className={styles.checkout__summary__details__item}
                        >
                            <span>Grand Total</span>
                            <span>{convertIDR(grandTotal)}</span>
                        </div>
                    </div>
                    <Button
                        type='button'
                        onClick={handleCheckout}
                        variant='primary'
                        className={styles.checkout__summary__checkout}
                    >
                        Payment
                    </Button>
                </div>
            </div>
            )
            {modalAddress && (
                <Modal
                    profile={profile}
                    selectedAddress={selectedAddress}
                    setModalAddress={setModalAddress}
                    setSelectedAddress={setSelectedAddress}
                    setProfile={setProfile}
                />
            )}
        </>
    )
}

export default CheckoutView

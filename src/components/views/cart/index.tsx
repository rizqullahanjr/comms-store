// components/views/cart/index.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Product } from '@/types/product.type'
import styles from './Cart.module.scss'
import Image from 'next/image'
import convertIDR from '@/utils/currency'
import Select from '@/components/ui/Select'
import Input from '@/components/ui/Input'
import { Dispatch, Fragment, SetStateAction } from 'react'
import Button from '@/components/ui/Button'
import userServices from '@/services/user' // Import userServices

type Proptypes = {
    cart: any
    products: Product[]
    setCart: (cart: any) => void // Add setCart prop to update cart state
    setToaster: Dispatch<SetStateAction<{}>> // Add setToaster prop
}

const CartView = (props: Proptypes) => {
    const { cart, products, setCart, setToaster } = props

    // Get product by ID
    const getProduct = (id: string) => {
        const product = products.find(product => product.id === id)
        return product
    }

    // Get options for the Select component
    const getOptionType = (id: string, selected: string) => {
        const product = products.find(product => product.id === id)
        if (!product || !product.stock) return [] // Return an empty array if product or stock is missing

        const options = product.stock
            .map((stock: { type: string; qty: number }) => {
                if (stock.qty > 0) {
                    return {
                        label: stock.type,
                        value: stock.type,
                        selected: stock.type === selected,
                    }
                }
                return null // Return null for invalid options
            })
            .filter((option: any) => option !== null) // Filter out null values

        return options
    }

    // Handle delete item from cart
    const handleDelete = async (id: string) => {
        try {
            // Remove the item from the cart locally
            const updatedCart = cart.filter((item: { id: string }) => item.id !== id)

            // Update the cart in Firebase
            await userServices.updateCart({ carts: updatedCart })

            // Update the local state
            setCart(updatedCart)

            // Show success Toaster
            setToaster({ variant: 'success', message: 'Product removed from cart' })
        } catch (error) {
            console.error('Failed to delete item:', error)
            setToaster({ variant: 'danger', message: 'Failed to remove product from cart' })
        }
    }

    // Calculate total price, tax, and shipping cost
    const calculateSummary = () => {
        const totalPrice = cart.reduce((acc: number, item: { id: string; qty: number }) => {
            const product = getProduct(item.id)
            return acc + (product ? product.price * item.qty : 0)
        }, 0)

        const tax = totalPrice * 0.1 // 10% tax
        const shippingCost = 0 // Placeholder for shipping cost

        return {
            totalPrice,
            tax,
            shippingCost,
            grandTotal: totalPrice + tax + shippingCost,
        }
    }

    const { totalPrice, tax, shippingCost, grandTotal } = calculateSummary()

    return (
        <div className={styles.cart}>
            <div className={styles.cart__main}>
                <h1 className={styles.cart__main__title}>Cart Page</h1>
                <div className={styles.cart__main__list}>
                    {cart.map((item: { id: string; type: string; qty: number; name: string }) => {
                        const product = getProduct(item.id)
                        const totalPrice = product ? product.price * item.qty : 0

                        return (
                            <Fragment key={`${item.id}-${item.type}`}>
                                <div className={styles.cart__main__list__item}>
                                    <div className={styles.cart__main__list__item__image}>
                                        <Image
                                            src={product?.image || '/images/default-product.png'} // Fallback image
                                            alt={`${item.id}-${item.type}`}
                                            width={150}
                                            height={150}
                                            onError={e => {
                                                // Fallback if the image fails to load
                                                ;(e.target as HTMLImageElement).src =
                                                    '/images/default-product.png'
                                            }}
                                        />
                                    </div>
                                    <div className={styles.cart__main__list__item__info}>
                                        <h3 className={styles.cart__main__list__item__info__title}>
                                            {product?.name}
                                        </h3>
                                        <p
                                            className={
                                                styles.cart__main__list__item__info__category
                                            }
                                        >
                                            {product?.category}
                                        </p>
                                        <div className={styles.cart__main__list__item__info__data}>
                                            <div
                                                className={
                                                    styles.cart__main__list__item__info__data__variant
                                                }
                                            >
                                                <h4>Variant</h4>
                                                <Select
                                                    name='type'
                                                    options={getOptionType(item.id, item.type)}
                                                />
                                            </div>
                                            <div
                                                className={
                                                    styles.cart__main__list__item__info__data__qty
                                                }
                                            >
                                                <h4>Quantity</h4>
                                                <Input
                                                    type='number'
                                                    name='qty'
                                                    defaultValue={item.qty}
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type='button'
                                            className={styles.cart__main__list__item__info__delete}
                                            onClick={() => handleDelete(item.id)} // Call handleDelete
                                        >
                                            <i className='bx bx-trash' />
                                        </button>
                                    </div>
                                    <h4 className={styles.cart__main__list__item__price}>
                                        {convertIDR(totalPrice)}
                                    </h4>
                                </div>
                            </Fragment>
                        )
                    })}
                </div>
            </div>
            <div className={styles.cart__summary}>
                <h1 className={styles.cart__summary__title}>Summary</h1>
                <div className={styles.cart__summary__details}>
                    <div className={styles.cart__summary__details__item}>
                        <span>Total Price</span>
                        <span>{convertIDR(totalPrice)}</span>
                    </div>
                    <div className={styles.cart__summary__details__item}>
                        <span>Tax (10%)</span>
                        <span>{convertIDR(tax)}</span>
                    </div>
                    <div className={styles.cart__summary__details__item}>
                        <span>Shipping Cost</span>
                        <span>{convertIDR(shippingCost)}</span>
                    </div>
                    <div className={styles.cart__summary__details__item}>
                        <span>Grand Total</span>
                        <span>{convertIDR(grandTotal)}</span>
                    </div>
                </div>
                <Button
                    type='button'
                    onClick={() => {}}
                    variant='primary'
                    className={styles.cart__summary__checkout}
                >
                    Checkout
                </Button>
            </div>
        </div>
    )
}

export default CartView

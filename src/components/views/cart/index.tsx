/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Product } from '@/types/product.type'
import styles from './Cart.module.scss'
import Image from 'next/image'
import convertIDR from '@/utils/currency'
import Select from '@/components/ui/Select'
import Input from '@/components/ui/Input'
import { Fragment } from 'react'

type Proptypes = {
    cart: any
    products: Product[]
}

const CartView = (props: Proptypes) => {
    const { cart, products } = props

    const getProduct = (id: string) => {
        const product = products.find(product => product.id === id)
        return product
    }

    const getOptionType = (id: string, selected: string) => {
        const product = products.find(product => product.id === id)
        console.log(product?.stock)
        const options = product?.stock.map((stock: { type: string; qty: number }) => {
            if (stock.qty > 0) {
                return {
                    label: stock.type,
                    value: stock.type,
                    selected: stock.type === selected
                }
            }
        })
        const data = options?.filter((option: any) => option !== undefined)
        console.log(data)
        return data
    }

    const getTotalPrice = () => {
        const total = cart.reduce((acc: number, item: { id: string; type: string; qty: number }) => {
            const product:any = getProduct(item.id)
            console.log(product)
            return acc + product?.price * item.qty
        })
        return total
    }

    console.log(getTotalPrice)


    return (
        <div className={styles.cart}>
            <div className={styles.cart__main}>
                <h1 className={styles.cart__main__title}>Cart Page</h1>
                <div className={styles.cart__main__list}>
                    {cart.map((item: { id: string; type: string; qty: number; name: string }) => (
                        <Fragment key={`${item.id}-${item.type}`}>
                            <div className={styles.cart__main__list__item}>
                                <div className={styles.cart__main__list__item__image}>
                                    <Image
                                        src={`${getProduct(item.id)?.image}`}
                                        alt={`${item.id}-${item.type}`}
                                        width={150}
                                        height={150}
                                    />
                                </div>
                                <div className={styles.cart__main__list__item__info}>
                                    <h3 className={styles.cart__main__list__item__info__title}>
                                        {getProduct(item.id)?.name}
                                    </h3>
                                    <p className={styles.cart__main__list__item__info__category}>
                                        {getProduct(item.id)?.category}
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
                                        className={
                                            styles.cart__main__list__item__info__delete
                                        }
                                        onClick={() => {}}
                                    >
                                        <i className='bx bx-trash' />
                                    </button>
                                </div>
                                <h4 className={styles.cart__main__list__item__price}>
                                    {convertIDR(getProduct(item.id)?.price)}
                                </h4>
                            </div>
                        </Fragment>
                    ))}
                </div>
            </div>
            <div className={styles.cart__summary}>
                <h1 className={styles.cart__summary__title}>Summary</h1>
            </div>
        </div>
    )
}

export default CartView

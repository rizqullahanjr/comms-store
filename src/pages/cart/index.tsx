/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CartView from '@/components/views/cart'
import productServices from '@/services/product'
import userServices from '@/services/user'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type PropTypes = {
    setToaster: Dispatch<SetStateAction<{}>>
}

const CartPage = (props: PropTypes) => {
    const { setToaster } = props
    const session: any = useSession()
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])

    const getCart = async (token: string) => {
        const { data } = await userServices.getCart(token)
        setCart(data.data)
    }

    const getAllProducts = async () => {
        const { data } = await productServices.getAllProducts()
        setProducts(data.data)
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    useEffect(() => {
        if (session.data?.accessToken) {
            getCart(session.data?.accessToken)
        }
    }, [session])

    return (
        <>
            <Head>
                <title>Cart | Comms Store</title>
            </Head>
            <CartView
                cart={cart}
                products={products}
                token={session.data?.accessToken || ''}
                setCart={setCart}
                setToaster={setToaster}
            />
        </>
    )
}

export default CartPage

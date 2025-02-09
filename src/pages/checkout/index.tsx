/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CheckoutView from '@/components/views/checkout'
import productServices from '@/services/product'
import userServices from '@/services/user'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const CartPage = () => {
    const session: any = useSession()
    const [products, setProducts] = useState([])
    const [profile, setProfile] = useState(null)

    const getProfile = async () => {
        const { data } = await userServices.getProfile()
        setProfile(data.data)
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
            getProfile()
        }
    }, [session])

    return (
        <>
            <Head>
                <title>Checkout | Comms Store</title>
            </Head>

            <CheckoutView profile={profile} products={products} setProfile={setProfile}/>
        </>
    )
}

export default CartPage

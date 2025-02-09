import OrdersMemberView from '@/components/views/member/Orders'
import userServices from '@/services/user'
import { useEffect, useState } from 'react'

const OrdersMemberPage = () => {
    const [users, setUsers] = useState([])

    const getUsers = async () => {
        const { data } = await userServices.getProfile()
        setUsers(data.data)
    }

    useEffect(() => {
        getUsers()
    }, [])

    return <OrdersMemberView users={users} />
}

export default OrdersMemberPage

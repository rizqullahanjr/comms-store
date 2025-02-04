/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import userServices from '@/services/user'
import styles from './ModalDeleteUser.module.scss'
import { Dispatch, SetStateAction, useState } from 'react'
import { User } from '@/types/user.type'

type PropTypes = {
    setUsersData: Dispatch<SetStateAction<User[]>>
    deletedUser: User | any
    setToaster: Dispatch<SetStateAction<{}>>
    setDeletedUser: Dispatch<SetStateAction<{}>>
}

const ModalDeleteUser = (props: PropTypes) => {
    const { deletedUser, setDeletedUser, setUsersData, setToaster } = props
    const [isLoading, setIsLoading] = useState(false)
    const handleDelete = async () => {
        const result = await userServices.deleteUser(
            deletedUser.id, 
        )
            if (result.status === 200) {
                setIsLoading(false)
                setToaster({
                    variant: 'success',
                    message: 'User Deleted Successfully',
                })
                setDeletedUser({})
                const { data } = await userServices.getAllUsers()
                setUsersData(data.data)
            } else {
                setIsLoading(false)
                setToaster({
                    variant: 'danger',
                    message: 'User Failed to Deleted',
                })
            }
        
    }
    return (
        <Modal onClose={() => setDeletedUser({})}>
            <h1 className={styles.modal__title}>Are you sure?</h1>
            <Button
                type='button'
                onClick={() => {
                    handleDelete()
                }}
            >
                {isLoading ? 'Deleting...' : 'Yes, Delete'}
            </Button>
        </Modal>
    )
}

export default ModalDeleteUser

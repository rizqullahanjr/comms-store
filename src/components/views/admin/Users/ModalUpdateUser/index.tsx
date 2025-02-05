/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Modal from '@/components/ui/Modal'
import Select from '@/components/ui/Select'
import { ToasterContext } from '@/contexts/ToasterContext'
import userServices from '@/services/user'
import { User } from '@/types/user.type'
import { Dispatch, FormEvent, SetStateAction, useContext, useState } from 'react'


type PropTypes = {
    setUsersData: Dispatch<SetStateAction<User[]>>
    updatedUser: User | any
    setUpdatedUser: Dispatch<SetStateAction<{}>>
}

const ModalUpdateUser = (props: PropTypes) => {
    const { setToaster } = useContext(ToasterContext)
    const { updatedUser, setUpdatedUser, setUsersData } = props
    const [isLoading, setIsLoading] = useState(false)
    const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        const form: any = event.target as HTMLFormElement
        const data = {
            role: form.role.value,
        }

        const result = await userServices.updateUser(
            updatedUser.id,
            data,
        )
        if (result.status === 200) {
            setIsLoading(false)
            setUpdatedUser({})
            const { data } = await userServices.getAllUsers()
            setUsersData(data.data)
            setToaster({
                variant: 'success',
                message: 'User Updated Successfully',
            })
        } else {
            setIsLoading(false)
            setToaster({
                variant: 'danger',
                message: 'User Failed to Update',
            })
        }
    }

    return (
        <Modal onClose={() => setUpdatedUser({})}>
            <h1>Update User</h1>
            <form onSubmit={handleUpdateUser}>
                <Input
                    label='Email'
                    name='email'
                    type='email'
                    defaultValue={updatedUser.email}
                    disabled
                />
                <Input
                    label='Fullname'
                    name='fullname'
                    type='text'
                    defaultValue={updatedUser.fullname}
                    disabled
                />
                <Input
                    label='Phone'
                    name='phone'
                    type='number'
                    defaultValue={updatedUser.phone}
                    disabled
                />
                <Select
                    label='Role'
                    name='role'
                    defaultValue={updatedUser.role}
                    options={[
                        { value: 'admin', label: 'Admin' },
                        { value: 'member', label: 'Member' },
                    ]}
                />
                <Button type='submit'>{isLoading ? 'Updating...' : 'Update'}</Button>
            </form>
        </Modal>
    )
}

export default ModalUpdateUser

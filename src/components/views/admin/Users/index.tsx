/* eslint-disable @typescript-eslint/no-empty-object-type */

import AdminLayout from '@/components/layouts/AdminLayout'
import styles from './Users.module.scss'
import { useEffect, useState } from 'react'
import ModalUpdateUser from './ModalUpdateUser'
import Button from '@/components/ui/Button'
import ModalDeleteUser from './ModalDeleteUser'
import { User } from '@/types/user.type'


type PropTypes = {
    users: User[]
}

const UsersAdminView = (props: PropTypes) => {
    const [updatedUser, setUpdatedUser] = useState<User | {}>({})
    const [usersData, setUsersData] = useState<User[]>([])
    const [deletedUser, setDeletedUser] = useState<User | {}>({})
    const { users } = props
    console.log(users)

    useEffect(() => {
        setUsersData(users)
    }, [users])
    return (
        <>
            <AdminLayout>
                <div className={styles.users}>
                    <h1>User Management</h1>
                    <table className={styles.users__table}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Fullname</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersData.map((user: User, index: number) => (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>{user.fullname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <div className={styles.users__table__actions}>
                                            <Button
                                                type='button'
                                                onClick={() => setUpdatedUser(user)}
                                                className={
                                                    styles.users__table__actions__edit
                                                }
                                            >
                                                <i className='bx bx-edit' />
                                            </Button>
                                            <Button
                                                type='button'
                                                className={
                                                    styles.users__table__actions__delete
                                                }
                                                onClick={() => setDeletedUser(user)}
                                            >
                                                <i className='bx bx-trash' />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </AdminLayout>
            {Object.keys(updatedUser).length && (
                <ModalUpdateUser
                    updatedUser={updatedUser}
                    setUpdatedUser={setUpdatedUser}
                    setUsersData={setUsersData}
                />
            )}
            {Object.keys(deletedUser).length && (
                <ModalDeleteUser
                    deletedUser={deletedUser}
                    setDeletedUser={setDeletedUser}
                    setUsersData={setUsersData}
                />
            )}
        </>
    )
}

export default UsersAdminView

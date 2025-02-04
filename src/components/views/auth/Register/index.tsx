/* eslint-disable @typescript-eslint/no-empty-object-type */
import Input from '@/components/ui/Input'
import styles from './Register.module.scss'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useState } from 'react'
import Button from '@/components/ui/Button'
import authServices from '@/services/auth'
import AuthLayout from '@/components/layouts/AuthLayout'
import { ToasterContext } from '@/contexts/ToasterContext'

const RegisterView = () => {
    const { setToaster } = useContext(ToasterContext)
    const [isLoading, setIsLoading] = useState(false)
    const { push } = useRouter()
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        const form = event.target as HTMLFormElement
        const data = {
            fullname: form.fullname.value,
            phone: form.phone.value,
            email: form.email.value,
            password: form.password.value,
        }

        try {
            const result = await authServices.registerAccount(data)
            if (result.status === 200) {
                form.reset()
                setIsLoading(false)
                push('/auth/login')
                setToaster({
                    variant: 'success',
                    message: 'Succesfully Registered'
                })
            } else {
                setIsLoading(false)
                setToaster({
                    variant: 'danger',
                    message: 'Register error please contact support'
                })
            }
        } catch (error) {
            setIsLoading(false)
            setToaster({
                variant: 'danger',
                message: 'Email already exist'
            })
            console.log(error)
        }
    }

    return (
        <AuthLayout
            title='Register'
            link='/auth/login'
            linkText='Have an account? Sign in'
            setToaster={setToaster}
        >
            <form onSubmit={handleSubmit}>
                <Input label='Email' name='email' type='email' />
                <Input label='Fullname' name='fullname' type='text' />
                <Input label='Phone' name='phone' type='number' />
                <Input label='Password' name='password' type='password' />
                <Button type='submit' className={styles.register__button}>
                    {isLoading ? 'Loading...' : 'Register'}
                </Button>
            </form>
        </AuthLayout>
    )
}

export default RegisterView

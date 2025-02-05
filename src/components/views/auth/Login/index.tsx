/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { signIn } from 'next-auth/react'
import styles from './Login.module.scss'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import AuthLayout from '@/components/layouts/AuthLayout'
import { ToasterContext } from '@/contexts/ToasterContext'

const LoginView = () => {
    const { setToaster } = useContext(ToasterContext)
    const [isLoading, setIsLoading] = useState(false)
    const { push, query } = useRouter()

    const callbackUrl: any = query.callbackUrl || '/'
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        const form = event.target as HTMLFormElement
        try {
            const res = await signIn('credentials', {
                redirect: false,
                email: form.email.value,
                password: form.password.value,
                callbackUrl,
            })

            if (!res?.error) {
                setIsLoading(false)
                form.reset()
                push(callbackUrl)
                setToaster({
                    variant: 'success',
                    message: 'Logged in!'
                })
            } else {
                setIsLoading(false)
                setToaster({
                    variant: 'danger',
                    message: 'Invalid credentials'
                })
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            setToaster({
                variant: 'danger',
                message: 'Login failed please try again'
            })
        }
    }

    return (
        <AuthLayout
            title='Login'
            link='/auth/register'
            linkText="Don't have an account? Sign up"
            setToaster={setToaster}
        >
            <form onSubmit={handleSubmit}>
                <Input label='Email' name='email' type='email' />
                <Input label='Password' name='password' type='password' />
                <Button
                    type='submit'
                    variant='primary'
                    className={styles.login__button}
                >
                    {isLoading ? 'Loading...' : 'Login'}
                </Button>
            </form>
            <hr className={styles.login__divider} />
            <div className={styles.login__other}>
                <Button
                    type='button'
                    className={styles.login__other__button}
                    onClick={() =>
                        signIn('google', { callbackUrl, redirect: false })
                    }
                >
                    <i className='bx bxl-google' />
                    Login with Google
                </Button>
            </div>
        </AuthLayout>
    )
}

export default LoginView

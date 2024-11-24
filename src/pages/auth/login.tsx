/* eslint-disable @typescript-eslint/no-empty-object-type */
import LoginView from '@/components/views/auth/Login'
import { Dispatch, SetStateAction } from 'react'

const LoginPage = ({setToaster}: {setToaster: Dispatch<SetStateAction<{}>>}) => {
    return (
        <>
            <LoginView setToaster={setToaster}/>
        </>
    )
}

export default LoginPage

/* eslint-disable @typescript-eslint/no-empty-object-type */
import Head from 'next/head'
import { useRouter } from 'next/router'
import Navbar from '../Navbar'
import Toaster from '@/components/ui/Toaster'
import { useContext } from 'react'
import { ToasterContext } from '@/contexts/ToasterContext'
import { Lato } from 'next/font/google'
import { ToasterType } from '@/types/toaster.type'

type Proptypes = {
    children: React.ReactNode
}

const lato = Lato({
    subsets: ['latin'],
    weight: ['100', '300', '400', '700', '900'],
})

const disableNavbar = ['auth', 'admin', 'member']

const AppShell = (props: Proptypes) => {
    const { children } = props

    const { pathname } = useRouter()

    const { toaster }: ToasterType = useContext(ToasterContext)

    return (
        <>
            <Head>
                <link
                    href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'
                    rel='stylesheet'
                ></link>
            </Head>
            <div className={lato.className}>
                {!disableNavbar.includes(pathname.split('/')[1]) && <Navbar />}
                {children}
                {Object.keys(toaster).length > 0 && <Toaster />}
            </div>
        </>
    )
}

export default AppShell

import { signIn, signOut, useSession } from 'next-auth/react'
import styles from './Navbar.module.scss'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Navbar = () => {
    const { data } = useSession()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const { pathname } = useRouter()

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    return (
        <div className={styles.navbar}>
            <h1>
                <Link href='/'>Ness Store</Link>
            </h1>
            <div className={styles.navbar__nav}>
                <Link
                    href='/products'
                    className={`${styles.navbar__link} ${
                        pathname === '/products' ? styles.active : ''
                    }`}
                >
                    <i className='bx bxs-box' /> Products
                </Link>
                <Link
                    href='/'
                    className={`${styles.navbar__link} ${pathname === '/' ? styles.active : ''}`}
                >
                    <i className='bx bxs-info-circle' /> About
                </Link>
            </div>
            {data ? (
                <div className={styles.navbar__profile}>
                    <div
                        className={styles.navbar__profile__container}
                        onClick={toggleDropdown}
                    >
                        <div className={styles.navbar__profile__image}>
                            <Image
                                src={data.user?.image || '/default-profile.png'}
                                alt='Profile'
                                width={40}
                                height={40}
                                className={styles.navbar__profile__image}
                            />
                        </div>
                        <i
                            className={`bx bx-chevron-down ${styles.navbar__profile__arrow} ${
                                isDropdownOpen ? styles.rotate : ''
                            }`}
                        />
                    </div>
                    {isDropdownOpen && (
                        <div className={styles.navbar__profile__dropdown}>
                            <Link href='/member'>
                                <i className='bx bxs-user' /> Member
                            </Link>
                            <Link href='/cart'>
                                <i className='bx bxs-cart' /> Cart
                            </Link>
                            {(data?.user as { role: string })?.role ===
                                'admin' && (
                                <Link href='/admin'>
                                    <i className='bx bxs-cog' /> Admin
                                </Link>
                            )}
                            <button onClick={() => signOut()}>
                                <i className='bx bx-log-out' /> Logout
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <button
                    className={styles.navbar__button}
                    onClick={() => signIn()}
                >
                    <i className='bx bx-log-in' /> Login
                </button>
            )}
        </div>
    )
}

export default Navbar

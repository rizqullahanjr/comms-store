/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRouter } from 'next/router'
import styles from './Sidebar.module.scss'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { signOut } from 'next-auth/react'

type PropTypes = {
    lists: Array<{
        title: string
        url: string
        icon: string
    }>
    title: string // Add title prop
}

const Sidebar = (props: PropTypes) => {
    const { lists, title } = props // Destructure title from props
    const { pathname } = useRouter()
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar__top}>
                <h1 className={styles.sidebar__top__title}>{title}</h1>{' '}
                {/* Use title prop */}
                <div className={styles.sidebar__top__lists}>
                    {lists.map((list, index) => (
                        <Link
                            href={list.url}
                            key={list.title}
                            className={`${styles.sidebar__top__lists__item} ${
                                pathname === list.url &&
                                styles.sidebar__top__lists__item__active
                            }`}
                        >
                            <i
                                className={`bx ${list.icon} ${styles.sidebar__top__lists__item__icon}`}
                            />
                            <h4
                                className={
                                    styles.sidebar__top__lists__item__title
                                }
                            >
                                {list.title}
                            </h4>
                        </Link>
                    ))}
                </div>
            </div>
            <div className={styles.sidebar__bottom}>
                <Button
                    className={styles.sidebar__bottom__button}
                    type='button'
                    variant='secondary'
                    onClick={() => signOut()}
                >
                    Logout
                </Button>
            </div>
        </div>
    )
}

export default Sidebar

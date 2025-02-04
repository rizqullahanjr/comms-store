import Sidebar from '@/components/fragments/Sidebar'
import styles from './MemberLayout.module.scss'

type Proptypes = {
    children: React.ReactNode
}

const listSidebarItem = [
    {
        title: 'Dashboard',
        url: '/member',
        icon: 'bxs-dashboard',
    },
    {
        title: 'My Order',
        url: '/member/orders',
        icon: 'bxs-cart',
    },
    {
        title: 'My Profile',
        url: '/member/profile',
        icon: 'bxs-group',
    },
]

const MemberLayout = (props: Proptypes) => {
    const { children } = props
    return (
        <div className={styles.member}>
            <Sidebar lists={listSidebarItem} title='Member Panel' /> {/* Add title prop */}
            <div className={styles.member__main}>{children}</div>
        </div>
    )
}

export default MemberLayout

import Button from '@/components/ui/Button'
import styles from './Transaction.module.scss'

const TransactionView = () => {
    return (
        <div className={styles.transaction}>
            <h1>Payment Status</h1>
            <Button className={styles.transaction__button} type='button'>
                Check Your Order
            </Button>
        </div>
    )
}

export default TransactionView

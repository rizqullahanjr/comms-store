import Button from '@/components/ui/Button'
import styles from './Transaction.module.scss'

const TransactionView = () => {
    return (
        <div className={styles.transaction}>
            <h1>Your Transaction is Success, please wait for your item getting shipped</h1>
            <h1>If there&apos;s any question, please contact us via email admin@mail.com</h1>
            <Button
                onClick={() => (location.href = '/member/orders')}
                className={styles.transaction__button}
                type='button'
            >
                Check Your Order
            </Button>
        </div>
    )
}

export default TransactionView

import styles from './Card.module.scss'
import Image from 'next/image'
import convertIDR from '@/utils/currency'
import { Product } from '@/types/product.type'

type PropTypes = {
    product: Product
}

const Card = (props: PropTypes) => {
    const { product } = props
    return (
        <div className={styles.card}>
            <Image
                src={product.image ?? "/default-product.png"}
                alt={product.name}
                width={200}
                height={200}
                className={styles.card__image}
            />
            <h4 className={styles.card__title}>{product.name}</h4>
            <p className={styles.card__category}>{product.category}</p>
            <p className={styles.card__price}>{convertIDR(product.price)}</p>
        </div>
    )
}

export default Card

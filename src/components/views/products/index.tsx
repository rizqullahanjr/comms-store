import { Product } from '@/types/product.type'
import styles from './products.module.scss'
import Card from './Card'
import Link from 'next/link'

type PropTypes = {
    products: Product[]
}

const ProductsView = (props: PropTypes) => {
    const { products } = props
    return (
        <div className={styles.product}>
            <h1 className={styles.product__title}>
                All Products ({products.length})
            </h1>
            <div className={styles.product__main}>
                <div className={styles.product__main__filter}>
                    <div className={styles.product__main__filter__data}>
                        <h4
                            className={
                                styles.product__main__filter__data__title
                            }
                        >
                            Filter by
                        </h4>
                        <div
                            className={styles.product__main__filter__data__list}
                        >
                            <div
                                className={
                                    styles.product__main__filter__data__list__item
                                }
                            >
                                <input type='checkbox' id='keychain' />
                                <label
                                    className={
                                        styles.product__main__filter__data__list__item__label
                                    }
                                    htmlFor='keychain'
                                >
                                    Keychain
                                </label>
                            </div>
                            <div
                                className={
                                    styles.product__main__filter__data__list__item
                                }
                            >
                                <input type='checkbox' id='artprint' />
                                <label
                                    className={
                                        styles.product__main__filter__data__list__item__label
                                    }
                                    htmlFor='artprint'
                                >
                                    Artprint
                                </label>
                            </div>
                            <div
                                className={
                                    styles.product__main__filter__data__list__item
                                }
                            >
                                <input type='checkbox' id='service' />
                                <label
                                    className={
                                        styles.product__main__filter__data__list__item__label
                                    }
                                    htmlFor='service'
                                >
                                    Service
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.product__main__content}>
                    {products.map(product => (
                        <Link href={`/products/${product.id}`} key={product.id}>
                            <Card product={product} key={product.id} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductsView

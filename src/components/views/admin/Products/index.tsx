/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import AdminLayout from '@/components/layouts/AdminLayout'
import styles from './Products.module.scss'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import { Product } from '@/types/product.type'
import Image from 'next/image'
import convertIDR from '@/utils/currency'
import ModalAddProduct from './ModalAddProduct'
import ModalUpdateProduct from './ModalUpdateProduct'
import ModalDeleteProduct from './ModalDeleteProduct'
import { useSession } from 'next-auth/react'

type PropTypes = {
    products: Product[]
    setToaster: Dispatch<SetStateAction<{}>>
}

const ProductsAdminView = (props: PropTypes) => {
    const { products, setToaster } = props
    const [productsData, setProductsData] = useState<Product[]>([])
    const [modalAddProduct, setModalAddProduct] = useState(false)
    const [updatedProduct, setUpdatedProduct] = useState<Product | {}>({})
    const [deletedProduct, setDeletedProduct] = useState<Product | {}>({})
    const session: any = useSession()
    useEffect(() => {
        setProductsData(products)
    }, [products])

    return (
        <>
            <AdminLayout>
                <div className={styles.products}>
                    <h1>Products Management</h1>
                    <Button
                        type='button'
                        className={styles.products__add}
                        onClick={() => setModalAddProduct(true)}
                    >
                        <i className='bx bx-plus' />
                        Add Product
                    </Button>
                    <table className={styles.products__table}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock Type</th>
                                <th>Quantity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsData.map((product, productIndex) =>
                                product.stock.map((stock, stockIndex) => (
                                    <tr
                                        key={`${product.id}-${stockIndex}`}
                                    >
                                        {stockIndex === 0 && (
                                            <>
                                                {/* Product-specific data spans multiple rows */}
                                                <td
                                                    rowSpan={
                                                        product.stock
                                                            .length
                                                    }
                                                >
                                                    {productIndex + 1}
                                                </td>
                                                <td
                                                    rowSpan={
                                                        product.stock
                                                            .length
                                                    }
                                                >
                                                    <Image
                                                        src={product.image}
                                                        alt={`${product.name} image`}
                                                        width={100}
                                                        height={100}
                                                    />
                                                </td>
                                                <td
                                                    rowSpan={
                                                        product.stock
                                                            .length
                                                    }
                                                >
                                                    {product.name}
                                                </td>
                                                <td
                                                    rowSpan={
                                                        product.stock
                                                            .length
                                                    }
                                                >
                                                    {product.category}
                                                </td>
                                                <td
                                                    rowSpan={
                                                        product.stock
                                                            .length
                                                    }
                                                >
                                                    {convertIDR(
                                                        product.price,
                                                    )}
                                                </td>
                                            </>
                                        )}
                                        {/* Stock-specific data */}
                                        <td>{stock.type}</td>
                                        <td>{stock.qty}</td>
                                        {stockIndex === 0 && (
                                            <td
                                                rowSpan={
                                                    product.stock.length
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles.products__table__actions
                                                    }
                                                >
                                                    <Button
                                                        type='button'
                                                        className={
                                                            styles.products__table__actions__edit
                                                        }
                                                        onClick={() =>
                                                            setUpdatedProduct(
                                                                product,
                                                            )
                                                        }
                                                    >
                                                        <i className='bx bx-edit' />
                                                    </Button>
                                                    <Button
                                                        type='button'
                                                        className={
                                                            styles.products__table__actions__delete
                                                        }
                                                        onClick={() =>
                                                            setDeletedProduct(
                                                                product,
                                                            )
                                                        }
                                                    >
                                                        <i className='bx bx-trash' />
                                                    </Button>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                )),
                            )}
                        </tbody>
                    </table>
                </div>
            </AdminLayout>
            {modalAddProduct && (
                <ModalAddProduct
                    setModalAddProducts={setModalAddProduct}
                    setToaster={setToaster}
                    setProductsData={setProductsData}
                />
            )}
            {Object.keys(updatedProduct).length > 0 && (
                <ModalUpdateProduct
                    setUpdatedProduct={setUpdatedProduct}
                    updatedProduct={updatedProduct}
                    setToaster={setToaster}
                    setProductsData={setProductsData}
                />
            )}
            {Object.keys(deletedProduct).length && (
                <ModalDeleteProduct
                    deletedProduct={deletedProduct}
                    setDeletedProduct={setDeletedProduct}
                    setProductsData={setProductsData}
                    setToaster={setToaster}
                    session={session}
                />
            )}
        </>
    )
}

export default ProductsAdminView

/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import styles from './ModalDeleteProduct.module.scss'
import { Dispatch, SetStateAction, useState } from 'react'
import { Product } from '@/types/product.type'
import productServices from '@/services/product'
import { deleteFile } from '@/lib/firebase/service'

type PropTypes = {
    setProductsData: Dispatch<SetStateAction<Product[]>>
    deletedProduct: Product | any
    setToaster: Dispatch<SetStateAction<{}>>
    setDeletedProduct: Dispatch<SetStateAction<{}>>
    session: any
}

const ModalDeleteProduct = (props: PropTypes) => {
    const { deletedProduct, setDeletedProduct, setProductsData, setToaster, session } = props
    const [isLoading, setIsLoading] = useState(false)
    const handleDelete = async () => {
        const result = await productServices.deleteProduct(
            deletedProduct.id, 
            session.data?.accessToken)
            if (result.status === 200) {
                setIsLoading(false)
                deleteFile(`/images/products/${deletedProduct.id}/${deletedProduct.image.split('%2F')[3].split('?')[0]}`, async (status:boolean) => {
                    if (status) {
                        setToaster({
                            variant: 'success',
                            message: 'Product Deleted Successfully',
                        })
                        console.log('file deleted')
                    }
                })
                setDeletedProduct({})
                const { data } = await productServices.getAllProducts()
                setProductsData(data.data)
            } else {
                setIsLoading(false)
                setToaster({
                    variant: 'danger',
                    message: 'Product Failed to Deleted',
                })
            }
        
    }
    return (
        <Modal onClose={() => setDeletedProduct({})}>
            <h1 className={styles.modal__title}>Are you sure?</h1>
            <Button
                type='button'
                onClick={() => {
                    handleDelete()
                }}
            >
                {isLoading ? 'Deleting...' : 'Yes, Delete'}
            </Button>
        </Modal>
    )
}

export default ModalDeleteProduct

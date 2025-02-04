/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Modal from '@/components/ui/Modal'
import Select from '@/components/ui/Select'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import styles from './ModalAddProduct.module.scss'
import { Product } from '@/types/product.type'
import InputFile from '@/components/ui/InputFile'
import productServices from '@/services/product'
import { useSession } from 'next-auth/react'
import { uploadFile } from '@/lib/firebase/service'

type Proptypes = {
    setModalAddProducts: Dispatch<SetStateAction<boolean>>
    setToaster: Dispatch<SetStateAction<{}>>
    setProductsData: Dispatch<SetStateAction<Product[]>>
}

const ModalAddProduct = (props: Proptypes) => {
    const { setModalAddProducts, setToaster, setProductsData } = props
    const [isLoading, setIsLoading] = useState(false)
    const [stockCount, setStockCount] = useState([{ type: '', qty: 0 }])
    const [uploadedImage, setUploadedImage] = useState<File | null>(null)

    const handleStock = (e: any, i: number, type: string) => {
        const newStockCount: any = [...stockCount]
        newStockCount[i][type] = type === 'qty' ? Number(e.target.value) : e.target.value // Convert qty to number
        setStockCount(newStockCount)
    }

    const uploadImage = (id: string, form: any) => {
        const file = form.image.files[0]
        const newName = 'main.' + file.name.split('.')[1]
        if (file) {
            uploadFile(
                id,
                file,
                newName,
                'products',
                async (status: boolean, newImageURL: string) => {
                    if (status) {
                        const data = {
                            image: newImageURL,
                        }
                        const result = await productServices.updateProduct(
                            id,
                            data,
                        )
                        if (result.status === 200) {
                            setIsLoading(false)
                            setUploadedImage(null)
                            form.reset()
                            setModalAddProducts(false)
                            const { data } = await productServices.getAllProducts()
                            setProductsData(data.data)
                            setToaster({
                                variant: 'success',
                                message: 'Successfully Adding New Product',
                            })
                        } else {
                            setIsLoading(false)
                            setToaster({
                                variant: 'success',
                                message: 'Failed to Add',
                            })
                        }
                    } else {
                        setIsLoading(false)
                        setToaster({
                            variant: 'danger',
                            message: 'Unknown Error Occured',
                        })
                    }
                },
            )
        }
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        const form: any = event.target as HTMLFormElement

        // Convert price and qty to numbers
        const data = {
            name: form.name.value,
            price: Number(form.price.value), // Convert price to number
            category: form.category.value,
            availability: form.availability.value,
            stock: stockCount.map(stock => ({
                type: stock.type,
                qty: Number(stock.qty), // Convert qty to number
            })),
            image: '',
        }

        const result = await productServices.addProduct(data)

        if (result.status === 200) {
            uploadImage(result.data.data.id, form)
        }
    }

    return (
        <Modal onClose={() => setModalAddProducts(false)}>
            <h1>Add Product</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Input label='Name' name='name' type='text' placeholder='Insert Product Name' />
                <Input label='Price' name='price' type='number' placeholder='Product Price' />
                <Select
                    label='Category'
                    name='category'
                    options={[
                        { value: 'Keychain', label: 'Keychain' },
                        { value: 'Artprint', label: 'Artprint' },
                        { value: 'Services', label: 'Services' },
                    ]}
                />
                <Select
                    label='Availability'
                    name='availability'
                    options={[
                        { value: 'Available', label: 'Available' },
                        { value: 'Sold', label: 'Out Of Stock' },
                        { value: 'Unavailable', label: 'Unavailable' },
                    ]}
                />
                <label htmlFor='stock'>Stock</label>
                {stockCount.map((item: { type: string; qty: number }, i: number) => (
                    <div className={styles.form__stock} key={i}>
                        <div className={styles.form__stock__item}>
                            <Input
                                label='Type'
                                name='type'
                                type='text'
                                placeholder='Insert Stock Type'
                                onChange={e => {
                                    handleStock(e, i, 'type')
                                }}
                            />
                        </div>
                        <div className={styles.form__stock__item}>
                            <Input
                                label='QTY'
                                name='qty'
                                type='number'
                                placeholder='Insert Stock QTY'
                                onChange={e => {
                                    handleStock(e, i, 'qty')
                                }}
                            />
                        </div>
                    </div>
                ))}
                <Button
                    type='button'
                    className={styles.form__stock_button}
                    onClick={() =>
                        setStockCount([
                            ...stockCount,
                            { type: '', qty: 0 }, // Ensure qty is a number
                        ])
                    }
                >
                    Add New Stock
                </Button>
                <label htmlFor='image'>Image</label>
                <InputFile
                    name='image'
                    uploadedImage={uploadedImage}
                    setUploadedImage={setUploadedImage}
                />
                <Button type='submit' disabled={isLoading}>
                    {isLoading ? 'Adding Products...' : 'Add Products'}
                </Button>
            </form>
        </Modal>
    )
}

export default ModalAddProduct

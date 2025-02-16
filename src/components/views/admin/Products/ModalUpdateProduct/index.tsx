/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Modal from '@/components/ui/Modal'
import Select from '@/components/ui/Select'
import {
    Dispatch,
    FormEvent,
    SetStateAction,
    useContext,
    useState
} from 'react'
import styles from './ModalUpdateProduct.module.scss'
import { Product } from '@/types/product.type'
import InputFile from '@/components/ui/InputFile'
import productServices from '@/services/product'
import { uploadFile } from '@/lib/firebase/service'
import Image from 'next/image'
import { ToasterContext } from '@/contexts/ToasterContext'

type Proptypes = {
    updatedProduct: Product | any
    setUpdatedProduct: Dispatch<SetStateAction<boolean>>
    setProductsData: Dispatch<SetStateAction<Product[]>>
}

const ModalUpdateProduct = (props: Proptypes) => {
    const { setToaster } = useContext(ToasterContext)
    const { updatedProduct, setUpdatedProduct, setProductsData } = props
    const [isLoading, setIsLoading] = useState(false)
    const [stockCount, setStockCount] = useState(updatedProduct.stock)
    const [uploadedImage, setUploadedImage] = useState<File | null>(null)

    const handleStock = (e: any, i: number, type: string) => {
        const newStockCount: any = [...stockCount]
        newStockCount[i][type] =
            type === 'qty' ? Number(e.target.value) : e.target.value
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
                            image: newImageURL
                        }
                        const result = await productServices.updateProduct(
                            id,
                            data
                        )
                        if (result.status === 200) {
                            setIsLoading(false)
                            setUploadedImage(null)
                            form.reset()
                            setUpdatedProduct(false)
                            const { data } =
                                await productServices.getAllProducts()
                            setProductsData(data.data)
                            setToaster({
                                variant: 'success',
                                message: 'Successfully Updated Product'
                            })
                        } else {
                            setIsLoading(false)
                            setToaster({
                                variant: 'danger',
                                message: 'Failed to Update Product'
                            })
                        }
                    } else {
                        setIsLoading(false)
                        setToaster({
                            variant: 'danger',
                            message: 'Unknown Error Occurred'
                        })
                    }
                }
            )
        }
    }

    const updateProduct = async (
        newImageURL: string = updatedProduct.image,
        form: any
    ) => {
        const data = {
            name: form.name.value,
            price: Number(form.price.value),
            category: form.category.value,
            availability: form.availability.value,
            stock: stockCount,
            description: form.description.value, // Add description
            image: newImageURL
        }
        const result = await productServices.updateProduct(
            updatedProduct.id,
            data
        )
        if (result.status === 200) {
            setIsLoading(false)
            setUploadedImage(null)
            form.reset()
            setUpdatedProduct(false)
            const { data } = await productServices.getAllProducts()
            setProductsData(data.data)
            setToaster({
                variant: 'success',
                message: 'Successfully Updated Product'
            })
        } else {
            setIsLoading(false)
            setToaster({
                variant: 'danger',
                message: 'Failed to Update Product'
            })
        }
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        const form: any = event.target as HTMLFormElement
        const file = form.image.files[0]

        if (file) {
            uploadFile(
                updatedProduct.id,
                file,
                'main.' + file.name.split('.')[1],
                'products',
                async (status: boolean, newImageURL: string) => {
                    if (status) {
                        updateProduct(newImageURL, form)
                    } else {
                        setIsLoading(false)
                        setToaster({
                            variant: 'danger',
                            message: 'Unknown Error Occurred'
                        })
                    }
                }
            )
        } else {
            updateProduct(updatedProduct.image, form)
        }
    }

    return (
        <Modal onClose={() => setUpdatedProduct(false)}>
            <h1>Edit Product</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Input
                    label='Name'
                    name='name'
                    type='text'
                    placeholder='Insert Product Name'
                    defaultValue={updatedProduct.name}
                />
                <Input
                    label='Price'
                    name='price'
                    type='number'
                    placeholder='Product Price'
                    defaultValue={updatedProduct.price}
                />
                <Input
                    label='Description'
                    name='description'
                    type='text'
                    placeholder='Insert Product Description'
                    defaultValue={updatedProduct.description}
                />
                <Select
                    label='Category'
                    name='category'
                    options={[
                        { value: 'Keychain', label: 'Keychain' },
                        { value: 'Artprint', label: 'Artprint' },
                        { value: 'Services', label: 'Services' }
                    ]}
                    defaultValue={updatedProduct.category}
                />
                <Select
                    label='Availability'
                    name='availability'
                    options={[
                        { value: 'Available', label: 'Available' },
                        { value: 'Sold', label: 'Out Of Stock' },
                        { value: 'Unavailable', label: 'Unavailable' }
                    ]}
                    defaultValue={updatedProduct.availability}
                />
                <label htmlFor='image'>Image</label>
                <div className={styles.form__image}>
                    <Image
                        width={200}
                        height={200}
                        src={
                            uploadedImage
                                ? URL.createObjectURL(uploadedImage)
                                : updatedProduct.image || '/default-product.png'
                        }
                        alt='image'
                        className={styles.form__image__preview}
                    />
                    <InputFile
                        name='image'
                        uploadedImage={uploadedImage}
                        setUploadedImage={setUploadedImage}
                    />
                </div>
                <label htmlFor='stock'>Stock</label>
                {stockCount.map(
                    (item: { type: string; qty: number }, i: number) => (
                        <div className={styles.form__stock} key={i}>
                            <div className={styles.form__stock__item}>
                                <Input
                                    label='Type'
                                    name='type'
                                    type='text'
                                    placeholder='Insert Stock Type'
                                    onChange={e => handleStock(e, i, 'type')}
                                    defaultValue={item.type}
                                />
                            </div>
                            <div className={styles.form__stock__item}>
                                <Input
                                    label='QTY'
                                    name='qty'
                                    type='number'
                                    placeholder='Insert Stock QTY'
                                    onChange={e => handleStock(e, i, 'qty')}
                                    defaultValue={item.qty}
                                />
                            </div>
                        </div>
                    )
                )}
                <Button
                    type='button'
                    className={styles.form__stock__button}
                    onClick={() =>
                        setStockCount([...stockCount, { type: '', qty: 0 }])
                    }
                >
                    Add New Stock
                </Button>
                <Button type='submit' disabled={isLoading}>
                    {isLoading ? 'Updating Product...' : 'Update Product'}
                </Button>
            </form>
        </Modal>
    )
}

export default ModalUpdateProduct

/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Modal from '@/components/ui/Modal'
import Select from '@/components/ui/Select'
import { Dispatch, SetStateAction, useState } from 'react'
import styles from './ModalAddProduct.module.scss'
import { Product } from '@/types/product.type'
import InputFile from '@/components/ui/InputFile'

type Proptypes = {
    setModalAddProducts: Dispatch<SetStateAction<boolean>>
    setToaster: Dispatch<SetStateAction<{}>>
    setProductsData: Dispatch<SetStateAction<Product[]>>
}

const ModalAddProduct = (props: Proptypes) => {
    const {setModalAddProducts, setToaster, setProductsData} = props
    const [isLoading, setIsLoading] = useState(false)
    const [stockCount, setStockCount] = useState([{ type: '', qty: 0 }])
    const [uploadedImage, setUploadedImage] = useState<File | null>(null)

    const handleStock = (e: any, i: number, type: string) => {
        const newStockCount: any = [...stockCount]
        newStockCount[i][type] = e.target.value
        setStockCount(newStockCount)
    }
    return (
        <Modal onClose={() => setModalAddProducts(false)}>
            <h1>Update User</h1>
            <form className={styles.form} onSubmit={() => {}}>
                <Input
                    label='Name'
                    name='name'
                    type='text'
                    placeholder='Insert Product Name'
                />
                <Input label='Price' name='price' type='number' />
                <Input label='Phone' name='phone' type='number' />
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
                    name='Availability'
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
                    onClick={() => setStockCount([...stockCount, { type: '', qty: 0 }])}
                >
                    Add New Stock
                </Button>
                <label htmlFor='image'>Image</label>
                <InputFile name='image' uploadedImage={uploadedImage} setUploadedImage={setUploadedImage}/>
                <Button type='submit' disabled={isLoading}>
                    {isLoading ? 'Adding Products...' : 'Add Products'}
                </Button>
            </form>
        </Modal>
    )
}

export default ModalAddProduct

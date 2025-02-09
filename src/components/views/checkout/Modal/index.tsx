/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Dispatch,
    FormEvent,
    SetStateAction,
    useContext,
    useEffect,
    useRef,
    useState
} from 'react'
import styles from './Modal.module.scss'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import TextArea from '@/components/ui/TextArea'
import userServices from '@/services/user'
import { ToasterContext } from '@/contexts/ToasterContext'

type PropTypes = {
    profile: any
    selectedAddress: number
    setSelectedAddress: Dispatch<SetStateAction<number>>
    setModalAddress: Dispatch<SetStateAction<boolean>>
    setProfile: Dispatch<SetStateAction<any>>
}

const Modal = (props: PropTypes) => {
    const {
        profile,
        selectedAddress,
        setSelectedAddress,
        setModalAddress,
        setProfile
    } = props

    const { setToaster } = useContext(ToasterContext)
    const [newAddress, setNewAddress] = useState(false)

    const ref: any = useRef()
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setModalAddress(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [setModalAddress])

    const updateAddress = async (e: FormEvent) => {
        e.preventDefault()

        const form = e.currentTarget as HTMLFormElement
        const data = profile.address
            ? {
                  address: [
                      ...profile.address,
                      {
                          isMain: false,
                          recipient: form.recipient.value,
                          addressline: form.address.value,
                          phone: form.phone.value,
                          note: form.note.value
                      }
                  ]
              }
            : {
                  address: [
                      {
                          isMain: false,
                          recipient: form.recipient.value,
                          addressline: form.address.value,
                          phone: form.phone.value,
                          note: form.note.value
                      }
                  ]
              }

        try {
            const result = await userServices.updateProfile(data)
            if (result.status === 200) {
                setProfile({
                    ...profile,
                    address: data.address
                })
                form.reset()
                setNewAddress(false)
                setToaster({
                    variant: 'success',
                    message: 'Profile Updated Successfully'
                })
            }
        } catch (e) {
            setToaster({
                variant: 'danger',
                message: 'Failed to Update Profile'
            })
        }
    }

    const removeAddress = async (index: number) => {
        const address = [...profile?.address]
        address.splice(index, 1)
        if (address.length > 0) {
            address[index != 0 ? index - 1 : 0].isMain = true
        }

        const data = {
            address: address
        }

        try {
            const result = await userServices.updateProfile(data)
            if (result.status === 200) {
                setProfile({
                    ...profile,
                    address: data.address
                })
                setToaster({
                    variant: 'success',
                    message: 'Profile Updated Successfully'
                })
            }
        } catch (e) {
            setToaster({
                variant: 'danger',
                message: 'Failed to Update Profile'
            })
        }
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modal__main} ref={ref}>
                <h2>Change Address</h2>
                <div className={styles.modal__main__address}>
                    {profile?.address?.map((v: any, i: number) => (
                        <>
                            <div
                                className={`${styles.modal__main__address__area} ${selectedAddress == i && styles.modal__main__address__area__active}`}
                                key={i.toString()}
                            >
                                <div
                                    className={
                                        styles.modal__main__address__group
                                    }
                                    onClick={() => {
                                        setSelectedAddress(i)
                                        setModalAddress(false)
                                    }}
                                >
                                    <h4
                                        className={
                                            styles.modal__main__address__title
                                        }
                                    >
                                        {v.recipient} - {v.phone}
                                    </h4>
                                    <div
                                        className={
                                            styles.modal__main__address__selected
                                        }
                                    >
                                        <h4>
                                            {v.addressline} ({v.note})
                                        </h4>
                                    </div>
                                </div>
                                <Button
                                    className={
                                        styles.modal__main__address__button
                                    }
                                    type='button'
                                    onClick={() => removeAddress(i)}
                                >
                                    <i className='bx bx-trash'></i>
                                </Button>
                            </div>
                        </>
                    ))}
                    <Button
                        className={styles.modal__main__address__new}
                        type='button'
                        onClick={() => setNewAddress(!newAddress)}
                    >
                        Add New Address
                    </Button>
                    {newAddress && (
                        <form
                            onSubmit={updateAddress}
                            className={styles.modal__main__address__new__form}
                        >
                            <TextArea label='Address' name='address' />
                            <Input label='Phone' name='phone' type='number' />
                            <Input
                                label='Recipient'
                                name='recipient'
                                type='text'
                            />
                            <Input label='Note' name='note' type='text' />

                            <Button type='submit'>Submit</Button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Modal

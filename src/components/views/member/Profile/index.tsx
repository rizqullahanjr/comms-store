/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import MemberLayout from '@/components/layouts/MemberLayout'
import styles from './Profile.module.scss'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import { uploadFile } from '@/lib/firebase/service'
import { Dispatch, FormEvent, SetStateAction, useContext, useEffect, useState } from 'react'
import userServices from '@/services/user'
import { User } from '@/types/user.type'
import { ToasterContext } from '@/contexts/ToasterContext'

const ProfileMemberView = () => {
    const { setToaster } = useContext(ToasterContext)
    const [profile, setProfile] = useState<User | any>({})
    const [changeImage, setChangeImage] = useState<File | any>({})
    const [isLoading, setIsLoading] = useState('')

    // Fetch profile data
    const getProfile = async () => {
        const { data } = await userServices.getProfile()
        setProfile(data.data)
    }

    useEffect(() => {
        getProfile()
    }, [])

    // Handle profile update (fullname, phone)
    const handleChangeProfile = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading('profile')
        const form = e.target as HTMLFormElement
        const data = {
            fullname: form.fullname.value,
            phone: form.phone.value,
        }

        try {
            const result = await userServices.updateProfile(data)
            if (result.status === 200) {
                setIsLoading('')
                setProfile({
                    ...profile,
                    fullname: data.fullname,
                    phone: data.phone,
                })
                form.reset()
                setToaster({
                    variant: 'success',
                    message: 'Profile Updated Successfully',
                })
            }
        } catch (error) {
            setIsLoading('')
            setToaster({
                variant: 'danger',
                message: 'Failed to Update Profile',
            })
        }
    }

    // Handle profile picture update
    const handleChangeProfilePicture = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading('picture')
        const form = e.target as HTMLFormElement
        const file = form.image.files[0]
        const newName = 'profile.' + file.name.split('.')[1]

        if (file) {
            uploadFile(
                profile.id,
                file,
                newName,
                'users',
                async (status: any, newImageURL: string) => {
                    if (status) {
                        const data = {
                            image: newImageURL,
                        }
                        const result = await userServices.updateProfile(data)
                        if (result.status === 200) {
                            setIsLoading('')
                            setProfile({
                                ...profile,
                                image: newImageURL,
                            })
                            setChangeImage({})
                            form.reset()
                            setToaster({
                                variant: 'success',
                                message: 'Profile Image Updated Successfully',
                            })
                        } else {
                            setIsLoading('')
                        }
                    } else {
                        setIsLoading('')
                        setChangeImage({})
                        setToaster({
                            variant: 'danger',
                            message: 'Failed to Change Profile Picture',
                        })
                    }
                },
            )
        }
    }

    // Handle password change
    const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading('password')
        const form = e.target as HTMLFormElement
        const data = {
            password: form['new-password'].value,
            oldPassword: form['old-password'].value,
            encryptedPassword: profile.password, // Use the encrypted password from the backend
        }

        try {
            const result = await userServices.updateProfile(data)
            if (result.status === 200) {
                setIsLoading('')
                form.reset()
                // Refetch profile to get the updated encrypted password
                await getProfile()
                setToaster({
                    variant: 'success',
                    message: 'Password Updated Successfully',
                })
            }
        } catch (error) {
            console.log(error)
            setIsLoading('')
            setToaster({
                variant: 'danger',
                message: 'Old Password Incorrect',
            })
        }
    }

    return (
        <MemberLayout>
            <h1 className={styles.profile__title}>Profile</h1>
            <div className={styles.profile__main}>
                <div className={styles.profile__main__row}>
                    {/* Profile Image Section */}
                    <div className={styles.profile__main__row__avatar}>
                        <h2 className={styles.profile__main__row__avatar__title}>Profile Image</h2>
                        {profile.image ? (
                            <Image
                                className={styles.profile__main__row__avatar__image}
                                src={profile.image}
                                alt='avatar'
                                width={200}
                                height={200}
                            />
                        ) : (
                            <div className={styles.profile__main__row__avatar__image}>
                                {profile?.fullname?.charAt(0)}
                            </div>
                        )}
                        <form onSubmit={handleChangeProfilePicture}>
                            <label
                                className={styles.profile__main__row__avatar__label}
                                htmlFor='upload-image'
                            >
                                {changeImage.name ? (
                                    <p>{changeImage.name}</p>
                                ) : (
                                    <>
                                        <p>
                                            Upload a new Avatar, larger image will be resized
                                            automatically
                                        </p>
                                        <p>
                                            Max size allowed <b>1MB</b>
                                        </p>
                                    </>
                                )}
                            </label>
                            <input
                                className={styles.profile__main__row__avatar__input}
                                type='file'
                                name='image'
                                id='upload-image'
                                onChange={(e: any) => {
                                    e.preventDefault()
                                    setChangeImage(e.currentTarget.files[0])
                                }}
                            />
                            <Button
                                className={styles.profile__main__row__avatar__button}
                                type='submit'
                                variant='primary'
                            >
                                {isLoading === 'picture' ? 'Updating...' : 'Upload'}
                            </Button>
                        </form>
                    </div>

                    {/* Profile Details Section */}
                    <div className={styles.profile__main__row__detail}>
                        <h2 className={styles.profile__main__row__detail__title}>
                            Profile Details
                        </h2>
                        <form onSubmit={handleChangeProfile}>
                            <Input
                                name='fullname'
                                defaultValue={profile.fullname}
                                placeholder='Fullname'
                                type='text'
                                label='Fullname'
                            />
                            <Input
                                name='phone'
                                defaultValue={profile.phone}
                                placeholder='Phone'
                                type='text'
                                label='Phone'
                            />
                            <Input
                                name='email'
                                defaultValue={profile.email}
                                placeholder='Email'
                                type='email'
                                label='Email'
                                disabled
                            />
                            <Input
                                name='role'
                                defaultValue={profile.role}
                                placeholder='Role'
                                type='text'
                                label='Role'
                                disabled
                            />
                            <Button
                                className={styles.profile__main__row__detail__button}
                                type='submit'
                                variant='primary'
                            >
                                {isLoading === 'profile' ? 'Updating...' : 'Update Profile'}
                            </Button>
                        </form>
                    </div>

                    {/* Password Change Section */}
                    <div className={styles.profile__main__row__password}>
                        <h2 className={styles.profile__main__row__password__title}>
                            Password Change
                        </h2>
                        <form onSubmit={handleChangePassword}>
                            <Input
                                name='old-password'
                                type='password'
                                label='Old Password'
                                disabled={profile.type === 'google'}
                                required
                            />
                            <Input
                                name='new-password'
                                type='password'
                                label='New Password'
                                disabled={profile.type === 'google'}
                                required
                                minLength={8}
                            />
                            <Button
                                className={styles.profile__main__row__password__button}
                                type='submit'
                                variant='primary'
                                disabled={isLoading === 'password' || profile.type === 'google'}
                            >
                                {isLoading === 'password' ? 'Updating...' : 'Update Password'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </MemberLayout>
    )
}

export default ProfileMemberView

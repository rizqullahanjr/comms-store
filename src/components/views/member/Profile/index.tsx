/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import MemberLayout from '@/components/layouts/MemberLayout'
import styles from './Profile.module.scss'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import { uploadFile } from '@/lib/firebase/service'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import userServices from '@/services/user'
import { User } from '@/types/user.type'

type PropTypes = {
    profile: User | any
    setToaster: Dispatch<SetStateAction<{}>>
    setProfile: Dispatch<SetStateAction<{}>>
    session: any
}

const ProfileMemberView = ({ profile, setProfile, session, setToaster }: PropTypes) => {
    const [changeImage, setChangeImage] = useState<File | any>({})
    const [isLoading, setIsLoading] = useState('')
    const handleChangeProfile = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading('profile')
        const form = e.target as HTMLFormElement
        const data = {
            fullname: form.fullname.value,
            phone: form.phone.value,
        }
        const result = await userServices.updateProfile(data, session.data?.accessToken)
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
                message: 'Profile Updated',
            })
        } else {
            setIsLoading('')
        }
    }
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
                        const result = await userServices.updateProfile(
                            data,
                            session.data?.accessToken,
                        )
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
                                message: 'Profile Image Updated',
                            })
                        } else {
                            setIsLoading('')
                        }
                    } else {
                        setIsLoading('')
                        setChangeImage({})
                        setToaster({
                            variant: 'danger',
                            message: 'Failed Change Profile Picture',
                        })
                    }
                },
            )
        }
    }
    const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading('password')
        const form = e.target as HTMLFormElement
        const data = {
            password: form['new-password'].value,
            oldPassword: form['old-password'].value,
            encryptedPassword: profile.password,
        }
        try {
            const result = await userServices.updateProfile(
                data,
                session.data?.accessToken,
            )
            if (result.status === 200) {
                setIsLoading('')
                form.reset()
                setProfile({ ...profile, password: data.password })
                setToaster({
                    variant: 'success',
                    message: 'Profile Updated',
                })
            }
        } catch (error) {
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
                    <div className={styles.profile__main__row__avatar}>
                        <h2 className={styles.profile__main__row__avatar__title}>
                            Profile Image
                        </h2>
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
                                {/* No Image Uploaded */}
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
                                            Upload a new Avatar, larger image will be
                                            resized automatically
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
                                label='email'
                                disabled
                            />
                            <Input
                                name='role'
                                defaultValue={profile.role}
                                placeholder='role'
                                type='role'
                                label='role'
                                disabled
                            />
                            <Button
                                className={styles.profile__main__row__detail__button}
                                type='submit'
                                variant='primary'
                            >
                                {isLoading === 'profile'
                                    ? 'Updating...'
                                    : 'Update Profile'}
                            </Button>
                        </form>
                    </div>
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
                            />
                            <Input
                                name='new-password'
                                type='password'
                                label='New Password'
                                disabled={profile.type === 'google'}
                            />
                            <Button
                                className={styles.profile__main__row__password__button}
                                type='submit'
                                variant='primary'
                                disabled={
                                    isLoading === 'password' || profile.type === 'google'
                                }
                            >
                                {isLoading === 'password'
                                    ? 'Updating...'
                                    : 'Update Password'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </MemberLayout>
    )
}

export default ProfileMemberView

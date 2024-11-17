/* eslint-disable @typescript-eslint/no-explicit-any */
import MemberLayout from '@/components/layouts/MemberLayout'
import styles from './Profile.module.scss'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import { uploadFile } from '@/lib/firebase/service'
import { useState } from 'react'
import userServices from '@/services/user'

const ProfileMemberView = ({ profile, setProfile, session }: any) => {
    const [changeImage, setChangeImage] = useState<any>({})
    const [isLoading, setIsLoading] = useState(false)
    const handleChangeProfilePicture = (e: any) => {
        e.preventDefault()
        setIsLoading(true)
        const file = e.target[0]?.files[0]
        if (file) {
            uploadFile(
                profile.id,
                file,
                async (status: any, newImageURL: string) => {
                    if (status) {
                        const data = {
                            image: newImageURL,
                        }
                        const result = await userServices.updateProfile(
                            profile.id,
                            data,
                            session.data?.accessToken,
                        )
                        if (result.status === 200) {
                            setIsLoading(false)
                            setProfile({
                                ...profile,
                                image: newImageURL,
                            })
                            setChangeImage({})
                            e.target[0].value = ''
                        } else {
                            setIsLoading(false)
                        }
                    } else {
                        setIsLoading(false)
                        setChangeImage({})
                    }
                },
            )
        }
    }

    return (
        <MemberLayout>
            <h1 className={styles.profile__title}>Profile</h1>
            <div className={styles.profile__main}>
                <div className={styles.profile__main__avatar}>
                    {profile.image ? (
                        <Image
                            className={styles.profile__main__avatar__image}
                            src={profile.image}
                            alt='avatar'
                            width={200}
                            height={200}
                        />
                    ) : (
                        <div className={styles.profile__main__avatar__image}>
                            No Image Uploaded
                            {/* {profile?.fullname?.charAt(0)} */}
                        </div>
                    )}
                    <form onSubmit={handleChangeProfilePicture}>
                        <label
                            className={styles.profile__main__avatar__label}
                            htmlFor='upload-image'
                        >
                            {changeImage.name ? (
                                <p>{changeImage.name}</p>
                            ) : (
                                <>
                                    <p>
                                        Upload a new Avatar, larger image will
                                        be resized automatically
                                    </p>
                                    <p>
                                        Max size allowed <b>1MB</b>
                                    </p>
                                </>
                            )}
                        </label>
                        <input
                            className={styles.profile__main__avatar__input}
                            type='file'
                            name='image'
                            id='upload-image'
                            onChange={(e: any) => {
                                e.preventDefault()
                                setChangeImage(e.currentTarget.files[0])
                            }}
                        />
                        <Button
                            className={styles.profile__main__avatar__button}
                            type='submit'
                            variant='primary'
                        >
                            {isLoading ? 'Updating...' : 'Upload'}
                        </Button>
                    </form>
                </div>
                <div className={styles.profile__main__detail}>
                    <form>
                        <Input
                            name='fullname'
                            defaultValue={profile.fullname}
                            placeholder='Fullname'
                            type='text'
                            label='Fullname'
                        />
                        <Input
                            name='email'
                            defaultValue={profile.email}
                            placeholder='Email'
                            type='email'
                            label='Email'
                        />
                        <Input
                            name='phone'
                            defaultValue={profile.phone}
                            placeholder='Phone'
                            type='text'
                            label='Phone'
                        />
                        {/* <Input
                        name='password'
                        defaultValue={profile.password}
                        placeholder='Password'
                        type='password'
                        label='Password'
                    /> */}
                        <Button type='submit' variant='primary'>
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </MemberLayout>
    )
}

export default ProfileMemberView

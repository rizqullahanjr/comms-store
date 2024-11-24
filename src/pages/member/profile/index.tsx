/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ProfileMemberView from '@/components/views/member/Profile'
import userServices from '@/services/user'
import { User } from '@/types/user.type'
import { useSession } from 'next-auth/react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type PropTypes = {
    setToaster: Dispatch<SetStateAction<{}>>
}
const ProfileMemberPage = ({ setToaster }: PropTypes) => {
    const [profile, setProfile] = useState<User | {}>({})
    const session: any = useSession()
    useEffect(() => {
        if (session.data?.accessToken && Object.keys(profile).length === 0) {
            const getProfile = async () => {
                const { data } = await userServices.getProfile(session.data?.accessToken)
                setProfile(data.data)
            }
            getProfile()
        }
    }, [profile, session])

    return (
        <>
            <ProfileMemberView
                profile={profile}
                setProfile={setProfile}
                session={session}
                setToaster={setToaster}
            />
        </>
    )
}

export default ProfileMemberPage

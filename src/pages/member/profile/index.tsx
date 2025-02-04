/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ProfileMemberView from '@/components/views/member/Profile'
import { Dispatch, SetStateAction} from 'react'

type PropTypes = {
    setToaster: Dispatch<SetStateAction<{}>>
}

const ProfileMemberPage = ({ setToaster }: PropTypes) => {

    return (
            <ProfileMemberView 
                setToaster={setToaster} />
    )
}

export default ProfileMemberPage

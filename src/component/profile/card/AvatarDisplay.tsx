import React, {FC} from 'react'
import {Avatar} from "antd"
import {ProfileCardItemWrap} from "./ProfileCardItemWrap"


interface IAvatarDisplay {
    avatar: string
}

const AvatarDisplay: FC<IAvatarDisplay> = ({avatar}) => {
    return (
        <ProfileCardItemWrap>
            <Avatar style={{margin: "5px 20px"}} size={100} src={avatar}/>
        </ProfileCardItemWrap>
    );
};

export {AvatarDisplay}
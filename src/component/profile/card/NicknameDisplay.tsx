import React, {FC} from 'react'
import {Tag} from "antd"
import {ProfileCardItemWrap} from "./ProfileCardItemWrap"


interface INicknameDisplay {
    nickname: string
}

const NicknameDisplay: FC<INicknameDisplay> = ({nickname}) => {
    return (
        <ProfileCardItemWrap>
            <Tag style={{marginBottom: 10, padding: 5, fontSize: 16}}
                 color="gold">{nickname}</Tag>
        </ProfileCardItemWrap>
    );
};

export {NicknameDisplay}
import React, {FC} from 'react'
import {PlayerDisplayWrap} from "./PlayerDisplayWrap"
import {Avatar} from "antd";

interface IPlayerAvatarDisplay {
    avatar: string
}

const PlayerAvatarDisplay: FC<IPlayerAvatarDisplay> = ({avatar}) => {
    return (
        <PlayerDisplayWrap>
            <Avatar src={avatar}/>
        </PlayerDisplayWrap>
    );
};

export {PlayerAvatarDisplay}
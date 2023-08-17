import React, {FC} from 'react'
import {Rate} from "antd"
import {ProfileCardItemWrap} from "./ProfileCardItemWrap"

interface IRankDisplay {
    rank: number
}

const RankDisplay: FC<IRankDisplay> = ({rank}) => {
    return (
        <ProfileCardItemWrap>
            <Rate disabled value={rank} style={{marginBottom: 10}}/>
        </ProfileCardItemWrap>
    );
};

export {RankDisplay}
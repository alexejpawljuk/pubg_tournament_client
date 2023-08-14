import React, {FC} from 'react'
import {Progress, Tooltip} from "antd"
import {ProfileCardItemWrap} from "./ProfileCardItemWrap"


interface IExperienceDisplay {
    experience: number
}

const ExperienceDisplay: FC<IExperienceDisplay> = ({experience}) => {
    return (
        <ProfileCardItemWrap>
            <Tooltip
                placement="leftTop"
                title="In tournaments, you gain experience points for participation. If you win a tournament, you receive x5 experience points. However, you will also lose experience points if you haven't participated in tournaments for a long time."
            >
                <Progress percent={experience} size={[187, 5]}/>
            </Tooltip>
        </ProfileCardItemWrap>
    );
};

export {ExperienceDisplay}